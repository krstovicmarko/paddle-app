import { Gender } from "./user";

export class PlayerSearch {
    league: number;
    gender: Gender;

    constructor(league: number, gender: Gender) {
        this.league = league;
        this.gender = gender;
    }
}
