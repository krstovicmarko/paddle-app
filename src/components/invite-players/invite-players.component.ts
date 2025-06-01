import { Component } from '@angular/core';
import { User } from '../../model/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Friends } from '../../model/friends';
import { CourtReservation } from '../../model/court-reservation';

@Component({
  selector: 'app-invite-players',
  standalone: true,
  imports: [],
  templateUrl: './invite-players.component.html',
  styleUrl: './invite-players.component.css'
})
export class InvitePlayersComponent {

  inviteFriends: boolean = true;
  friends: User[] = [];
  idx: number = -1;
  courtReservation: CourtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;

  constructor(private route: ActivatedRoute, private localStorageService: LocalStorageService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
          this.idx = Number(params.get('idx') as string);
    });

    let users: User[] = this.localStorageService.getItem("users") as User[];
    let friends: Friends[] = this.localStorageService.getItem("friends") as Friends[];
    let currentUser: User = this.localStorageService.getItem("currentUser") as User;

    for (let f of friends) {
      if (currentUser.id == f.user_id_1 || currentUser.id == f.user_id_2) {
        let friendId = currentUser.id == f.user_id_1 ? f.user_id_2 : f.user_id_1;
        for (let u of users) {
          if (u.id == friendId) {
            this.friends.push(u);
          }
        }
      }
    }

  }

  invite(i: number) {
    for (let j = 0; j < this.courtReservation.player_ids.length; j++) {
      if (this.courtReservation.player_ids[j] == i) {
        this.courtReservation.player_ids[j] = -1;
        if (j < this.idx || this.idx == -1) {
          this.idx = j;
        }
        this.localStorageService.setItem("courtReservation", this.courtReservation);
        return;
      }
    }

    if (this.idx < this.courtReservation.player_ids.length) {
      this.courtReservation.player_ids[this.idx] = i;
      this.localStorageService.setItem("courtReservation", this.courtReservation);
      if (this.idx + 1 < this.courtReservation.player_ids.length &&
            this.courtReservation.player_ids[this.idx + 1] == -1) {
              this.idx = this.idx + 1;
      } else {
        this.idx = -1;
      }
    }
  }

  invited(i: number): boolean {
    for (let j = 0; j < this.courtReservation.player_ids.length; j++) {
      if (this.courtReservation.player_ids[j] == i) {
        return true;
      }
    }
    return false;
  }

}
