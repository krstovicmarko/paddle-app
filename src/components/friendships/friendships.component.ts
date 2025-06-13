import { Component } from '@angular/core';
import { InvitePlayersComponent } from '../invite-players/invite-players.component';

@Component({
  selector: 'app-friendships',
  standalone: true,
  imports: [InvitePlayersComponent],
  templateUrl: './friendships.component.html',
  styleUrl: './friendships.component.css'
})
export class FriendshipsComponent {

}
