import { ViewChild, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";

export class DrawerPage implements AfterViewInit {

    @ViewChild(RadSideDrawerComponent) protected drawerComponent: RadSideDrawerComponent;
    protected drawer: SideDrawerType;



    constructor(private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectorRef.detectChanges();
    }

    public openDrawer() {
        // this.drawer.showDrawer();
        this.drawer.toggleDrawerState();
    }

    public closeDrawer() {
        this.drawer.closeDrawer();
    }
    public toggleDrawer() {
        this.drawer.toggleDrawerState();
    }
}