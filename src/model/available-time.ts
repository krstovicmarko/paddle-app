export enum Availability {
    Taken = 0,
    Available = 1,
    Chosen = 2,
}
export class AvailableTime {
    time: string;
    availability: Availability;
    constructor(time: string, availability: Availability) {this.time = time; this.availability = availability;}
}
