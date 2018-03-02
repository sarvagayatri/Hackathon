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
    templateUrl: "workshops-willing.html",
})

export class WorkshopsWillingComponent extends DrawerPage {
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
        this.geUserInterestedWorkshops(this.customer.id);
    }
    geUserInterestedWorkshops(customerId: string) {
        // this.workshopService.geUserInterestedWorkshops(this.appState.customer.id).then(workshops => {
        //     let workshopsCustomArray = toCustomArray(workshops);
        //     this.filterWorkshopsByDate(workshopsCustomArray);
        // });
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
    }
}