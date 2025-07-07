import { Component, output } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../model/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private routerService: RouterService, private localStorageService: LocalStorageService) {}
  constructor(private routerService: RouterService, private localStorageService: LocalStorageService) {}
  goToUnimplemented() {
    this.routerService.navigateTo('unimplemented');
  }

  goToHome() {
    this.routerService.navigateTo('home');
  }

  goToNotification() {
    this.routerService.navigateTo('notification');
  }
  goToProfile() {
    let user = this.localStorageService.getItem("currentUser") as User;
    this.routerService.navigateTo("profile/" + user.id);
  }
}
