import { Component, OnInit } from "@angular/core";
import { Customer, Workshop } from './../../entities';
import { WorkshopService } from './../../services'

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-reg.html",
})
export class WorkshopComponent {
    constructor(private workshopService: WorkshopService) {

    }
    workshop: Workshop = new Workshop();

    registerWorkshop() {
        this.workshopService.save(this.workshop).then((result) => {
            console.log("insert result success");
        })
    }
}