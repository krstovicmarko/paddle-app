import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Court } from '../../model/court';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [],
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.css'
})
export class PromotionsComponent {
  idClub: number = 0;

  club: Court | null = null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idClub');
    this.club = this.getClubById(id);
  }

  getClubById(id: string | null): Court | null {
    const clubs: Court[] = JSON.parse(localStorage.getItem('courts') || '[]');
    if (id) {
      const clubId = parseInt(id, 10);
      return clubs.find(club => club.id === clubId) || null;
    }
    return null;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const giftsSection = document.querySelector('.gifts-section');
    const scrollPosition = window.scrollX;
    if (!giftsSection) return;
    if (scrollPosition > 50) {
      giftsSection.classList.add('visible');
    } else {
      giftsSection.classList.remove('visible');
    }
  }
}
