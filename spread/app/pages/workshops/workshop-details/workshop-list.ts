import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from "@angular/core";
import { Customer, Workshop } from './../../../entities';
import { WorkshopService } from './../../../services'
import { toCustomArray, ApplicationStateService, sortObjectsByDate } from './../../../common'
import { DrawerPage } from "./../../../shared/drawer.page";
import { Router, NavigationExtras } from "@angular/router";
import { ListPicker } from "ui/list-picker";
import { ModalComponent } from "./../../modal-dailog/modal-dailog";
import { ModelTypes } from './../../../common/enums'
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { loaderOptions } from "./../../../utils";
import { getNames } from "../../../common/utility";
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var loader = new LoadingIndicator();

@Component({
    moduleId: module.id,
    selector: "ns-login",
    templateUrl: "workshop-list.html",
})
export class WorkshopListComponent extends DrawerPage {
    upcomingWorkshops: Array<Workshop> = [];
    pastWorkshops: Array<Workshop> = [];
    noPastWorkshops: boolean = false;
    noUpcomingWorkshops: boolean = false;
    city: string;
    category: string;
    categories: string[];
    dbWorkshops: any;
    workshopType = {
        "past": 1,
        "upcoming": 2
    }
    constructor(private changeDetectorRef: ChangeDetectorRef,
        private workshopService: WorkshopService,
        private router: Router,
        private vcRef: ViewContainerRef,
        private appState: ApplicationStateService,
        private modal: ModalDialogService) {
        super(changeDetectorRef);
    }
    public ngOnInit() {
        this.city = this.appState.customer.city;
        return this.getWorkshopDetails(this.city);
    }
    getWorkshopDetails(city: string) {
        loaderOptions.message = "Fetching Details...";
        loader.show(loaderOptions);
        this.workshopService.getWorkshopDetails(city).then((result) => {
            this.dbWorkshops = toCustomArray(result);
            this.dbWorkshops.forEach(workshop => {
                workshop.interestedCount =
                    workshop.interestedCandidates && getNames(workshop.interestedCandidates).length || 0;
            });
            this.filterWorkshopsByDate(this.dbWorkshops);
            loader.hide();
        });
    }
    filterWokshopsByCategory(category: string) {
        loaderOptions.message = "Filtering Details...";
        loader.show(loaderOptions);
        let categoryWorkshops: any = this.dbWorkshops.filter(workshop => {
            return workshop.categoryLowercase === category.toLowerCase();
        });
        this.filterWorkshopsByDate(categoryWorkshops);
        loader.hide();
    }
    navigation(workshop, type) {
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "workshop": JSON.stringify(workshop),
                "type": type
            }
        };
        this.router.navigate(["/workshop-detail"], navigationExtras);
    }
    filterWorkshopsByDate(workshops: Array<Workshop>) {
        let yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).getTime();
        let upcomingWorkshops: any = workshops.filter(workshop => {
            return workshop.date > yesterday;
        });
        let pastWorkshops: any = workshops.filter(workshop => {
            return workshop.date <= yesterday;
        });

        this.upcomingWorkshops = upcomingWorkshops.sortElements("date");
        this.pastWorkshops = pastWorkshops.sortElements("date");

        this.noUpcomingWorkshops = this.upcomingWorkshops.length === 0;
        this.noPastWorkshops = this.pastWorkshops.length === 0;
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
            if (modelType === ModelTypes.City) {
                this.city = res || this.city;
                this.getWorkshopDetails(this.city);
            }
            if (modelType === ModelTypes.Category) {
                this.category = res || "Education";
                this.filterWokshopsByCategory(this.category);
            }
        });
    }
}
