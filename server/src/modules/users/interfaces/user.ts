import {UserAddress} from "./address";
export interface UserInterface {
    name: string;
    email: string;
    phone:number;
    address: UserAddress;
    password:string;
    status:number;
    role:string;
    gender:number;
    reference:string;
    createdAt:Date;
}