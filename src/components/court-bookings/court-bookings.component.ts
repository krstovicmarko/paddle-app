import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { Court } from '../../model/court';
import { CourtReservation } from '../../model/court-reservation';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-court-bookings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './court-bookings.component.html',
  styleUrl: './court-bookings.component.css'
})
export class CourtBookingsComponent {

  constructor(private localStorageService: LocalStorageService, private authenticationService: AuthenticationService) {};
  chosenDate: string = "";
  time: string = "";
  times: string[] = [];
  court: Court = (this.localStorageService.getItem("courts") as Court[])[0];
  courtReservations: CourtReservation[] = this.localStorageService.getItem("courtReservations") as CourtReservation[];
  courtsTaken: boolean[] = [];
  selectedCourt: number = -1;

  ngOnInit() {
    const today = new Date();
    const day =  String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    this.chosenDate = `${year}-${month}-${day}`;
    this.time = this.court.work_hours_start.toString();
    for (let i = this.court.work_hours_start; i < this.court.work_hours_end; i++) {
      this.times.push(i.toString());
    }

    for (let i = 0; i < this.court.num_of_courts; i++) {
      this.courtsTaken.push(false);
    }

    this.fillCourtsTaken();

  }

  onDateChange(event: Event) {
    this.fillCourtsTaken();

  }

  fillCourtsTaken() {
    for (let reservation of this.courtReservations) {
      if (reservation.court_id == this.court.id && 
          reservation.date == this.chosenDate &&
          reservation.time == Number(this.time)) {
            this.courtsTaken[reservation.court_num - 1] = true;
          }
    }
  }

  enableBookACourt(i: number) {
    if (this.courtsTaken[i])
      return;
    this.selectedCourt = i;
  }

  bookTheCourt() {
    if (this.selectedCourt == -1)
      return;

    let courtReservation = new CourtReservation(this.court.id, this.selectedCourt + 1, this.chosenDate, Number(this.time),
  [-1, -1, -1, -1], 1, this.authenticationService.currentUserValue.id);

    this.courtReservations.push(courtReservation);
    this.localStorageService.setItem("courtReservations", this.courtReservations);

    this.fillCourtsTaken();
    this.selectedCourt = -1;
  }

  cancelBooking() {
    this.selectedCourt = -1;
  }

}
