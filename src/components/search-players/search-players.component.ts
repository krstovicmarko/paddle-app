import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../model/user';
import { Friends } from '../../model/friends';
import { ActivatedRoute } from '@angular/router';
import { PlayerSearch } from '../../model/player-search';
import { CourtReservation } from '../../model/court-reservation';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-search-players',
  standalone: true,
  imports: [],
  templateUrl: './search-players.component.html',
  styleUrl: './search-players.component.css'
})
export class SearchPlayersComponent {

  constructor(private localStorageService: LocalStorageService, private route: ActivatedRoute,
              private routerService: RouterService) {}
  
  friendshipsPage: boolean = false;
  players: User[] = this.localStorageService.getItem("users") as User[];
  currentUser: User = this.localStorageService.getItem("currentUser") as User;
  friendships: Friends[] = this.localStorageService.getItem("friends") as Friends[];
  idx: number = 0;
  playerSearch: PlayerSearch = this.localStorageService.getItem("playerSearch") as PlayerSearch;
  courtReservation: CourtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.idx = Number(params.get('idx') as string);
    });
    for (let friendship of this.friendships) {
      if (friendship.user_id_1 == this.currentUser.id || friendship.user_id_2 == this.currentUser.id) {
        let idToKick = friendship.user_id_1;
        if (friendship.user_id_1 == this.currentUser.id)
          idToKick = friendship.user_id_2;

        let indexToKick = -1;
        for (let i = 0; i < this.players.length; i++) {
          if (this.players[i].id == idToKick) {
            indexToKick = i;
            break;
          }
        }

        if (indexToKick != -1) {
          this.players[indexToKick] = this.players[this.players.length - 1];
          this.players.pop();
        }
      }
    }

    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].id == this.currentUser.id) {
        this.players[i] = this.players[this.players.length - 1];
        this.players.pop();
        break;
      }
    }

    if (this.playerSearch.league > 1) {
      this.players = [];
      return;
    }

    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].gender != this.playerSearch.gender) {
        this.players[i] = this.players[this.players.length - 1];
        this.players.pop();
        i--;
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

  availablePlayer(i: number) {
    this.routerService.navigateTo('available-players/' + i + "/" + this.idx);
  }
}
