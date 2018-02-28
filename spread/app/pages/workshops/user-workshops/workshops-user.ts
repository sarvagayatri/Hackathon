import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DrawerPage } from "./../../../shared/drawer.page";
import { Customer, Workshop } from "../../../entities";
import { ApplicationStateService } from "../../../common";
import { WorkshopService, FireBaseService } from "../../../services";
import { toCustomArray } from './../../../common/utility'
import { Router, NavigationExtras } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshops-user.html",
})

export class UserWorkshopsComponent extends DrawerPage {
    customer: Customer;
    workshops: Array<Workshop>;
    noWorkShopsFound: boolean = false;
    constructor(private changeDetectorRef: ChangeDetectorRef,
        private appState: ApplicationStateService,
        private workshopService: WorkshopService,
        private fireBaseService: FireBaseService,
        private router: Router) {
        super(changeDetectorRef);
        this.customer = this.appState.customer;
    }

    ngOnInit() {
        this.geCustomertWorkshops();
    }
    geCustomertWorkshops() {
        this.workshopService.getCustomerWorkshops(this.appState.customer.id).then(workshops => {
            this.workshops = toCustomArray(workshops);
            if (this.workshops.length === 0) {
                this.noWorkShopsFound = true;
            }
        });
    }
    editWorkshop(workshop) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "workshop": JSON.stringify(workshop)
            }
        };
        this.router.navigate(["/workshop-update"], navigationExtras);
    }
}