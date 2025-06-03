import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';
import { CourtReservation } from '../../model/court-reservation';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {

  constructor(
              private route: ActivatedRoute, 
              private localStorageService: LocalStorageService,
              private routerService: RouterService
            ) {}

  type: string = ""
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type') as string;

      setTimeout(() => {
        if (this.type == "booked") {
          this.routerService.navigateTo('home');
        } else if (this.type == "invite-player") {
          let courtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
          this.routerService.navigateTo('book-a-court/' + courtReservation.court_id);
        }  else if (this.type == "add-friend") {
          // let courtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
          this.routerService.back();
        }
      }, 2500)
    });
  }
}
