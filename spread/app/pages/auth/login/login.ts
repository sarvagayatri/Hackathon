import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { CustomerService, FireBaseService, UserService } from './../../../services'
import * as firebase from "nativescript-plugin-firebase";
import { ApplicationStateService } from './../../../common';

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "login.html",
})
export class LoginComponent implements OnInit {

    public userName: string = "sarva@gg.com";
    public password: string = "test@123";

    public constructor(private router: RouterExtensions,
        private fireBaseService: FireBaseService,
        private userService: UserService,
        private customerService: CustomerService,
        private appState: ApplicationStateService) {

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
        if (this.userName && this.password) {
            this.userService.login(this.userName, this.password).then((response) => {
                console.log("response::", JSON.stringify(response));
                this.customerService.getCustomer(response.uid).then(result => {
                    this.appState.customer = result;
                    this.router.navigate(["/worshopReg"], { clearHistory: true });
                });
            }).catch((error) => {
                (new SnackBar()).simple("Login Failed..! User Doesn't Exists or Password wrong.");
            });

            // let account = JSON.parse(ApplicationSettings.getString("account", "{}"));
            // if (this.userName == account.userName && this.password == account.password) {
            //     // ApplicationSettings.setBoolean("authenticated", true);
            //     // this.router.navigate(["/secure"], { clearHistory: true });
            // } else {
            //     (new SnackBar()).simple("Incorrect Credentials!");
            // }
        } else {
            (new SnackBar()).simple("All Fields Required!");
        }
    }

}