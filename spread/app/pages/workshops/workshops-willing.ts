import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DrawerPage } from "./../../shared/drawer.page";

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshops-willing.html",
})
export class WorkshopsWillingComponent  extends DrawerPage {
    constructor(private changeDetectorRef: ChangeDetectorRef){
        super(changeDetectorRef);
    }
}