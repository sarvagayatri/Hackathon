import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { CustomerService, FireBaseService } from './../../../services'
import * as firebase from "nativescript-plugin-firebase";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "login.html",
})
export class LoginComponent implements OnInit {

    public input: any;

    public constructor(private router: RouterExtensions,
        private fireBaseService: FireBaseService) {
        this.input = {
            "email": "",
            "password": ""
        }
    }

    public ngOnInit() {
        this.initFirebase();
        if (ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/secure"], { clearHistory: true });
        }
    }
    private initFirebase() {
        return this.fireBaseService.initFirebase().then((instance) => {
            return firebase.getAuthToken({
                // default false, not recommended to set to true by Firebase but exposed for {N} devs nonetheless :)
                forceRefresh: false
            }).then((authToken) => {
                console.log("auth-token", authToken);
            }).catch((errorMessage) => {
                console.log("error in login initfirebase::", errorMessage);
            });
        });
    }

    public login() {
        if (this.input.email && this.input.password) {
            let account = JSON.parse(ApplicationSettings.getString("account", "{}"));
            if (this.input.email == account.email && this.input.password == account.password) {
                ApplicationSettings.setBoolean("authenticated", true);
                this.router.navigate(["/secure"], { clearHistory: true });
            } else {
                (new SnackBar()).simple("Incorrect Credentials!");
            }
        } else {
            (new SnackBar()).simple("All Fields Required!");
        }
    }

}