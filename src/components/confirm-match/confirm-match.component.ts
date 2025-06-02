import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterService } from '../../services/router.service';
import { CourtReservation } from '../../model/court-reservation';
import { User } from '../../model/user';
import { Court } from '../../model/court';

@Component({
  selector: 'app-confirm-match',
  standalone: true,
  imports: [],
  templateUrl: './confirm-match.component.html',
  styleUrl: './confirm-match.component.css'
})
export class ConfirmMatchComponent {

  constructor(private localStorageService: LocalStorageService, private routerService: RouterService){}

  courtReservation: CourtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
  users: User[] = this.localStorageService.getItem("users") as User[];
  selectedMatchType: string = this.courtReservation.player_ids.length == 2 ? 'single' : 'double';
  courts: Court[] = this.localStorageService.getItem("courts") as Court[];

  choosePlayer(i: number) {

  }

  playerName(i: number): string {
    for (let user of this.users) {
      if (i == user.id) {
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
    let courtReservations = this.localStorageService.getItem("courtReservations") as CourtReservation[];
    courtReservations.push(this.courtReservation);
    this.localStorageService.remove("courtReservation");
    this.localStorageService.setItem("courtReservations", courtReservations);
    this.routerService.navigateTo("confirmation/booked");
  }
}
