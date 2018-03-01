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
    workshops: Array<Workshop> = [];
    noWorkShopsFound: boolean = false;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private workshopService: WorkshopService,
        private router: Router,
        private appState: ApplicationStateService
    ) {
        super(changeDetectorRef);
    }
    public ngOnInit() {
        return this.getWorkshopDetails("mumbai111", "education");
    }

    getWorkshopDetails(city: string, category: string) {
        this.workshopService.getWorkshopDetailsByCityCategory(city, category).then((result) => {
            let workshopsCustomArray: any = toCustomArray(result);
            this.workshops = workshopsCustomArray.sortElements("date");
            // console.log("result::", JSON.stringify(result));
            this.noWorkShopsFound = this.workshops.length === 0;
            // console.log("workshops::", JSON.stringify(this.workshops));
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
}
