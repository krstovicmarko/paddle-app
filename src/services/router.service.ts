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
      this.localStorageService.setItem("previousPages", []);
    } else {
      let previousPages = this.localStorageService.getItem("previousPages") as Array<any>;
      previousPages.push(currentPage);
      this.localStorageService.setItem("previousPages", previousPages);
    }
    this.localStorageService.setItem("currentPage", route);
    console.log(`navigateTo: ${route}`);
    this.router.navigate([route]);
  }

  back(): void {
    let previousPages = this.localStorageService.getItem("previousPages") as Array<any>;
    if (previousPages.length != 0) {
      let prevPage = previousPages.pop() as string;
      this.localStorageService.setItem("previousPages", previousPages);
      this.localStorageService.setItem("currentPage", prevPage);
      this.router.navigate([prevPage]);
    }
  }
}
