export class Court {
    constructor(id: number, name: string, img_path: string, location: string,
                work_hours_start: number, work_hours_end: number,
                price_per_hour: number, num_of_courts: number)
    {
        this.id = id;
        this.name=name;
        this.img_path=img_path;
        this.location = location;
        this.work_hours_start = work_hours_start;
        this.work_hours_end = work_hours_end;
        this.price_per_hour = price_per_hour;
        this.num_of_courts = num_of_courts;
    }
    id: number;
    name: string;
    img_path: string;
    location: string;
    work_hours_start: number;
    work_hours_end: number;
    price_per_hour: number;
    num_of_courts: number;
}
