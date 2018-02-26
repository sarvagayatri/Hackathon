import { Component, ChangeDetectorRef } from "@angular/core";
import { Customer } from "./../../../entities";
import { DrawerPage } from "./../../../shared/drawer.page";
import { ApplicationStateService } from "../../../common";

@Component({
    moduleId: module.id,
    selector: "profile",
    templateUrl: "profile.html"
})
export class ProfileComponent extends DrawerPage {
    customer: Customer;
    constructor(private changeDetectorRef: ChangeDetectorRef,
        private appState: ApplicationStateService) {
        super(changeDetectorRef);
    }
    ngOnInit() {
        this.customer = this.appState.customer;
    }
}