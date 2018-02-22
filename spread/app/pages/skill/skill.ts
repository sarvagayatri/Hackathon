import { Component, ViewContainerRef } from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { Customer } from './../../entities';
import { CustomerService } from './../../services';
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ModalComponent } from "./modal-dailog";

@Component({
    moduleId: module.id,
    selector: "ns-skill",
    templateUrl: "skill.html",
})
export class SkillComponent {
    categories: any;
    public constructor(private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
    ) {
        this.categories = ["Education", "activity", "art & craft", "cooking/baking",
            "others"]
    }
    public showModal() {
        let options = {
            context: {
                categories: this.categories,
                // type: typeId
            },
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(ModalComponent, options).then(res => {


        });
    }


}