import { Message } from "./message";
import { MonthlyPayment } from "./monthlyPayment";
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
    payment: Payment[];
    messages: Message[];
    room: Room;
    leaseStart: Date;
    leaseEnd: Date;
    address: string;
    phoneNumber: string;
    notes: string;
    email: string;
    active: boolean;
    monthlyPayment: MonthlyPayment;
}
