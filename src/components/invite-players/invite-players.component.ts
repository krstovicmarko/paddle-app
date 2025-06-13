import { Component } from '@angular/core';
import { Gender, User } from '../../model/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Friends } from '../../model/friends';
import { CourtReservation } from '../../model/court-reservation';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayerSearch } from '../../model/player-search';
import { RouterService } from '../../services/router.service';
import { FriendRequest } from '../../model/friend-request';

@Component({
  selector: 'app-invite-players',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-players.component.html',
  styleUrl: './invite-players.component.css'
})
export class InvitePlayersComponent {

  friendships: boolean = false;
  inviteFriends: boolean = true;
  friends: User[] = [];
  potentialFriends: User[] = [];
  idx: number = -1;
  courtReservation: CourtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
  isSingle: boolean = false;
  gender: boolean = false;
  selectedLeague: string = '0';
  friendRequests: FriendRequest[] = this.localStorageService.getItem("friendRequests") as FriendRequest[];
  currentUser: User = this.localStorageService.getItem("currentUser") as User;
  friendRelations = this.localStorageService.getItem("friends") as Friends[];

  constructor(private route: ActivatedRoute, private localStorageService: LocalStorageService,
              private routerService: RouterService, private location: Location
  ) {

  }

  ngOnInit() {

    let users: User[] = this.localStorageService.getItem("users") as User[];
    let friends = this.friendRelations;
    let currentUser: User = this.currentUser;

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
    
    console.log(this.location.path());
    if (this.location.path().includes("friendships")) {
      this.friendships = true;

      for (let friendRequest of this.friendRequests) {
        if (friendRequest.receiver_id == currentUser.id) {
          for (let user of users) {
            if (user.id == friendRequest.sender_id) {
              this.potentialFriends.push(user);
              break;
            }
          }
        }
      }

      return;
    }

    this.route.paramMap.subscribe(params => {
      this.idx = Number(params.get('idx') as string);
    });
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

    if (this.idx < this.courtReservation.player_ids.length && this.idx != -1) {
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

  accept(id: number) {
    for (let i = 0; i < this.friendRequests.length; i++) {
      let friendRequest = this.friendRequests[i];
      if (friendRequest.sender_id == id && friendRequest.receiver_id == this.currentUser.id) {
        this.friendRequests[i] = this.friendRequests[this.friendRequests.length - 1];
        this.friendRequests.pop();
        this.localStorageService.setItem("friendRequests", this.friendRequests);
      }
    }

    for (let i = 0; i < this.potentialFriends.length; i++) {
      let friend = this.potentialFriends[i];
      if (friend.id == id) {
        this.potentialFriends[i] = this.potentialFriends[this.potentialFriends.length - 1];
        this.potentialFriends.pop();
        this.friends.push(friend);
        break;
      }
    }
    this.friendRelations.push(new Friends(this.friends.length, id, this.currentUser.id));
    this.localStorageService.setItem("friends", this.friendRelations);
  }
}
