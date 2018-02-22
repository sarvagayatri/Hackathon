import { Address } from './';

export class Customer {
    id: string = "";
    isActive: boolean = true;
    name: string = "";
    nameLowerCase: string = "";
    email: string = "";
    emailLowerCase: string = "";
    mobileNumber: string = "";
    address: Address = new Address();
    createdDate: number;
}