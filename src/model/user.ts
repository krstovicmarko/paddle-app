export enum Gender {
    Male = 0,
    Female = 1
}

export class User {
    id: number;
    username: string;
    name: string;
    last_name: string;
    gender: Gender;
    pp_points: number;
    wins: number;
    loses: number;
    // points: number;
    ranking: number;
    availableToPlay: boolean = true;
    favouriteHand: string = "right";
    favouriteMatch: string = "competitive";
    favouriteCourt: number = 0;
    phone: string = "+38160666666";
    mail: string = "dummy@gmail.com";
    dateOfBirth: string = "01.01.2001.";
    my_clubs: number[];

    constructor(id: number, username: string, name: string, last_name: string, gender: Gender, pp_points: number, my_clubs: number[]) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.last_name = last_name;
        this.gender = gender;
        this.pp_points = pp_points;
        this.wins = Math.trunc((Math.random() * 200));
        this.loses = Math.trunc((Math.random() * 200));
        this.ranking = 200 - this.wins + this.loses; 
        this.my_clubs = my_clubs;
    }
}