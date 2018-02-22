import { Injectable } from '@angular/core';
import { FireBaseService } from './';
import { Customer } from './../entities';

var firebase = require("nativescript-plugin-firebase");

@Injectable()
export class UserService {
    constructor(private firebaseService: FireBaseService) {

    }
    login(username, password): Promise<any> {
        let obj: any = {
            type: firebase.LoginType.PASSWORD
        };
        var passwordOptions = {
            email: username,
            password: password
        };
        obj.passwordOptions = passwordOptions;
        return this.firebaseService.login(obj);
    }
    logout(): Promise<any> {
        return this.firebaseService.logout();
    }
}