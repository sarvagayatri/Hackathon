import { FireBaseService } from './';
import { Customer } from './../entities';
import { DB_PATH } from './../constants'
import { Injectable } from '@angular/core';

@Injectable()
export class CustomerService {
    constructor(private firebaseService: FireBaseService) {
    }
    save(customer: Customer, password: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.firebaseService.createUser(customer.email, password).then((insertResult) => {
                let path = `${DB_PATH.CUSTOMER}/${insertResult.key}`;
                customer.id = insertResult.key;
                customer.nameLowerCase = customer.name && customer.name.toLowerCase();
                customer.emailLowerCase = customer.email && customer.email.toLocaleLowerCase();
                customer.cityLowercase = customer.city && customer.city.toLowerCase();
                customer.createdDate = new Date().getTime();
                return this.firebaseService.setValue(path, customer).then((results) => {
                    resolve(customer);
                }).catch((error) => {
                    console.log("error block service::", error);
                    reject("The email address is already in use by another account.");
                });
            });
        });
    }

    getCustomer(uid): Promise<Customer> {
        let dbPath = `${DB_PATH.CUSTOMER}/${uid}`;
        return this.firebaseService.getDetailsByQuery(dbPath).then((result) => {
            if (!result.error && result.value) {
                return result.value;
            }
        });
    }
}