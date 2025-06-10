import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';
import { CourtReservation } from '../../model/court-reservation';
import { User } from '../../model/user';

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
  
  
  type: string = "";
  currentUser: User = this.localStorageService.getItem("currentUser") as User;
  users: User[] = this.localStorageService.getItem("users") as User[];
  pointsGained: number = 0;
  ranksGained: number = 0;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type') as string;
      if (this.type == "win") {
        let match: CourtReservation = this.localStorageService.getItem("match") as CourtReservation;
        this.pointsGained = match.points;
        this.ranksGained = Math.trunc(Math.random() * 5);
        if (this.currentUser.ranking - this.ranksGained <= 0) {
          this.ranksGained = this.currentUser.ranking - 1;
        }

        this.currentUser.ranking -= this.ranksGained;
        this.currentUser.pp_points += this.pointsGained;
        this.localStorageService.setItem("currentUser", this.currentUser);
        for (let i = 0; i < this.users.length; i++) {
          if (this.currentUser.id == this.users[i].id) {
            this.users[i] = this.currentUser;
            this.localStorageService.setItem("users", this.users);
            break;
          }
        }
      }

      setTimeout(() => {
        if (this.type == "booked") {
          this.routerService.navigateTo('home');
        } else if (this.type == "invite-player") {
          let courtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
          this.routerService.navigateTo('book-a-court/' + courtReservation.court_id);
        }  else if (this.type == "add-friend") {
          // let courtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
          this.routerService.back();
        } else if (this.type == "win" || this.type == "loss") {
          this.routerService.navigateTo('home');
        }
      }, 2500)
    });
  }
}
