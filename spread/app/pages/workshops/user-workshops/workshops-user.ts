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
    upcomingWorkshops: Array<Workshop> = [];
    pastWorkshops: Array<Workshop> = [];
    noPastWorkshops: boolean = false;
    noUpcomingWorkshops: boolean = false;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private appState: ApplicationStateService,
        private workshopService: WorkshopService,
        private router: Router) {
        super(changeDetectorRef);
        this.customer = this.appState.customer;
    }

    ngOnInit() {
        this.geCustomertWorkshops();
    }
    geCustomertWorkshops() {
        this.workshopService.getCustomerWorkshops(this.appState.customer.id).then(workshops => {
            let workshopsCustomArray = toCustomArray(workshops);
            this.filterWorkshopsByDate(workshopsCustomArray);
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
    filterWorkshopsByDate(workshops: Array<Workshop>) {
        let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime();
        let upcomingWorkshops: any = workshops.filter(workshop => {
            return workshop.date > yesterday;
        });
        let pastWorkshops: any = workshops.filter(workshop => {
            return workshop.date <= yesterday;
        });

        this.upcomingWorkshops = upcomingWorkshops.sortElements("date");
        this.pastWorkshops = pastWorkshops.sortElements("date");

        this.noUpcomingWorkshops = this.upcomingWorkshops.length === 0;
        this.noPastWorkshops = this.pastWorkshops.length === 0;

        console.log("worlshop upcomingWorkshops array::", JSON.stringify(upcomingWorkshops));
        console.log("worlshop pastWorkshops array::", JSON.stringify(pastWorkshops));

    }
}