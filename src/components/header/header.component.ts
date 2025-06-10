import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { RouterService } from '../../services/router.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentPage: string = "";
  constructor(private localStorageService: LocalStorageService, 
      private router: Router, 
      private routerService: RouterService, 
      private location: Location) {
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

    // console.log(this.location.path());
    if (this.location.path().includes("employee-interface")) {
      this.name = "Employee interface";
      this.haveBackButton = false;
      this.localStorageService.setItem("previousPages", ["home"]);
      this.currentPage = "employee-interface";
      this.localStorageService.setItem("currentPage", this.currentPage);
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
