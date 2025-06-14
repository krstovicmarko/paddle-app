import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Court } from '../../model/court';
import { RouterService } from '../../services/router.service';
import { Gender, User } from '../../model/user';
import { Friends } from '../../model/friends';
import { CourtReservation } from '../../model/court-reservation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private routerService: RouterService, private localStorageService: LocalStorageService) {}
  courts: Court[] = [];
  upcomingMatch?: CourtReservation = undefined;
  currentUser?: User;
  users?: User[];
  ngOnInit(): void {
    let localStorageService: LocalStorageService = this.localStorageService;
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

    this.users = localStorageService.getItem("users");

    if (!localStorageService.exists("currentUser")) {
      localStorageService.setItem("currentUser", (localStorageService.getItem("users") as User[])[0]);
    }
    this.currentUser = (localStorageService.getItem("users") as User[])[0];

    if (!localStorageService.exists("friends")) {
      localStorageService.setItem("friends", [
        new Friends(0, 0, 1),
        new Friends(1, 0, 2),
        new Friends(2, 0, 5),
        new Friends(3, 0, 7),
        new Friends(4, 9, 0),
      ]);
    }

    if (!localStorageService.exists("courtReservations")) {
      let date = new Date();
      date = new Date(date.getTime() + (1000 * 60 * 60 * 24 * 2));
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();


      let court = (localStorageService.getItem("courts") as Court[])[0];

      localStorageService.setItem("courtReservations", [
        new CourtReservation(court.id, 1, `${year}-${month}-${day}`, court.work_hours_start + 2, [0, 1, 2, 3], 1),
        new CourtReservation(court.id, 1, `${year}-${month}-${day}`, court.work_hours_start + 4, [3, 4, 5, -1], 1)
      ]);
    }

    if (!localStorageService.exists("friendRequests")) {
      localStorageService.setItem("friendRequests", []);
    }
    this.courts = localStorageService.getItem("courts") as Court[];

    this.upcomingMatch = this.getUpcomingMatch();
  }

  goToBookACourt(id: number) {
    this.routerService.navigateTo("book-a-court/" + id);
  }

  getUpcomingMatch(): CourtReservation | undefined {
    let courtReservation = undefined;
    let courtReservations = this.localStorageService.getItem("courtReservations") as CourtReservation[];
    let minYear = Infinity;
    let minMonth = Infinity;
    let minDay = Infinity;
    let minHour = Infinity;
    
    for (let reservation of courtReservations) {
      if (reservation.finished == true)
          continue;
      let players = reservation.player_ids;
      for (let id of players) {
        if (id == this.currentUser!.id) {
          let date = reservation.date.split("-");
          let year = Number(date[0]);
          let month = Number(date[1]);
          let day = Number(date[2]);
          let hour = reservation.time;

          if (year < minYear || (
              year == minYear && (
                month < minMonth || (
                  month == minMonth && (
                    day < minDay || (
                      day == minDay &&
                      hour < minHour
                    )
                  )
                )
              )
          ))
          {
            courtReservation = reservation;
            minDay = day;
            minMonth = month;
            minYear = year;
            minHour = hour;
          }

          break;
        }
      }
    }

    return courtReservation;

  }

  getUpcomingMatchDate(): string {
    let date = this.upcomingMatch!.date.split('-');
    let year = date[0];
    let month = (Number(date[1])).toString().padStart(2, '0');
    let day = date[2].padStart(2, '0');

    return `${day}.${month}.${year}`;
  }

  getUpcomingMatchCourt(): string {
    let court = this.courts.find((court) => this.upcomingMatch!.court_id == court.id);
    return court!.name;
  }

  playerName(i: number): string {
    let playerId = this.upcomingMatch!.player_ids[i];
    if (playerId == this.currentUser!.id)
        return "Me";
    
    let user = this.users!.find((user) => playerId == user.id);
    return user!.name;
  }

  goToUnimplemented() {
    this.routerService.navigateTo("unimplemented");
  }

  getUpcomingMatchTimeString() {
    let months = [31,28,31,30,31,30,31,31,30,31,30,31]
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();

    let matchDate = this.upcomingMatch!.date.split("-");
    let matchYear = Number(matchDate[0]);
    let matchMonth = Number(matchDate[1]);
    let matchDay = Number(matchDate[2]);
    let matchHour = this.upcomingMatch!.time;

    if (year < matchYear) {
      if (year == matchYear - 1) {
        return `Your match starts in ${matchMonth + 12 - month} months`; 
      } else {
        return "Your match won't happen soon";
      }
    } else if (month < matchMonth) {
      if (month == matchMonth - 1) {
        return `Your match starts in ${matchDay + months[month - 1] - day}`;
      } else {
        return `Your match starts in ${matchMonth - month} months`;
      }
    } else if (day < matchDay) {
      if (day == matchDay - 1) {
        return `Your match starts in ${matchHour + 24 - hour} hours`;
      } else {
        return `Your match starts in ${matchDay - day} days`;
      }
    } else if (hour < matchHour) {
      if (hour == matchHour - 1) {
        return `Your match starts in ${60 - minute} minutes`;
      } else {
        return `Your match starts in ${matchHour - hour} hours`;
      }
    } else {
      return "Your match starts soon!";
    }
  }

  goToYourMatch() {
    this.localStorageService.setItem("match", this.upcomingMatch!);
    this.routerService.navigateTo("your-match");
  }
}
