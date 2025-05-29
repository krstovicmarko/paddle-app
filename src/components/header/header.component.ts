import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private localStorageService: LocalStorageService, private router: Router, private routerService: RouterService) {
    this.setName();
    this.router.events.subscribe(() => {this.setName();})
  }

  setName() {
    let currentPage = this.localStorageService.getItem("currentPage") as string;
    if((this.localStorageService.getItem("currentPage") as string) != 'home') {
      let len = currentPage.indexOf("/") != -1 ? currentPage.indexOf("/") : currentPage.length;
      currentPage = currentPage[0].toUpperCase() + currentPage.substring(1, len);
      currentPage = currentPage.replaceAll("-", " ");
      currentPage = currentPage.replaceAll("_", " ");
      this.name = currentPage;
      this.haveBackButton = true;
    } else {
      this.name = "Padel Point"; 
      this.haveBackButton = false;
    }
  }
  
  back() {
    this.routerService.back();
  }
  name: string = "Padel Point";
  haveBackButton: boolean = false;
}
