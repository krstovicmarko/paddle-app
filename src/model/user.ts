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

    constructor(id: number, username: string, name: string, last_name: string, gender: Gender, pp_points: number) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.last_name = last_name;
        this.gender = gender;
        this.pp_points = pp_points;
    }
}
