import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { Customer, Workshop } from './../../../entities';
import { WorkshopService, FireBaseService } from './../../../services'
import { Router, ActivatedRoute } from "@angular/router";
import { ApplicationStateService } from "../../../common";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { ModalComponent } from "./../../modal-dailog/modal-dailog";

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
            console.log("received workshop:::", JSON.stringify(this.workshop));
        });
    }

    updateWorkshop() {
        this.workshopService.update(this.workshop).then((result) => {
            console.log("insert result success");
            this.router.navigate(["/workshopList"]);
        })
    }
}