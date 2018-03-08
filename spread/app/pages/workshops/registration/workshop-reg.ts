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
        this.workshop = {
            id: null,
            title: "Yoga Sutra",
            who: "Sangeeta",
            date: new Date().getTime(),
            time: '10.00 AM',
            address: "C-4, Chinoy Mansion, Warden Road, Cumballa Hill, Mumbai, 400077.",
            fee: "400",
            contactNumber: "91-22-3210 7067",
            preRequisites: "This scheme has been initiated keeping in mind the hectic lifestyle of Mumbaikars.",
            category: "",
            categoryLowercase: "",
            city: "Mumbai",
            cityLowercase: "",
            createdBy: this.appState.customer.id,
            createdDate: new Date().getTime(),
            interestedCandidates: null,
            city_category: "",
            rating: 0,
            interestedCount: 0
        }
    }
    registerWorkshop() {
        let today = new Date().getTime();
        // if (!this.workshop.city && !this.workshop.category && !this.workshop.title) {
            this.workshopService.save(this.workshop).then((result) => {
                console.log("insert result success");
                this.router.navigate(["/workshopList"]);
            });
        // }
        // else {
        //     (new SnackBar()).simple("Please Provide Valid Info!");
        // }
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