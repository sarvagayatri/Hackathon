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
            this.router.navigate(['login']);
        }).catch((error) => {
            console.log("Error occured to logout firebase", JSON.stringify(error));
        });
    }
    emptyAppState() {
        this.appState.userId = "";
        this.appState.customer = new Customer();
    }
    accountNavigation(route) {
        this.router.navigate([(route)]);
    }

    profileNavigation() {
        if (this.appState.customer && this.appState.customer.name) {
            this.routerExtensions.navigate(['profile'], {
                animated: true,
                transition: {
                    name: "fade",
                    duration: 200,
                    curve: "linear"
                }
            });

        }
    }
}
