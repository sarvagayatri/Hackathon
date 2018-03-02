import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { SnackBar } from "nativescript-snackbar";
import { CustomerService, FireBaseService, UserService } from './../../../services'
import * as firebase from "nativescript-plugin-firebase";
import { ApplicationStateService } from './../../../common';
import { toCustomArray } from "../../../common/utility";
import { CacheManager } from "../../../common/cache-manager";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "login.html",
})
export class LoginComponent implements OnInit {

    public userName: string = "laxmi@ee.com";
    public password: string = "test@123";
    public displayStatus: boolean;

    public constructor(private router: RouterExtensions,
        private fireBaseService: FireBaseService,
        private userService: UserService,
        private customerService: CustomerService,
        private appState: ApplicationStateService) {

    }

    public ngOnInit() {
        return this.initFirebase()
            // .then(() => {
            //     CacheManager.remove('account');
            // });
            .then(() => {
                this.checkUserLoggedIn();
            }).catch((error) => {
                console.log("Error in login ngonit", error);
                // this.checkUserLoggedIn();
            });
    }
    checkUserLoggedIn() {
        let customer = CacheManager.get('account') && JSON.parse(CacheManager.get('account')) || null;
        if (customer) {
            this.appState.customer = customer;
            console.log("appstate customer::", JSON.stringify(this.appState.customer));
            this.router.navigate(["/workshopList"]);
        }
    }
    private initFirebase() {
        return this.fireBaseService.initFirebase().then((instance) => {
        }).catch((errorMessage) => {
            console.log("error in login initfirebase::", errorMessage);
        });
    }

    public login() {
        if (this.userName && this.password) {
            this.userService.login(this.userName, this.password).then((response) => {
                this.customerService.getCustomer(response.uid).then(result => {
                    this.appState.customer = result;
                    CacheManager.set("account", JSON.stringify(result));
                    this.router.navigate(["/workshopList"]);
                });
            }).catch((error) => {
                (new SnackBar()).simple("Login Failed..! User Doesn't Exists or Password wrong.");
            });


        } else {
            (new SnackBar()).simple("All Fields Required!");
        }
    }

}