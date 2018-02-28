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
            this.workshops = sortObjectsByDate(toCustomArray(result));
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
