import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Customer, Workshop } from './../../../entities';
import { WorkshopService } from './../../../services'
import { toCustomArray, ApplicationStateService, sortObjectsByDate } from './../../../common'
import { DrawerPage } from "./../../../shared/drawer.page";
import { Router, NavigationExtras } from "@angular/router";


@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-list.html",
})
export class WorkshopListComponent extends DrawerPage {
    upcomingWorkshops: Array<Workshop> = [];
    pastWorkshops: Array<Workshop> = [];
    noPastWorkshops: boolean = false;
    noUpcomingWorkshops: boolean = false;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private workshopService: WorkshopService,
        private router: Router,
        private appState: ApplicationStateService
    ) {
        super(changeDetectorRef);
    }
    public ngOnInit() {
        return this.getWorkshopDetails("mumbai", "education");
    }

    getWorkshopDetails(city: string, category: string) {
        this.workshopService.getWorkshopDetailsByCityCategory(city, category).then((result) => {
            let workshopsCustomArray: any = toCustomArray(result);
            this.filterWorkshopsByDate(workshopsCustomArray);
        })
    }
    navigation(workshop) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "workshop": JSON.stringify(workshop)
            }
        };
        this.router.navigate(["/workshop-detail"], navigationExtras);
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
