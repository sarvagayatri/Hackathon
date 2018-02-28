import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Workshop } from "../../../entities";
import { ApplicationStateService } from "../../../common";
import { WorkshopService } from "../../../services";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-detail.html",
})
export class WorkshopDetailComponent {
    workshop: Workshop;
    constructor(private route: ActivatedRoute,
        private appState: ApplicationStateService,
        private workshopService: WorkshopService) {
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.workshop = JSON.parse(params["workshop"]);
            console.log("received workshop:::", this.workshop);
        });
    }
    interested() {
        this.workshop.interestedCandidates.push(this.appState.customer.id);
        this.workshopService.update(this.workshop).then(result => {
            console.log("clicked interested");
        });
    }
}