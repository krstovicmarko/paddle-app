import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Court } from '../../model/court';
import { RouterService } from '../../services/router.service';
import { Gender, User } from '../../model/user';
import { Friends } from '../../model/friends';
import { CourtReservation } from '../../model/court-reservation';
import { FriendRequest } from '../../model/friend-request';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private routerService: RouterService, private localStorageService: LocalStorageService,
    private courtSvc:CourtService
  ) {}
  courts: Court[] = [];
  upcomingMatch?: CourtReservation = undefined;
  currentUser?: User;
  users?: User[];
  items?:any[];
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
    if (!localStorageService.exists("courts")) {
      localStorageService.setItem("courts",
        [
          new Court(0, "Padel court 1", "../../assets/images/padel-court-1.png", "Beogradska 63", 8, 18, 4000, 3, 4, 1000, ["../../assets/images/padel-court-1-1.png"]),
          new Court(1, "Padel court 2", "../../assets/images/padel-court-2.png", "Krunska 26", 10, 22, 3800, 4, 2, 340, ["../../assets/images/padel-court-1-1.png"]),
          new Court(2, "Padel court 3", "../../assets/images/padel-court-3.png", "Patrisa Lumumbe 11", 9, 23, 4200, 2, 4, 850, ["../../assets/images/padel-court-1-1.png"]),
          new Court(3, "Padel court 4", "../../assets/images/padel-court-4.png", "Dunavska 1", 8, 18, 4000, 3, 3, 540, ["../../assets/images/padel-court-1-1.png"]),
          new Court(4, "Padel court 5", "../../assets/images/padel-court-5.png", "Vatroslava Jagica 26", 10, 22, 3800, 4, 3, 500, ["../../assets/images/padel-court-1-1.png"]),
          new Court(5, "Padel court 6", "../../assets/images/padel-court-6.png", "Knez Mihajlova 11", 9, 23, 4200, 2, 4, 730, ["../../assets/images/padel-court-1-1.png"])
        ]
      );
    }

    if (!localStorageService.exists("users")) {
      localStorageService.setItem("users",
        [
          new User(0, "milos", "Milos", "Milosevic", Gender.Male, 10, [0,1,2]),
          new User(1, "lazar", "Lazar", "Lazarevic", Gender.Male, 100, [0,2]),
          new User(2, "jovana", "Jovana", "Jovanovic", Gender.Female, 1000, [3]),
          new User(3, "ivan", "Ivan", "Ivanovic", Gender.Male, 334, [0,1]),
          new User(4, "isidora", "Isidora", "Isidorovic", Gender.Female, 11, [1]),
          new User(5, "danilo", "Danilo", "Danilovic", Gender.Male, 543, [1,2]),
          new User(6, "marko", "Marko", "Markovic", Gender.Male, 123, [0,1]),
          new User(7, "ksenija", "Ksenija", "Ksencic", Gender.Female, 125, [0,1]),
          new User(8, "mirko", "Mirko", "Mirkovic", Gender.Male, 678, [1,3,4]),
          new User(9, "antonija", "Antonija", "Antonic", Gender.Female, 234, [1,2]),
          new User(10, "antonije", "Antonije", "Antonic", Gender.Male, 166, [1]),
        ]

      );
    }
    this.loadItems();
    this.users = localStorageService.getItem("users");

    if (!localStorageService.exists("currentUser")) {
      this.currentUser = (localStorageService.getItem("users") as User[])[0];
      localStorageService.setItem("currentUser", this.currentUser);
    } else {
      this.currentUser = localStorageService.getItem("currentUser") as User;
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

    if (!localStorageService.exists("friendRequests")) {
      localStorageService.setItem("friendRequests", [
        new FriendRequest(0, 3, 0),
        new FriendRequest(1, 4, 0),
      ]);
    }


    if (!localStorageService.exists("friendRequests")) {
      localStorageService.setItem("friendRequests", []);
    }
    this.courts = localStorageService.getItem("courts") as Court[];


    if (!localStorageService.exists("courtReservations")) {
      let date = new Date();
      date = new Date(date.getTime() + (1000 * 60 * 60 * 24 * 2));
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");


      let court = (localStorageService.getItem("courts") as Court[])[0];

      const sampleMatches: CourtReservation[] = [
        new CourtReservation(1, 1, '2023-06-15', 18, [0, 1, 2, 3], 2),
        new CourtReservation(2, 2, '2023-06-10', 20, [0, 4], 1),
        new CourtReservation(0, 1, '2023-05-28', 16, [5, 6, 7, 8], 2),
        new CourtReservation(1, 1, '2023-05-20', 19, [0, 9, 10, 1], 2),
        new CourtReservation(1, 1, '2024-06-25', 18, [0, 1, 2, 3], 2),
        new CourtReservation(2, 2, '2024-01-22', 20, [0, 4], 1),
        new CourtReservation(0, 1, '2025-01-28', 16, [5, 6, 7, 8], 2),
        new CourtReservation(1, 1, '2025-02-20', 19, [0, 9, 10, 1], 2),
        new CourtReservation(0, 1, '2025-01-23', 16, [0, 1, 3, 2], 2),
        new CourtReservation(1, 1, '2025-03-20', 19, [0, 9, 10, 1], 2),

        new CourtReservation(2, 2, '2026-07-11', 19, [0, 6, 2, 3], 2),
        new CourtReservation(1, 1, '2026-07-15', 17, [5, 1], 1),
        new CourtReservation(0, 1, '2025-12-20', 20, [0, 10], 1),
        new CourtReservation(2, 2, '2025-09-25', 18, [1, 0, 9, 2], 2),
        new CourtReservation(1, 2, '2025-07-20', 19, [2, 0, 9, 3], 2),
        new CourtReservation(0, 2, '2025-09-21', 20, [1, 4, 0, 5], 2),
        new CourtReservation(2, 2, '2025-12-30', 18, [7, 0, 6, 2], 2),
        new CourtReservation(court.id, 1, `${year}-${month}-${day}`, court.work_hours_start + 2, [0, 1, 2, 3], 1),
        new CourtReservation(court.id, 1, `${year}-${month}-${day}`, court.work_hours_start + 4, [3, 4, 5, -1], 1)
      ];

      sampleMatches[0].finished = true;
      sampleMatches[0].sets = [6, 3, 6, 3, 6, 4];
      sampleMatches[1].finished = true;
      sampleMatches[1].sets = [4, 6, 7, 5, 6, 4];
      sampleMatches[2].finished = true;
      sampleMatches[2].sets = [7, 5, 4, 6, 2, 6];
      sampleMatches[3].finished = true;
      sampleMatches[3].sets = [2, 5, 4, 6, 7, 6];
      sampleMatches[4].finished = true;
      sampleMatches[4].sets = [6, 3, 4, 6, 6, 4];
      sampleMatches[5].finished = true;
      sampleMatches[5].sets = [4, 6, 2, 6, 3, 6];
      sampleMatches[6].finished = true;
      sampleMatches[6].sets = [7, 5, 7, 6, 3, 6];
      sampleMatches[7].finished = true;
      sampleMatches[7].sets = [2, 5, 3, 6, 4, 6];
      sampleMatches[8].finished = true;
      sampleMatches[8].sets = [7, 5, 6, 7, 4, 6];
      sampleMatches[9].finished = true;
      sampleMatches[9].sets = [2, 5, 7, 6, 6, 4];

      localStorageService.setItem("courtReservations", sampleMatches);
    }

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
    let nowDate = new Date();

    for (let reservation of courtReservations) {
      if (reservation.finished == true)
          continue;
      let reservationDate = new Date(reservation.date);
      if (reservationDate < nowDate)
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
        return `Your match starts in ${matchDay + months[month - 1] - day} days`;
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
