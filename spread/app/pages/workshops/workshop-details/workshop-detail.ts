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
    customerId: string;
    selfCreator: boolean = false;
    alreadyLiked: boolean = false;
    constructor(private route: ActivatedRoute,
        private router: Router,
        private appState: ApplicationStateService,
        private workshopService: WorkshopService) {
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.workshop = JSON.parse(params["workshop"]);
            this.customerId = this.appState.customer.id;
            this.checkEnableStatus();
            console.log("received workshop:::", this.workshop);
        });
    }
    checkEnableStatus() {
        this.selfCreator = this.customerId === this.workshop.createdBy ? true : false;
        let isExists = this.workshop.interestedCandidates.filter(customerId => {
            return customerId === this.appState.customer.id;
        });
        this.alreadyLiked = isExists && isExists.length > 0;
    }

    interested() {
        this.workshop.interestedCandidates = this.workshop.interestedCandidates || [];
        this.workshop.interestedCandidates.push(this.appState.customer.id);
        console.log("received workshop:::", JSON.stringify(this.workshop));

        this.workshopService.update(this.workshop).then(result => {
            console.log("wORKSHOP UPDATED");
            this.router.navigate(["/workshopList"]);
        });
    }
}