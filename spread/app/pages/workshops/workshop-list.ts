import { Component, OnInit } from "@angular/core";
import { Customer, Workshop } from './../../entities';
import { WorkshopService } from './../../services'
import { toCustomArray } from './../../common'
@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-list.html",
})
export class WorkshopListComponent {
    workshops: Array<Workshop> = [];

    constructor(private workshopService: WorkshopService) {
    }
    public ngOnInit() {
        return this.getWorkshopDetails("mumbai", "education");
    }

    getWorkshopDetails(city: string, category: string) {
        this.workshopService.getWorkshopDetails(city, category).then((result) => {
            // console.log("result::", JSON.stringify(result));
            this.workshops = toCustomArray(result);
            // console.log("workshops::", JSON.stringify(this.workshops));
            
        })
    }
}
