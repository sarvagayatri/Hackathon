import { Component, OnInit } from "@angular/core";
import { Customer, Workshop } from './../../entities';
import { WorkshopService } from './../../services'
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-reg.html",
})
export class WorkshopComponent {
    workshop: Workshop = new Workshop();

    constructor(private workshopService: WorkshopService,
        private router: RouterExtensions) {
        this.workshop = {
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
            createdDate: new Date().getTime()
        }
    }
    registerWorkshop() {
        this.workshopService.save(this.workshop).then((result) => {
            console.log("insert result success");
            this.router.navigate(["/worshopList"], { clearHistory: true });

        })
    }
}