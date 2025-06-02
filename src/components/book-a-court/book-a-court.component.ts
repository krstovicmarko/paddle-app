import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Court } from '../../model/court';
import { LocalStorageService } from '../../services/local-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../services/router.service';
import { Availability, AvailableTime } from '../../model/available-time';
import { CourtReservation } from '../../model/court-reservation';
import { User } from '../../model/user';

@Component({
  selector: 'app-book-a-court',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-a-court.component.html',
  styleUrl: './book-a-court.component.css'
})
export class BookACourtComponent {
  constructor(private route: ActivatedRoute, private localStorageService: LocalStorageService,
    private routerService: RouterService
  ) {}

  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  court?: Court;
  courtTimes: AvailableTime[] = [];
  chosenDate: string = "";
  selectedMatchType: string = "single";
  courtReservation: CourtReservation = new CourtReservation(-1, -1, "", -1, [-1, -1], 0);
  currentUser: User = this.localStorageService.getItem("currentUser") as User;
  users: User[] = this.localStorageService.getItem("users") as User[];
  canConfirmMatch: boolean = false;

  initCourtTimes() {
    this.courtTimes = Array.from(
      {length: this.court!.work_hours_end - this.court!.work_hours_start},
      (_, i) => new AvailableTime((i + this.court!.work_hours_start) + ":00", Availability.Available));

      for (let i = 0; i < this.courtTimes.length; i++) {
      if (this.courtTimes[i].time.length != 5)
          this.courtTimes[i].time = "0" + this.courtTimes[i].time;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // console.log(params.get('id'));
      let id = Number(params.get('id') as string);
      let courts = this.localStorageService.getItem("courts") as Court[];
      for (let c of courts) {
        if (c.id == id) {
          this.court = c;
          break;
        }
      }

      this.initCourtTimes();

      const today = new Date();
      const day =  String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();

      this.chosenDate = `${year}-${month}-${day}`;

      if (!this.localStorageService.exists("courtReservation")) {
        this.localStorageService.setItem(
          "courtReservation",
          new CourtReservation(this.court!.id, -1, this.chosenDate, -1, [this.currentUser.id, -1], 0)
        )
      } else {
        this.selectedMatchType = (this.localStorageService.getItem("courtReservation") as CourtReservation).player_ids.length == 2 
            ? 'signle' : 'double';
      }
    });

  }


  workingHours(): string {
    let start = this.court!.work_hours_start;
    let end = this.court!.work_hours_end;
    let startStr = start + "AM";
    let endStr = end + "AM";
    if (start >= 12) {
      startStr = (start - 12) + "PM";
    }

    if (end >= 12) {
      endStr = (end - 12) + "PM";
    }

    return startStr + " - " + endStr;
  }

  choosePlayer(i: number) {
    this.routerService.navigateTo("invite-players/" + i);
  }

  onDateChange(event: Event) {
    let courtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
    console.log(this.chosenDate);
    courtReservation.date = this.chosenDate;
    this.localStorageService.setItem("courtReservation", courtReservation);
    this.initCourtTimes();
    this.checkCanConfirmMatch();
  }

  triggerDatePicker() {
    this.dateInput.nativeElement.click();
  }

  pickTime(time: string) {
    for (let i = 0; i < this.courtTimes.length; i++) {
      if (time == this.courtTimes[i].time) {
        if (this.courtTimes[i].availability == Availability.Available)
          this.courtTimes[i].availability = Availability.Chosen;
        else if (this.courtTimes[i].availability == Availability.Chosen)
          this.courtTimes[i].availability = Availability.Available;

        this.checkCanConfirmMatch();
        return;
      }
    }

  }

  playerName(i: number) : string {
    let courtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
    if (i < courtReservation.player_ids.length) {
      let player_id = courtReservation.player_ids[i];
      for (let user of this.users) {
        if (user.id == player_id) {
          return user.name;
        }
      }
    }

    return "+";
  }

  onSelectionChange(event: Event) {
    console.log(this.selectedMatchType);
    let courtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
    if (this.selectedMatchType == "single" && courtReservation.player_ids.length == 4)
      courtReservation.player_ids = [courtReservation.player_ids[0], courtReservation.player_ids[1]]
    else if(this.selectedMatchType == "double" && courtReservation.player_ids.length == 2)
        courtReservation.player_ids = [courtReservation.player_ids[0], courtReservation.player_ids[1], -1, -1];
    
    this.localStorageService.setItem("courtReservation", courtReservation);
    this.checkCanConfirmMatch();
  }

  checkCanConfirmMatch() {
    let courtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
    if (courtReservation.date == "") {
        this.canConfirmMatch = false;
        return;
    }

    for (let id of courtReservation.player_ids) {
      if (id == -1) {
        this.canConfirmMatch = false;
        return;
      }
    }

    let foundCourtTime = -1;
    let duration = 0;
    for (let courtTime of this.courtTimes) {
      if (courtTime.availability == Availability.Chosen) {
        if (foundCourtTime == -1) {
          foundCourtTime = Number(courtTime.time.split(":")[0])
          duration = 1;
        } else {
          let chosenTime = Number(courtTime.time.split(":")[0]);
          if (foundCourtTime + duration == chosenTime) {
            duration += 1;
          } else {
            this.canConfirmMatch = false;
            return;
          }
        }
      }
    }

    if (foundCourtTime == -1) {
      this.canConfirmMatch = false;
      return;
    }
    courtReservation.duration = duration;
    courtReservation.time = foundCourtTime;
    courtReservation.court_num = 1;
    this.canConfirmMatch = true;
    this.localStorageService.setItem("courtReservation", courtReservation);
  }

  confirmMatch() {
    this.routerService.navigateTo("confirm-match");
  }
}
