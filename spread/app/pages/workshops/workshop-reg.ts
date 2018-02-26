import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { Customer, Workshop } from './../../entities';
import { WorkshopService, FireBaseService } from './../../services'
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerPage } from "./../../shared/drawer.page";
import { ApplicationStateService } from "../../common";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { ModalComponent } from "./../skill/modal-dailog";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-reg.html",
})
export class WorkshopComponent extends DrawerPage {
    workshop: Workshop = new Workshop();
    dateTime: string = "";

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private workshopService: WorkshopService,
        private router: RouterExtensions,
        private appState: ApplicationStateService,
        private fireBaseService: FireBaseService,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService, ) {
        super(changeDetectorRef);
        this.workshop = {
            id: "",
            title: "Join C#",
            who: "Gayatri",
            date: new Date().getTime(),
            time: '11.00 AM',
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
            interestedCandidates: [""],
            rating: 0
        }

    }
    registerWorkshop() {
        this.workshopService.save(this.workshop).then((result) => {
            console.log("insert result success");
            this.router.navigate(["/workshopList"], { clearHistory: true });

        })
    }
    public showModal() {
        const today = new Date();
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: today.toDateString(),
            fullscreen: false,
        };

        this.modal.showModal(ModalComponent, options).then(res => {
            console.log("return result::", res);
            this.workshop.date = new Date(res.date).getTime();
            this.workshop.time = res.time;
            this.dateTime = `${res.date},${res.time}`;
        });
    }
}