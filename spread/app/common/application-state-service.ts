import { Injectable } from '@angular/core';
import { Customer, Workshop } from './../entities';

@Injectable()
export class ApplicationStateService {

    customer: Customer;
    userId: string;
    workshop : Workshop;

    constructor() {
        this.customer = new Customer();
    }
}