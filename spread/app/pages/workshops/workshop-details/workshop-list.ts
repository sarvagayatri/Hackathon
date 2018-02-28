import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Customer, Workshop } from './../../../entities';
import { WorkshopService } from './../../../services'
import { toCustomArray, ApplicationStateService } from './../../../common'
import { DrawerPage } from "./../../../shared/drawer.page";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-list.html",
})
export class WorkshopListComponent extends DrawerPage {
    workshops: Array<Workshop> = [];

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private workshopService: WorkshopService,
        private router: RouterExtensions,
        private appState: ApplicationStateService
    ) {
        super(changeDetectorRef);
    }
    public ngOnInit() {
        return this.getWorkshopDetails("mumbai", "education");
    }

    getWorkshopDetails(city: string, category: string) {
        this.workshopService.getWorkshopDetailsByCityCategory(city, category).then((result) => {
            // console.log("result::", JSON.stringify(result));
            this.workshops = toCustomArray(result);
            // console.log("workshops::", JSON.stringify(this.workshops));

        })
    }
    navigation(workshop) {
        this.appState.workshop = workshop;
        this.router.navigate(["/workshop-detail"]);
    }
}
