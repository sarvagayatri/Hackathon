import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DrawerPage } from "./../../shared/drawer.page";
import { Customer, Workshop } from "../../entities";
import { ApplicationStateService } from "../../common";
import { WorkshopService, FireBaseService } from "../../services";
import { toCustomArray } from './../../common/utility'

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshops-user.html",
})

export class UserWorkshopsComponent extends DrawerPage {
    customer: Customer;
    workshops: Array<Workshop>;
    constructor(private changeDetectorRef: ChangeDetectorRef,
        private appState: ApplicationStateService,
        private workshopService: WorkshopService,
        private fireBaseService: FireBaseService) {
        super(changeDetectorRef);
        this.customer = this.appState.customer;
    }

    ngOnInit() {
        this.initFirebase().then(() => {
            this.geCustomertWorkshops();
        });
    }
    private initFirebase() {
        return this.fireBaseService.initFirebase().then((instance) => {
        }).catch((errorMessage) => {
            console.log("error in login initfirebase::", errorMessage);
        });
    }
    geCustomertWorkshops() {
        this.workshopService.getCustomerWorkshops('dkrITPu3B4b48O9CmcdG7YtzzB32').then(workshops => {
            this.workshops = toCustomArray(workshops);
            console.log("workshops::", JSON.stringify(this.workshops));
            
        });
    }
}