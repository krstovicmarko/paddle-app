import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Court } from '../../model/court';
import { User } from '../../model/user';
import { CommonModule } from '@angular/common';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-my-club',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-club.component.html',
  styleUrl: './my-club.component.css'
})
export class MyClubComponent {

  idClub: number = 0;

  club: Court | null = null;
  club_members: User[] = [];

  constructor(private route: ActivatedRoute, private routerService:RouterService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.club = this.getClubById(id);
    this.club_members = this.getClubMembers(this.club?.id || 0);
  }

  activeTab: 'activity' | 'matches' = 'activity';

  setActiveTab(tab: 'activity' | 'matches') {
    this.activeTab = tab;
  }

  getClubById(id: string | null): Court | null {
    const clubs: Court[] = JSON.parse(localStorage.getItem('courts') || '[]');
    if (id) {
      const clubId = parseInt(id, 10);
      return clubs.find(club => club.id === clubId) || null;
    }
    return null;
  }

  getClubMembers(clubId:number | null): User[] {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    if (clubId !== null) {
      return users.filter(user => user.my_clubs.includes(clubId));
    }
    return [];
  }

  navigateToPromotions() {
    this.routerService.navigateTo('promotions/'+ this.club?.id || '0' );
  }
  navigateToBookCourt() {
    this.routerService.navigateTo('book-a-court/' + this.club!.id);
  }
  navigateToVamosGroup() {
    this.routerService.navigateTo('unimplemented');
  }


}
