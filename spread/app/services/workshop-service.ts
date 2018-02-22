import { FireBaseService } from './';
import { Workshop } from './../entities';
import { DB_PATH } from './../constants'
import { Injectable } from '@angular/core';

@Injectable()
export class WorkshopService {
    constructor(private firebaseService: FireBaseService) {
    }
    save(workshop: Workshop): Promise<any> {
        workshop.cityLowercase = workshop.city && workshop.city.toLowerCase();
        workshop.createdDate = new Date().getTime();
        let path = `${DB_PATH.WORKSHOPS}/${workshop.cityLowercase}/${workshop.category}`;
        return this.firebaseService.setValue(path, workshop);
    }

    // getCustomer(uid): Promise<Customer> {
    //     let dbPath = `${DB_PATH.CUSTOMER}/${uid}`;
    //     return this.firebaseService.getDetailsByQuery(dbPath).then((result) => {
    //         if (!result.error && result.value) {
    //             return result.value;
    //         }
    //     });
    // }
}