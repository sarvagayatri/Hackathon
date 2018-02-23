import { Injectable } from '@angular/core';
import { Customer } from './../entities';

@Injectable()
export class ApplicationStateService {

    customer: Customer;
    userId: string;

    constructor() {
        this.customer = new Customer();
    }
}