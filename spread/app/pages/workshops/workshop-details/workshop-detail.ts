import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Workshop, Customer } from "../../../entities";
import { ApplicationStateService, getNames } from "../../../common";
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
    previousWorkshop: boolean = false;
    workshopType = {
        "past": 1,
        "upcoming": 2
    }
    constructor(private route: ActivatedRoute,
        private router: Router,
        private appState: ApplicationStateService,
        private workshopService: WorkshopService) {
    }
    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.workshop = JSON.parse(params["workshop"]);
            this.previousWorkshop = +params["type"] === this.workshopType.past;
            this.customerId = this.appState.customer.id;
            this.checkEnableStatus();
            console.log("received workshop:::", this.workshop);
        });
    }
    checkEnableStatus() {
        this.selfCreator = this.customerId === this.workshop.createdBy ? true : false;
        let candidateIds = this.workshop.interestedCandidates && getNames(this.workshop.interestedCandidates) || [];

        let isExists = candidateIds && candidateIds.filter(id => {
            return id === this.appState.customer.id;
        });
        this.alreadyLiked = isExists && isExists.length > 0;
    }

    interested() {
        this.workshopService.appendChild(this.workshop, this.appState.customer.id).then(result => {
            console.log("wORKSHOP UPDATED");
            this.router.navigate(["/workshopList"]);
        });
    }
}