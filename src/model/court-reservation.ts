export class CourtReservation {
    court_id: number;
    court_num: number;
    date: string;
    time: number;
    player_ids: number[];


    constructor(court_id: number, court_num: number, date: string, time: number, player_ids: number[]) {
        this.court_id = court_id;
        this.court_num = court_num;
        this.date = date;
        this.time = time;
        this.player_ids = player_ids;
    }

}
