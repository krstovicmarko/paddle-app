export class CourtReservation {
    court_id: number;
    court_num: number;
    date: string;
    time: number;
    duration: number;
    player_ids: number[];
    started: boolean = false;
    finished: boolean = false;
    points: number = 0;
    sets: number[] = [-1, -1, -1, -1, -1, -1];
    approved: boolean = false;

    constructor(court_id: number, court_num: number, date: string, time: number, player_ids: number[], duration: number) {
        this.court_id = court_id;
        this.court_num = court_num;
        this.date = date;
        this.time = time;
        this.player_ids = player_ids;
        this.duration = duration;
        this.points = Math.trunc((Math.random() * 300));
    }

}