import { Component, OnInit, ChangeDetectorRef } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-detail.html",
})
export class WorkshopDetailComponent {
    workshops: Array<any>;
    constructor() {
        this.workshops = [{
            id: "",
            title: "Join C#",
            who: "Gayatri",
            dateTime: "Feb 23rd,2018 11.00 AM",
            address: "Plot No C-45, G Block, Videsh Bhavan, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051",
            fee: "200",
            contactNumber: "022 2652 0016",
            preRequisites: "32-bit (x86) or 64-bit (x64) processors, Dual-core, 2.66-GHz or faster processor, USB 2.0 bus dedicated to the Kinect",
            category: "Education",
            categoryLowercase: "",
            city: "Mumbai",
            cityLowercase: "",
            createdBy: 'dkrITPu3B4b48O9CmcdG7YtzzB32',//this.appState.customer.id,
            createdDate: new Date().getTime(),
            interestedCandidates: [],
            rating: 0
        }];
    }
}