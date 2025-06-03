export class FriendRequest {
    id: number;
    sender_id: number;
    receiver_id: number;

    constructor(id: number, sender_id: number, receiver_id: number) {
        this.id = id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
    }
}
