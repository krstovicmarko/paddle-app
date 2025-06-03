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

  currentPage: string = "";
  constructor(private localStorageService: LocalStorageService, private router: Router, private routerService: RouterService) {
    this.setName();
    this.router.events.subscribe(() => {this.setName();})
  }

  setName() {
    this.currentPage = this.localStorageService.getItem("currentPage") as string;
    console.log(this.currentPage);
    if (this.currentPage == null) {
      this.name = "Padel Point";
      this.haveBackButton = false;
      return;
    }
    if(this.currentPage != 'home' && !this.currentPage.includes("confirmation") && 
    (!this.currentPage.includes("profile") || this.currentPage.includes("edit"))) {
      let len = this.currentPage.indexOf("/") != -1 ? this.currentPage.indexOf("/") : this.currentPage.length;
      let currentPageTmp = this.currentPage[0].toUpperCase() + this.currentPage.substring(1, len);
      currentPageTmp = currentPageTmp.replaceAll("-", " ");
      currentPageTmp = currentPageTmp.replaceAll("_", " ");
      this.name = currentPageTmp;
      this.haveBackButton = true;
    } else if(this.currentPage == 'home') {
      this.name = "Padel Point"; 
      this.haveBackButton = false;
    
    } else if (this.currentPage.includes("profile")) {
      this.name = "My profile";
      this.haveBackButton = true;
    } 
    else {
      this.name = "";
      this.haveBackButton = false;
    }
  }
  
  back() {
    this.routerService.back();
  }
  name: string = "Padel Point";
  haveBackButton: boolean = false;


  goToUnimplemented() {
    this.routerService.navigateTo('unimplemented');
  }

  goToEditProfile() {
    this.routerService.navigateTo("edit-profile");
  }
}
