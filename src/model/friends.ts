export class Friends {
    friendship_id: number;
    user_id_1: number;
    user_id_2: number;

    constructor(friendship_id: number, user_id_1: number, user_id_2: number) {
        this.friendship_id = friendship_id;
        this.user_id_1 = user_id_1;
        this.user_id_2 = user_id_2;
    }
}
