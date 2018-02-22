import { Page } from 'tns-core-modules/ui/page';
import { categories } from 'tns-core-modules/trace/trace';
import { Component, ViewContainerRef } from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { Customer } from './../../entities';
import { CustomerService } from './../../services';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";


@Component({
    moduleId: module.id,
    selector: "ns-modal",
    templateUrl: "modal-dailog.html",
})
export class ModalComponent {
    categories: any;
    public constructor(private page: Page,
        private params: ModalDialogParams) {
        this.categories = params.context && params.context.categories || [];
        // this.type = params.context && params.context.type || 0;
        this.page.on("unloaded", () => {
            // using the unloaded event to close the modal when there is user interaction
            // e.g. user taps outside the modal page
            this.params.closeCallback();
        });
    }
    changeAction(item) {
        this.close(item);
    }
    close(res: string) {
        this.params.closeCallback(res);
    }


}