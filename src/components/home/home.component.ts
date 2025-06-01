import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Court } from '../../model/court';
import { RouterService } from '../../services/router.service';
import { Gender, User } from '../../model/user';
import { Friends } from '../../model/friends';

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
          new Court(0, "Padel court 1", "../../assets/images/padel-court-1.png", "Beogradska 63", 8, 18, 4000, 3),
          new Court(1, "Padel court 2", "../../assets/images/padel-court-2.png", "Krunska 26", 10, 22, 3800, 4),
          new Court(2, "Padel court 3", "../../assets/images/padel-court-3.png", "Patrisa Lumumbe 11", 9, 23, 4200, 2),
        ]
      );
    }

    if (!localStorageService.exists("users")) {
      localStorageService.setItem("users",
        [
          new User(0, "milos", "Milos", "Milosevic", Gender.Male, 10),
          new User(1, "lazar", "Lazar", "Lazarevic", Gender.Male, 100),
          new User(2, "jovana", "Jovana", "Jovanovic", Gender.Female, 1000),
          new User(3, "ivan", "Ivan", "Ivanovic", Gender.Male, 334),
          new User(4, "isidora", "Isidora", "Isidorovic", Gender.Female, 11),
          new User(5, "danilo", "Danilo", "Danilovic", Gender.Male, 543),
          new User(6, "marko", "Marko", "Markovic", Gender.Male, 123),
          new User(7, "ksenija", "Ksenija", "Ksencic", Gender.Female, 125),
          new User(8, "mirko", "Mirko", "Mirkovic", Gender.Male, 678),
          new User(9, "antonija", "Antonija", "Antonic", Gender.Female, 234),
          new User(10, "antonije", "Antonije", "Antonic", Gender.Male, 166),
        ]

      );
    }

    if (!localStorageService.exists("currentUser")) {
      localStorageService.setItem("currentUser",(localStorageService.getItem("users") as User[])[0]);
    }

    if (!localStorageService.exists("friends")) {
      localStorageService.setItem("friends", [
        new Friends(0, 0, 1),
        new Friends(1, 0, 2),
        new Friends(2, 0, 5),
        new Friends(3, 0, 7),
        new Friends(4, 9, 0),
      ]);
    }

    this.courts = localStorageService.getItem("courts") as Court[];

  }

  goToBookACourt(id: number) {
    this.routerService.navigateTo("book-a-court/" + id);
  }
}
