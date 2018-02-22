import { Injectable } from '@angular/core';
import { Customer } from './../entities';

@Injectable()
export class ApplicationStateService {

    customer: Customer;

    constructor() {
        this.customer = new Customer();
    }
}