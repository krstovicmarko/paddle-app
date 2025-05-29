import { Component, output } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private routerService: RouterService) {}
  goToUnimplemented() {
    this.routerService.navigateTo('unimplemented');
  }
}
