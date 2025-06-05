import { Component } from '@angular/core';
import { CourtReservation } from '../../model/court-reservation';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterService } from '../../services/router.service';
import { ConfirmMatchComponent } from '../confirm-match/confirm-match.component';

@Component({
  selector: 'app-your-match',
  standalone: true,
  imports: [ConfirmMatchComponent],
  templateUrl: './your-match.component.html',
  styleUrl: './your-match.component.css'
})
export class YourMatchComponent {

  constructor(private localStorageService: LocalStorageService, private routerService: RouterService) {}

  courtReservation: CourtReservation = this.localStorageService.getItem("match") as CourtReservation;
}
