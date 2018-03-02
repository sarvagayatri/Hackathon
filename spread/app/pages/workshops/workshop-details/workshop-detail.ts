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
        console.log("cand::", JSON.stringify(this.workshop.interestedCandidates));
        let candidateIds = getNames(this.workshop.interestedCandidates);
        let isExists = candidateIds.filter(id => {
            return id === this.appState.customer.id;
        });
        this.alreadyLiked = isExists && isExists.length > 0;
    }

    interested() {
        let obj = {};
        obj[`${this.appState.customer.id}`] = true;
        console.log("Obj", JSON.stringify(obj));
        // this.workshop.interestedCandidates.push(obj);
        this.workshopService.update1(this.workshop, this.appState.customer.id).then(result => {
            console.log("wORKSHOP UPDATED");
            this.router.navigate(["/workshopList"]);
        });
    }
}