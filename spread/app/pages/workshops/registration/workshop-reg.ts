import { SnackBar } from 'nativescript-snackbar';
import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { Customer, Workshop } from './../../../entities';
import { WorkshopService, FireBaseService } from './../../../services'
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerPage } from "./../../../shared/drawer.page";
import { ApplicationStateService } from "../../../common";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { ModalComponent } from "./../../modal-dailog/modal-dailog";
import { ModelTypes } from './../../../common/enums'

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-reg.html",
})
export class WorkshopComponent extends DrawerPage {
    workshop: Workshop = new Workshop();

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private workshopService: WorkshopService,
        private router: RouterExtensions,
        private appState: ApplicationStateService,
        private fireBaseService: FireBaseService,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService) {
        super(changeDetectorRef);
        // this.workshop = {
        //     id: null,
        //     title: "Join C#",
        //     who: "Gayatri",
        //     date: new Date().getTime(),
        //     time: '11.00 AM',
        //     address: "Plot No C-45, G Block, Videsh Bhavan, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051",
        //     fee: "200",
        //     contactNumber: "022 2652 0016",
        //     preRequisites: "32-bit (x86) or 64-bit (x64) processors, Dual-core, 2.66-GHz or faster processor, USB 2.0 bus dedicated to the Kinect",
        //     category: "Education",
        //     categoryLowercase: "",
        //     city: "Mumbai",
        //     cityLowercase: "",
        //     createdBy: this.appState.customer.id,
        //     createdDate: new Date().getTime(),
        //     interestedCandidates: null,
        //     city_category: "",
        //     rating: 0,
        //     interestedCount: 0
        // }
    }
    registerWorkshop() {
        if(!this.workshop.city && !this.workshop.category && !this.workshop.title){
            this.workshopService.save(this.workshop).then((result) => {
                console.log("insert result success");
                this.router.navigate(["/workshopList"]);
            });
        }
        else{
            (new SnackBar()).simple("All Fields Required!");
        }
    }
    public showModal(modelType: number) {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: {
                type: modelType
            },
            fullscreen: false,
        };
        this.modal.showModal(ModalComponent, options).then(res => {

            switch (modelType) {
                case ModelTypes.DateTime:
                    let resultDate: Date = res && res.date && new Date(res.date);
                    this.workshop.date = resultDate && resultDate.getTime();
                    this.workshop.time = res && res.time;
                    break;

                case ModelTypes.Category:
                    this.workshop.category = res;
                    break;
                case ModelTypes.City:
                    this.workshop.city = res;
                    break;
            }
        });
    }
}