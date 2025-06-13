import { Component } from '@angular/core';
import { Court } from '../../model/court';
import { LocalStorageService } from '../../services/local-storage.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-club-membership',
  standalone: true,
  imports: [],
  templateUrl: './club-membership.component.html',
  styleUrl: './club-membership.component.css'
})
export class ClubMembershipComponent {
  clubs: Court[] = []

  constructor(private localStorageService: LocalStorageService, private routerService: RouterService) { }

  ngOnInit() {
    this.clubs = this.localStorageService.getItem('courts') as Court[];
  }

  goToJoinClub(clubId: number) {
    this.routerService.navigateTo('my-club/' + clubId);
  }

  touchActive: number | null = null;

  activateTouch(clubId: number) {
    this.touchActive = clubId;
    setTimeout(() => this.touchActive = null, 200); // Fallback ako touchend ne okine
  }

  deactivateTouch() {
    this.touchActive = null;
  }
  
}
