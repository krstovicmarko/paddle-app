import { Component } from '@angular/core';
import { Gender, User } from '../../model/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Friends } from '../../model/friends';
import { CourtReservation } from '../../model/court-reservation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerSearch } from '../../model/player-search';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-invite-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-players.component.html',
  styleUrl: './invite-players.component.css'
})
export class InvitePlayersComponent {

  inviteFriends: boolean = true;
  friends: User[] = [];
  idx: number = -1;
  courtReservation: CourtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
  isSingle: boolean = false;
  gender: boolean = false;
  selectedLeague: string = '0';

  constructor(private route: ActivatedRoute, private localStorageService: LocalStorageService,
              private routerService: RouterService
  ) {

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

    this.isSingle = this.courtReservation.player_ids.length == 2;

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

  changeMatch(type: string) {
    if (type == 'single') {
      this.isSingle = true;
      if (this.courtReservation.player_ids.length != 2) {
        this.courtReservation.player_ids = [this.courtReservation.player_ids[0], this.courtReservation.player_ids[1]];
      }
    } else {
      this.isSingle = false;
      if (this.courtReservation.player_ids.length != 4) {
        this.courtReservation.player_ids = [this.courtReservation.player_ids[0], this.courtReservation.player_ids[1], -1, -1];
      }
    }

    this.localStorageService.setItem("courtReservation", this.courtReservation);
  }

  searchPlayers() {

    this.localStorageService.setItem("playerSearch", new PlayerSearch(Number(this.selectedLeague), this.gender ? Gender.Female : Gender.Male));
    this.routerService.navigateTo("search-players/" + this.idx);

  }
}
