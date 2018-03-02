import { FireBaseService } from './';
import { Workshop } from './../entities';
import { DB_PATH } from './../constants'
import { Injectable } from '@angular/core';
import { ApplicationStateService } from '../common';

@Injectable()
export class WorkshopService {
    constructor(private firebaseService: FireBaseService,
        private appState: ApplicationStateService) {
    }
    save(workshop: Workshop): Promise<any> {
        return new Promise((resolve, reject) => {
            workshop.cityLowercase = workshop.city && workshop.city.toLowerCase();
            workshop.createdDate = new Date().getTime();
            workshop.categoryLowercase = workshop.category && workshop.category.toLocaleLowerCase();
            workshop.city_category = `${workshop.cityLowercase}_${workshop.categoryLowercase}`;
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
    getWorkshopDetails(city: string): Promise<any> {
        let dbPath = `${DB_PATH.WORKSHOPS}`;
        let searchFieldName = "cityLowercase"
        let searchFielValue = city.toLowerCase();

        return this.firebaseService.getDetailsByQuery(dbPath, searchFieldName, searchFielValue).then((result) => {
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
    // geUserInterestedWorkshops(customerId: string): Promise<any> {
    //     let dbPath = `${DB_PATH.WILLING}/`;
    //     return true;
    //     // return this.firebaseService.getDetailsByQuery
    // }
    update(workshop: Workshop): Promise<any> {
        let path = `${DB_PATH.WORKSHOPS}/${workshop.id}/interestedCandidates`;
        return new Promise((resolve, reject) => {
            return this.firebaseService.update(path, "true").then(() => {
                resolve(workshop);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    update1(workshop: Workshop, child: string): Promise<any> {
        let path = `${DB_PATH.WORKSHOPS}/${workshop.id}/interestedCandidates/${child}`;
        return new Promise((resolve, reject) => {
            return this.firebaseService.setValue(path, true).then(() => {
                resolve(workshop);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}