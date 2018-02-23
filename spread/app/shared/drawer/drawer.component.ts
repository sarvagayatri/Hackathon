import { Component, Input, OnInit } from "@angular/core";
import { UserService } from './../../services';
import { Router, NavigationExtras } from "@angular/router";
import * as Constants from './../../constants';
import { ApplicationStateService } from "./../../common";
import { Customer } from "./../../entities";
// import * as SocialShare from "nativescript-social-share";
import { RouterExtensions as TNSRouterExtensions } from 'nativescript-angular/router/router-extensions';

@Component({
    moduleId: module.id,
    selector: 'drawer-content',
    templateUrl: "drawer.component.html",
    styleUrls: ["drawer.component.css"]
})
export class DrawerComponent {
    appVersionText: string = "";
    constructor(private userService: UserService,
        private router: Router,
        private routerExtensions: TNSRouterExtensions,
        public appState: ApplicationStateService) {
    }
    ngOnInit() {
    }
    logout() {
        this.userService.logout().then((result) => {
            this.emptyAppState();
            // this.router.navigate([Constants.APP_ROUTES.LOGIN]);
        }).catch((error) => {
            console.log("Error occured to logout firebase", JSON.stringify(error));
        });
    }
    emptyAppState() {
    }
    accountNavigation(route) {
        // this.router.navigate([formattedRoute(route)]);
    }

    refer() {
        // SocialShare.shareText("Hey, have you heard about QWIPO, it’s a one-stop app to shop all your Butchery, Sweets, Nursery, Medicines, Vegetables & Fruits and many more for free delivery at your doorstep.\n \nCompare the Prices among multiple vendors and choose from the best. \n \nUse my Referral Code " + this.appState.customer.referrelCode + " to Signup and get Rs.250 Qwipo cash. \n \nDownload from Playstore (https://play.google.com/store/apps/details?id=com.qwipo.customer) \n \nAppstore(https://itunes.apple.com/us/app/id1259836013) \n \nWhy stand in line when you can get online?");
    }
    profileNavigation() {
        if (this.appState.customer && this.appState.customer.name) {
            // this.routerExtensions.navigate([formattedRoute(Constants.APP_ROUTES.PROFILE)], {
            //     animated: true,
            //     transition: {
            //         name: "fade",
            //         duration: 200,
            //         curve: "linear"
            //     }
            // });

        }
    }
}
