import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../model/user';
import { Court } from '../../model/court';
import { CourtReservation } from '../../model/court-reservation';

@Component({
  selector: 'app-system-alerts',
  standalone: true,
  imports: [],
  templateUrl: './system-alerts.component.html',
  styleUrl: './system-alerts.component.css'
})
export class SystemAlertsComponent {

  constructor(private localStorageService: LocalStorageService) {}

  users: User[] = this.localStorageService.getItem("users") as User[];
  court: Court = (this.localStorageService.getItem("courts") as Court[])[0];
  courtReservations: CourtReservation[] = this.localStorageService.getItem("courtReservations") as CourtReservation[];
  today: Date = new Date();

  requestCourtReservations: CourtReservation[] = [];

  ngOnInit() {

    const day =  String(this.today.getDate()).padStart(2, '0');
    const month = String(this.today.getMonth() + 1).padStart(2, '0');
    const year = this.today.getFullYear();

    let date = new Date(`${year}-${month}-${day}`);
    let hours = this.today.getHours();

    for (let reservation of this.courtReservations) {
      if (reservation.court_id == this.court.id &&
          (new Date(reservation.date) > date ||
           (new Date(reservation.date) == date && reservation.time > hours)) &&
          reservation.approved == false &&
          reservation.finished == false &&
          reservation.started == false &&
          reservation.player_ids[0] != -1
      ) {
        this.requestCourtReservations.push(reservation);
      }
    }
  }

  userOfRequest(i: number) {
    let reservation = this.requestCourtReservations[i];
    let userId = reservation.player_ids[0];
    let user = this.users.find((user) => user.id == userId);
    return `${user!.name} ${user!.last_name}`
  }

  getDateOfRequest(i: number) {
    let reservation = this.requestCourtReservations[i];
    let splitDate = reservation.date.split("-");
    return `${splitDate[2]}.${splitDate[1]}.${splitDate[0]}.`;
  }

  getTimeSpanOfRequest(i: number) {
    let reservation = this.requestCourtReservations[i];
    let startTime = reservation.time.toString().padStart(2, "0") + ":00";
    let endTime = (reservation.time + reservation.duration).toString().padStart(2, "0") + ":00";
    return `${startTime} - ${endTime}`;
  }

  accept(i: number) {
    let reservation = this.requestCourtReservations[i];
    this.requestCourtReservations[i] = this.requestCourtReservations[this.requestCourtReservations.length - 1];
    this.requestCourtReservations.pop();
    reservation.approved = true;
    for (let j = 0; j < this.courtReservations.length; j++) {
      let r = this.courtReservations[j];
      if (r.court_id == reservation.court_id &&
          r.date == reservation.date &&
          r.court_num == reservation.court_num &&
          r.time == reservation.time
      ) {
        this.courtReservations[j] = reservation;
        this.localStorageService.setItem("courtReservations", this.courtReservations);
        break;
      }
    }
  }

  decline(i: number) {
    let reservation = this.requestCourtReservations[i];
    this.requestCourtReservations[i] = this.requestCourtReservations[this.requestCourtReservations.length - 1];
    this.requestCourtReservations.pop();
    for (let j = 0; j < this.courtReservations.length; j++) {
      let r = this.courtReservations[j];
      if (r.court_id == reservation.court_id &&
          r.date == reservation.date &&
          r.court_num == reservation.court_num &&
          r.time == reservation.time
      ) {
        this.courtReservations[j] = this.courtReservations[this.courtReservations.length - 1];
        this.courtReservations.pop();
        this.localStorageService.setItem("courtReservations", this.courtReservations);
        break;
      }
    }
  }

}
