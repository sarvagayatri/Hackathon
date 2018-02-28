import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { Customer, Workshop } from './../../../entities';
import { WorkshopService, FireBaseService } from './../../../services'
import { Router, ActivatedRoute } from "@angular/router";
import { ApplicationStateService } from "../../../common";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { ModalComponent } from "./../../skill/modal-dailog";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-update.html",
})
export class WorkshopUpdateComponent {
    workshop: Workshop = new Workshop();
    dateTime: string = "";

    constructor(private workshopService: WorkshopService,
        private router: Router,
        private appState: ApplicationStateService,
        private fireBaseService: FireBaseService,
        private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private route: ActivatedRoute) {

    }
    ngOnInit(): void {
        this.route.queryParams.subscribe((params: any) => {
            this.workshop = JSON.parse(params["workshop"]);
            console.log("received workshop:::", this.workshop);
        });
    }

    updateWorkshop() {
        this.workshopService.update(this.workshop).then((result) => {
            console.log("insert result success");
            this.router.navigate(["/workshopList"]);

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
            console.log("return result::", JSON.stringify(res));
            let resultDate: Date = new Date(res.date);
            this.workshop.date = resultDate.getTime();
            this.workshop.time = res.time;
            this.dateTime = `${resultDate.getDay()}/${resultDate.getMonth() + 1}/${resultDate.getFullYear()},${res.time}`;
            console.log("date:::", this.workshop.date);
        });
    }
}