import { FireBaseService } from './';
import { Workshop } from './../entities';
import { DB_PATH } from './../constants'
import { Injectable } from '@angular/core';

@Injectable()
export class WorkshopService {
    constructor(private firebaseService: FireBaseService) {
    }
    save(workshop: Workshop): Promise<any> {
        return new Promise((resolve, reject) => {
            workshop.cityLowercase = workshop.city && workshop.city.toLowerCase();
            workshop.createdDate = new Date().getTime();
            workshop.categoryLowercase = workshop.category && workshop.category.toLocaleLowerCase();
            console.log("workshop::", JSON.stringify(workshop));
            let path = `${DB_PATH.WORKSHOPS}`;
            return this.firebaseService.insert(path, workshop).then((insertResult) => {
                console.log("key:::", insertResult.key);
                let path = `${DB_PATH.WORKSHOPS}/${insertResult.key}`;
                workshop.id = insertResult.key;
                return this.firebaseService.setValue(path, workshop).then(() => {
                    resolve(workshop);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    }

    // getCustomer(uid): Promise<Customer> {
    //     let dbPath = `${DB_PATH.CUSTOMER}/${uid}`;
    //     return this.firebaseService.getDetailsByQuery(dbPath).then((result) => {
    //         if (!result.error && result.value) {
    //             return result.value;
    //         }
    //     });
    // }

    getWorkshopDetailsByCityCategory(city: string, category: string): Promise<any> {
        let dbPath = `${DB_PATH.WORKSHOPS}`;
        let searchFieldName = "categoryLowercase";
        return this.firebaseService.getDetailsByQuery(dbPath, searchFieldName, category).then((result) => {
            if (!result.error && result.value) {
                return result.value;
            }
        });
    }
    getCustomerWorkshops(customerId: string): Promise<any> {
        let dbPath = `${DB_PATH.WORKSHOPS}`;
        let searchFieldName = "createdBy";
        return this.firebaseService.getDetailsByQuery(dbPath, searchFieldName, customerId).then((result) => {
            if (!result.error && result.value) {
                return result.value;
            }
        });
    }
}