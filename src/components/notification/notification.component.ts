import { Component, NgModule } from '@angular/core';
import { CourtReservation } from '../../model/court-reservation';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../services/router.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../model/user';
import { MatchDisplay } from '../../model/match-display';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  users: User[] = [];

  constructor(
    private routerService: RouterService,
    private localStorageService: LocalStorageService
  ) { }

  upcomingMatchCourtReservation?: CourtReservation;
  upcomingMatch: MatchDisplay = {
    date: '',
    time: '',
    court: '',
    matchType: '',
    myTeam: '',
    opponent: '',
    expanded: false
  }

  ngOnInit() {
    this.loadUsers();
    this.loadMatches();

  }

  loadUsers() {
    this.users = this.localStorageService.getItem("users") as User[];
  }

  async loadMatches() {
    let courtReservations = this.localStorageService.getItem("courtReservations") as CourtReservation[]
    let me = this.localStorageService.getItem("currentUser");
    courtReservations = courtReservations.filter(cr => !cr.finished && !cr.started && cr.player_ids.includes(me.id));


    const now = new Date();
    const upcomingReservations = courtReservations
      .filter(reservation => {
        const reservationDate = new Date(reservation.date);
        return reservationDate.getTime() > now.getTime() ||
          (reservationDate.toDateString() === now.toDateString() && reservation.time > now.getHours());
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateA.toDateString() === dateB.toDateString()) {
          return a.time - b.time;
        }

        return dateA.getTime() - dateB.getTime();
      });


    const closestReservation = upcomingReservations[0];
    this.upcomingMatchCourtReservation = closestReservation;
    console.log(closestReservation);
    const players = await this.getPlayersInfo(closestReservation.player_ids);

    this.upcomingMatch = {
      date: this.formatDate(closestReservation.date),
      time: this.formatTime(closestReservation.time),
      myTeam: this.getMyTeamNames(players),
      opponent: this.getOpponentNames(players),
      players: players
    } as MatchDisplay
  }

  goToMatchHistory() {
    this.routerService.navigateTo('match-history');
  }

  goToFriendships() {
    this.routerService.navigateTo('friendships');
  }
 
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }

  formatTime(startTime: number): string {
    return `${startTime.toString().padStart(2, '0')}:00`
  }
  private getMyTeamNames(players: User[]): string {
    let myName = this.localStorageService.getItem("currentUser").name + ' ' + this.localStorageService.getItem("currentUser").last_name.at(0) + '.';
    if (players.length == 2) {
      return myName;
    }
    const currentUserId = this.localStorageService.getItem("currentUser").id;
    let indexCurrentUser = players.findIndex(p => p.id === currentUserId);
    let teammateIndex: number = 0
    switch (indexCurrentUser) {
      case 0:
        teammateIndex = 2
        break
      case 1:
        teammateIndex = 3
        break
      case 2:
        teammateIndex = 0
        break
      case 3:
        teammateIndex = 1
        break
    }
    let teammateName = players.find(p => p.id === players[teammateIndex].id)?.name + ' ' + players.find(p => p.id === players[teammateIndex].id)?.last_name.at(0) + '.';

    return myName + '&' + teammateName;

  }

  async getPlayersInfo(playerIds: number[]): Promise<User[]> {
    return Promise.all(playerIds.map(id =>
      this.users.find(user => user.id === id) || new User(id, 'Unknown', id.toString(), 'Unknown', 0, 0)
    ));
  }

  private getOpponentNames(players: User[]): string {
    if (players.length == 2) {
      let op = players.find(p => p.id !== this.localStorageService.getItem("currentUser").id)
      let opName = op ? (op?.name + ' ' + op?.last_name.at(0) + '.') : 'Unknown';
      return opName;
    }
    const currentUserId = this.localStorageService.getItem("currentUser").id;
    let indexCurrentUser = players.findIndex(p => p.id === currentUserId);
    let opponentIndices: number[] = []
    switch (indexCurrentUser) {
      case 0:
        opponentIndices = [1, 3]
        break
      case 1:
        opponentIndices = [0, 2]
        break
      case 2:
        opponentIndices = [1, 3]
        break
      case 3:
        opponentIndices = [0, 2]
        break
    }
    let opponentIds: number[] = players.map(p => p.id).filter((_, index) => opponentIndices.includes(index));

    return this.users
      .filter(p => opponentIds.includes(p.id))
      .map(p => `${p.name} ${p.last_name.at(0)}.`)
      .join('&');

  }

  startMatch() {
    this.localStorageService.setItem("match", this.upcomingMatchCourtReservation!);
    this.routerService.navigateTo("your-match");
  }
}
