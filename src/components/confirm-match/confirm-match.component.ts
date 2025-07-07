import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterService } from '../../services/router.service';
import { CourtReservation } from '../../model/court-reservation';
import { User } from '../../model/user';
import { Court } from '../../model/court';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CourtService } from '../../services/court.service';
import { CourtReservationService } from '../../services/court-reservation.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-confirm-match',
  standalone: true,
  imports: [FormsModule],
  imports: [FormsModule],
  templateUrl: './confirm-match.component.html',
  styleUrl: './confirm-match.component.css'
})
export class ConfirmMatchComponent {

  constructor(private localStorageService: LocalStorageService, private routerService: RouterService, private authenticationService: AuthenticationService,
    private courtService: CourtService, private courtReservationService: CourtReservationService, private route: ActivatedRoute
  ){}

  courtReservation: CourtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
  courtReservations: CourtReservation[] = this.localStorageService.getItem("courtReservations") as CourtReservation[];
  courtReservations: CourtReservation[] = this.localStorageService.getItem("courtReservations") as CourtReservation[];
  users: User[] = this.localStorageService.getItem("users") as User[];
  selectedMatchType: string = this.courtReservation.player_ids.length == 2 ? 'single' : 'double';
  courts: Court[] = this.localStorageService.getItem("courts") as Court[];
  yourMatchComponent: boolean = false;
  matchStarted: boolean = false;
  points: string[] = ['+', '+', '+', '+', '+', '+']
  currentUser: User = this.authenticationService.currentUserValue;

  ngOnInit() {
    // console.log(this.route.url.toString());
    if (this.route.toString().includes("your-match")) {
      this.yourMatchComponent = true;
      this.courtReservation = this.localStorageService.getItem("match") as CourtReservation;
      this.selectedMatchType = this.courtReservation.player_ids.length == 2 ? 'single' : 'double';
      // console.log(this.courtReservation);

      for (let i = 0; i < this.courtReservation.sets.length; i++) {
        this.points[i] = this.courtReservation.sets[i] == -1 ? '+' : this.courtReservation.sets[i].toString();
      }
      this.matchStarted = this.courtReservation.started;
    }
  }

  choosePlayer(i: number) {

  }

  playerName(i: number): string {
    let id = this.courtReservation.player_ids[i];
    if (this.currentUser.id == id)
      return "Me";
    for (let user of this.users) {
      if (id == user.id) {
        // console.log(user);
        return user.name;
      }
    }
    return "";
  }

  getDate() : string {
    let date = this.courtReservation.date;
    let dateSplit = date.split("-");

    return dateSplit[2] + "." + dateSplit[1] + "." + dateSplit[0] + ".";
  }

  getTime() : string {
    let start_time = this.courtReservation.time;
    let end_time = start_time + this.courtReservation.duration;

    let start_time_str = start_time.toString().padStart(2, "0") + ":00";
    let end_time_str = end_time.toString().padStart(2, "0") + ":00";

    return start_time_str + "-" + end_time_str; 
  }

  getCourtNumber(): number {
    return 1;
  }

  getClub(): string {
    let court_id = this.courtReservation.court_id;
    for (let court of this.courts) {
      if (court_id == court.id)
          return court.name;
    }

    return "";
  }

  confirmMatch() {
    let startDate = new Date(Date.now());
    startDate.setDate(startDate.getDate() -5);
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 15);
    let courtReservations : CourtReservation[];
    this.courtReservationService.getCourtReservationsForUser(this.currentUser.id, startDate, endDate).subscribe((response) => {
      courtReservations = response as CourtReservation[];
    });
    this.courtReservation.reservation_start_time = new Date(this.courtReservation.date);
    this.courtReservation.reservation_start_time.setHours(this.courtReservation.time);
    this.courtReservation.reservation_end_time = new Date(this.courtReservation.date);
    this.courtReservation.reservation_end_time.setHours(this.courtReservation.time+this.courtReservation.duration);
    this.courtReservation.user_id = this.currentUser.id;
    this.courtReservationService.addCourtReservation(this.courtReservation).subscribe((response) => {
      this.courtReservation = response;
      courtReservations.push(this.courtReservation);
      this.localStorageService.setItem("courtReservations", courtReservations);
      this.localStorageService.remove("courtReservation");
    });
    this.routerService.navigateTo("confirmation/booked");
  }

  startMatch() {
    this.courtReservation.started = true;
    this.saveMatch();

  }

  saveMatch() {
    this.localStorageService.setItem("match", this.courtReservation);
    
    for (let i = 0; i < this.courtReservations.length; i++) {
      if (this.courtReservation.court_id == this.courtReservations[i].court_id &&
          this.courtReservation.court_num == this.courtReservations[i].court_num &&
          this.courtReservation.time == this.courtReservations[i].time
      ) {
        this.courtReservations[i] = this.courtReservation;
      }
    }

    this.localStorageService.setItem("courtReservations", this.courtReservations);
  }

  getPoints(i: number) {
    return this.courtReservation.sets[i] != -1 ? this.courtReservation.sets[i] : '+';
  }

  onInputClick(i: number) {
    this.points[i] = "";
  }

  onInputDone(i: number) {
    if (!isNaN(Number(this.points[i]))) {
      this.courtReservation.sets[i] = !isNaN(Number(this.points[i])) ? Number(this.points[i]) : -1;
      this.saveMatch();
    } else {
      this.points[i] = "+";
    }
  }

  endMatch() {
    let myId = this.currentUser.id;
    let myTeam = 0;
    if (this.courtReservation.player_ids[1] == myId || 
        (this.courtReservation.player_ids.length == 4 && this.courtReservation.player_ids[3] == myId))
        myTeam = 1;
    
    let myTeamSets = 0;
    let opposingTeam = myTeam ^ 1;
    if (this.courtReservation.sets[0] == -1 || this.courtReservation.sets[1] == -1)
      return;
    
    myTeamSets += this.courtReservation.sets[0 + myTeam] > this.courtReservation.sets[0 + opposingTeam] ? 1 : 0;

    if (this.courtReservation.sets[2] == -1 || this.courtReservation.sets[3] == -1)
      return;
    
    myTeamSets += this.courtReservation.sets[2 + myTeam] > this.courtReservation.sets[2 + opposingTeam] ? 1 : 0;

    if (myTeamSets == 2) {
      this.courtReservation.finished = true;
      this.saveMatch();
      this.routerService.navigateTo('confirmation/win');
    }
    else if (myTeamSets == 0) {
      this.courtReservation.finished = true;
      this.saveMatch();
      this.routerService.navigateTo('confirmation/loss');
    }
      else {
      if (this.courtReservation.sets[4] == -1 || this.courtReservation.sets[5] == -1)
        return;
      
      myTeamSets += this.courtReservation.sets[4 + myTeam] > this.courtReservation.sets[4 + opposingTeam] ? 1 : 0;
    }

    if (myTeamSets == 2) {
      this.courtReservation.finished = true;
      this.saveMatch();
      this.routerService.navigateTo('confirmation/win');
    }
    else if (myTeamSets == 1) {
      this.courtReservation.finished = true;
      this.saveMatch();
      this.routerService.navigateTo('confirmation/loss');
    }
    
  }

  startMatch() {
    this.courtReservation.started = true;
    this.saveMatch();

  }

  saveMatch() {
    this.localStorageService.setItem("match", this.courtReservation);
    
    for (let i = 0; i < this.courtReservations.length; i++) {
      if (this.courtReservation.court_id == this.courtReservations[i].court_id &&
          this.courtReservation.court_num == this.courtReservations[i].court_num &&
          this.courtReservation.time == this.courtReservations[i].time
      ) {
        this.courtReservations[i] = this.courtReservation;
      }
    }

    this.localStorageService.setItem("courtReservations", this.courtReservations);
  }

  getPoints(i: number) {
    return this.courtReservation.sets[i] != -1 ? this.courtReservation.sets[i] : '+';
  }

  onInputClick(i: number) {
    this.points[i] = "";
  }

  onInputDone(i: number) {
    if (!isNaN(Number(this.points[i]))) {
      this.courtReservation.sets[i] = !isNaN(Number(this.points[i])) ? Number(this.points[i]) : -1;
      this.saveMatch();
    } else {
      this.points[i] = "+";
    }
  }

  endMatch() {
    let myId = this.currentUser.id;
    let myTeam = 0;
    if (this.courtReservation.player_ids[1] == myId || 
        (this.courtReservation.player_ids.length == 4 && this.courtReservation.player_ids[3] == myId))
        myTeam = 1;
    
    let myTeamSets = 0;
    let opposingTeam = myTeam ^ 1;
    if (this.courtReservation.sets[0] == -1 || this.courtReservation.sets[1] == -1)
      return;
    
    myTeamSets += this.courtReservation.sets[0 + myTeam] > this.courtReservation.sets[0 + opposingTeam] ? 1 : 0;

    if (this.courtReservation.sets[2] == -1 || this.courtReservation.sets[3] == -1)
      return;
    
    myTeamSets += this.courtReservation.sets[2 + myTeam] > this.courtReservation.sets[2 + opposingTeam] ? 1 : 0;

    if (myTeamSets == 2) {
      this.courtReservation.finished = true;
      this.saveMatch();
      this.routerService.navigateTo('confirmation/win');
    }
    else if (myTeamSets == 0) {
      this.courtReservation.finished = true;
      this.saveMatch();
      this.routerService.navigateTo('confirmation/loss');
    }
      else {
      if (this.courtReservation.sets[4] == -1 || this.courtReservation.sets[5] == -1)
        return;
      
      myTeamSets += this.courtReservation.sets[4 + myTeam] > this.courtReservation.sets[4 + opposingTeam] ? 1 : 0;
    }

    if (myTeamSets == 2) {
      this.courtReservation.finished = true;
      this.saveMatch();
      this.routerService.navigateTo('confirmation/win');
    }
    else if (myTeamSets == 1) {
      this.courtReservation.finished = true;
      this.saveMatch();
      this.routerService.navigateTo('confirmation/loss');
    }
    
  }
}
