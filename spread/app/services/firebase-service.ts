import { Injectable } from '@angular/core';
import { getString, setString } from "application-settings";
var fs = require("file-system");
var firebase = require("nativescript-plugin-firebase");
import { BaseConfig, IConfig } from './../common/base-config';

declare var com: any;
declare var google: any;
declare var FirebaseAuth: any;

@Injectable()
export class FireBaseService {
    constructor(private baseConfig: BaseConfig) {
    }
    login(obj: any): Promise<any> {
        return firebase.login(obj);
    }
    logout(): Promise<any> {
        return firebase.logout();
    }
    insert(dbPath, object): Promise<any> {
        return firebase.push(dbPath, object);
    }
    update(dbPath, object): Promise<any> {
        return firebase.update(dbPath, object);
    }
    setValue(dbPath: string, obj: any): Promise<any> {
        return firebase.setValue(dbPath, obj);
    }
    getDetailsByQuery(dbPath: string, searchFieldName?: string, searchFieldValue?: string): Promise<any> {
        let options = {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since'
            }
        };
        if (searchFieldName && searchFieldValue) {
            (<any>Object).assign(options, {
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: searchFieldName
                },
                range: {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: searchFieldValue
                }
                // limit: {
                //     type: firebase.QueryLimitType.LAST,
                //     value: 1
                // }
            });
        }
        let promise = firebase.query(result => result,
            dbPath,
            options
        );
        return promise;
    }
    createUser(email: string, password: string): Promise<any> {
        return firebase.createUser({
            email: email,
            password: password,
        });
    }
    changePassword(email: string, oldPassword: string, newPassword: string): Promise<any> {
        return firebase.changePassword({
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    }
    resetPassword(email: string): Promise<any> {
        return firebase.resetPassword({
            email: email
        });
    }
    initFirebase(): Promise<any> {
        return firebase.init({
            onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
                if (data.loggedIn) {
                }
            },
            // storageBucket: this.baseConfig.current.firebaseStorageBucketName
        }).then((instance) => {
            var token = com.google.firebase.iid.FirebaseInstanceId.getInstance().getToken();
            token = token || '';
            setString("firebase-token", token);
        });
    }
}