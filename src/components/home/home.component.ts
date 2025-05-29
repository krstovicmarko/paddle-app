import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Court } from '../../model/court';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private routerService: RouterService) {}
  courts: Court[] = [];
  ngOnInit(): void {
    let localStorageService: LocalStorageService = new LocalStorageService();
    if (!localStorageService.exists("pages")) {
      localStorageService.setItem("pages", ["home", "unimplemented"]);
    }
    // if (!localStorageService.exists("previousPages")) {
      localStorageService.setItem("previousPages", []);
    // }

    // if (!localStorageService.exists("currentPage")) {
      localStorageService.setItem("currentPage", "home");
    // }
    if (!localStorageService.exists("courts")){
      localStorageService.setItem("courts",
        [
          new Court(0, "Padel court 1", "../../assets/images/padel-court-1.png", "Beogradska 63", 8, 18, 4000),
          new Court(1, "Padel court 2", "../../assets/images/padel-court-2.png", "Krunska 26", 10, 22, 3800),
          new Court(2, "Padel court 3", "../../assets/images/padel-court-3.png", "Patrisa Lumumbe 11", 9, 23, 4200),
        ]
      );
    }

    this.courts = localStorageService.getItem("courts") as Court[];

  }

  goToBookACourt(id: number) {
    this.routerService.navigateTo("book-a-court/" + id);
  }
}
