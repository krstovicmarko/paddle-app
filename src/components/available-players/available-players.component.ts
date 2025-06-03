import { Component } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../services/router.service';
import { User } from '../../model/user';
import { Friends } from '../../model/friends';
import { CourtReservation } from '../../model/court-reservation';
import { FriendRequest } from '../../model/friend-request';

@Component({
  selector: 'app-available-players',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './available-players.component.html',
  styleUrl: './available-players.component.css'
})
export class AvailablePlayersComponent {

  currentUserId: number = (this.localStorageService.getItem("currentUser") as User).id;
  user: User = this.localStorageService.getItem("currentUser") as User;
  users: User[] = this.localStorageService.getItem("users") as User[];
  friends: Friends[] = this.localStorageService.getItem("friends") as Friends[];
  friendRequests: FriendRequest[] = this.localStorageService.getItem("friendRequests") as FriendRequest[];
  userId: number = 0;
  idx: number = 0;
  courtReservation: CourtReservation = this.localStorageService.getItem("courtReservation") as CourtReservation;
  friendRequestSent: boolean = false;

  constructor(private localStorageService: LocalStorageService, 
              private route: ActivatedRoute,
              private routerService: RouterService) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params  => {
      this.userId = Number(params.get("id"));
      
      for (let user of this.users) {
        if (this.userId == user.id) {
          this.user = user;
          break;
        }
      }

      this.idx = Number(params.get("idx"));
    });
    for (let request of this.friendRequests) {
      if ((request.sender_id == this.userId || request.receiver_id == this.userId) &&
           (request.sender_id == this.currentUserId || request.receiver_id == this.currentUserId))
           {
            this.friendRequestSent = true;
            break;
           }
    }

  }
        

  invitePlayer() {
    let i = this.userId;

    if (this.idx < this.courtReservation.player_ids.length && this.idx != -1) {
      this.courtReservation.player_ids[this.idx] = i;
      this.localStorageService.setItem("courtReservation", this.courtReservation);
      if (this.idx + 1 < this.courtReservation.player_ids.length &&
            this.courtReservation.player_ids[this.idx + 1] == -1) {
              this.idx = this.idx + 1;
      } else {
        this.idx = -1;
      }
      this.routerService.navigateTo("confirmation/invite-player");
    }
  }

  addFriend() {
    let i = this.userId;

    for (let friendship of this.friends) {
      if ((friendship.user_id_1 == i || friendship.user_id_2 == i) &&
           (friendship.user_id_1 == this.currentUserId || friendship.user_id_2 == this.currentUserId)) {
            return;
           }
    }

    let next_id = 0;
    for (let request of this.friendRequests) {
      if ((request.sender_id == i || request.receiver_id == i) &&
           (request.sender_id == this.currentUserId || request.receiver_id == this.currentUserId))
           {
            return
           }
      next_id++;
    }

    let newFriendRequest = new FriendRequest(next_id, this.currentUserId, i);
    this.friendRequests.push(newFriendRequest);
    this.localStorageService.setItem("friendRequests", this.friendRequests);
    this.friendRequestSent = true;
    this.routerService.navigateTo("confirmation/add-friend");

  }
}
