import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) { }

  localStorageService: LocalStorageService = new LocalStorageService();

  navigateTo(route: string): void {
    let currentPage = this.localStorageService.getItem("currentPage") as string;
    if (route == "home") {
      this.localStorageService.setItem("previouPages", []);
    } else {
      let previousPages = this.localStorageService.getItem("previousPages") as Array<any>;
      previousPages.push(currentPage);
      this.localStorageService.setItem("previousPages", previousPages);
    }
    this.localStorageService.setItem("currentPage", route);
    this.router.navigate([route]);
  }

  back(): void {
    let previouPages = this.localStorageService.getItem("previousPages") as Array<any>;
    if (previouPages.length != 0) {
      let prevPage = previouPages.pop() as string;
      this.localStorageService.setItem("previousPages", previouPages);
      this.localStorageService.setItem("currentPage", prevPage);
      this.router.navigate([prevPage]);
    }
  }
}
