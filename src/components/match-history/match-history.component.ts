import { Component, OnInit } from '@angular/core';
import { CourtReservation } from '../../model/court-reservation';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterService } from '../../services/router.service';
import { MatchDisplay } from '../../model/match-display';

@Component({
  selector: 'app-match-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-history.component.html',
  styleUrl: './match-history.component.css'
})
export class MatchHistoryComponent implements OnInit {
  activeTab: 'previous' | 'upcoming' = 'previous';
  previousMatches: MatchDisplay[] = [];
  upcomingMatches: MatchDisplay[] = [];
  users: User[] = [];

  constructor(
    private routerService: RouterService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.loadMatches();

  }

  loadUsers() {
    this.users = this.localStorageService.getItem("users") as User[];
  }

  async loadMatches() {
    const courtReservations = this.localStorageService.getItem("courtReservations") as CourtReservation[]
    courtReservations.sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime() || a.time - b.time);
    const today = new Date();
    let myId = this.localStorageService.getItem("currentUser").id;
    const allMatches = await Promise.all(courtReservations.filter(a => a.player_ids.includes(myId)).map(async cr => {
      const players = await this.getPlayersInfo(cr.player_ids);
      return {
        date: this.formatDate(cr.date),
        time: this.formatTime(cr.time),
        court: this.getCourtName(cr.court_num),
        matchType: players.length > 2 ? 'Double' : 'Single',
        score: cr.finished ? `${cr.points} Points` : undefined,
        result: cr.finished ? this.determineResult(cr) : undefined,
        myTeam: this.getMyTeamNames(players),
        expanded: false,
        opponent: this.getOpponentNames(players),
        players: players
      } as MatchDisplay;

    }));

    this.previousMatches = allMatches.filter(m => {
      const matchDate = new Date(m.date.split('.').reverse().join('-'));
      return matchDate < today;
    });

    this.upcomingMatches = allMatches.filter(m => {
      const matchDate = new Date(m.date.split('.').reverse().join('-'));
      return matchDate >= today;
    });
  }

  async getPlayersInfo(playerIds: number[]): Promise<User[]> {
    return Promise.all(playerIds.map(id =>
      this.users.find(user => user.id === id) || new User(id, 'Unknown', id.toString(), 'Unknown', 0, 0, "", [], [0])
    ));
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  }

  formatTime(startTime: number): string {
    return `${startTime.toString().padStart(2, '0')}:00`
  }

  determineResult(reservation: CourtReservation): 'W' | 'L' {
    let myTeam = 0;
    let currentUser: User = this.localStorageService.getItem("currentUser") as User;
    for (let i = 0; i < reservation.player_ids.length; i++) {
      if(currentUser.id == reservation.player_ids[i])
      {
        myTeam = i % 2;
      }
    }

    let opponentTeam = myTeam ^ 1;
    let setsWon = 0;

    for (let i = 0; i < 3; i++) {
      if (reservation.sets[i * 2 + myTeam] > reservation.sets[i * 2 + opponentTeam])
        setsWon += 1;
    }

    return setsWon >= 2 ? 'W' : 'L';
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

  private getCourtName(idCourt: number): string {
    const courts = this.localStorageService.getItem("courts") as any[];

    return courts.find((court: any) => court.id === idCourt)?.name || 'Unknown Court';
  }

  showTab(tab: 'previous' | 'upcoming'): void {
    this.activeTab = tab;
  }

  goToMatchHistory() {
    this.routerService.navigateTo('match-history');
  }


  toggleExpand(i: number, match: any): void {
    match.expanded = !match.expanded;
    let chev = document.getElementById(i + 'chev');
    if (match.expanded) {

      chev?.classList.add('bi-chevron-down');
      chev?.classList.remove('bi-chevron-right');
    } else {
      chev?.classList.add('bi-chevron-right');
      chev?.classList.remove('bi-chevron-down');
    }
  }
}
