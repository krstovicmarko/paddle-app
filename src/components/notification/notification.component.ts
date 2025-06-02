import { Component, NgModule } from '@angular/core';
import { CourtReservation } from '../../model/court-reservation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
upcomingMatch: CourtReservation | null = {
  court_id:1,
  court_num: 1,
  date: '2025-07-01',
  time: 10,
  player_ids: [1, 2],
  duration: 60
}

}
