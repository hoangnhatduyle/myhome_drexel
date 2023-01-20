import { Payment } from "./payment";
import { Photo } from "./photo";
import { Room } from "./room";


export interface Member {
    id: number;
    userName: string;
    photoUrl: string;
    age: number;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: Photo[];
    payments: Payment[];
    room: Room;
    leaseEnd: Date;
    address: string;
    rentalFee: number;
    lastRentalFee: number;
    phoneNumber: string;
    email: string;
}
