export class CourtReservation {
    court_id: number;
    court_num: number;
    date: string;
    reservation_start_time: Date;
    reservation_end_time: Date;
    time: number;
    duration: number;
    player_ids: number[];
    started: boolean = false;
    finished: boolean = false;
    points: number = 0;
    sets: number[] = [-1, -1, -1, -1, -1, -1];
    approved: boolean = false;
    user_id: number;

    constructor(court_id: number, court_num: number, date: string, time: number, player_ids: number[], duration: number, user_id: number) {
        this.court_id = court_id;
        this.court_num = court_num;
        this.date = date;
        this.time = time;
        this.player_ids = player_ids;
        this.duration = duration;
        this.points = Math.trunc((Math.random() * 300));
        this.reservation_start_time = new Date(date);
        this.reservation_end_time = new Date(date);
        this.user_id=user_id;
    }

}