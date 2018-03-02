import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { DropDownModule } from "nativescript-drop-down/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { DrawerComponent } from './drawer/drawer.component';
import { DateDDMMMYYYTimePipe, DateDDMMMYYYPipe, DateDDPipe, DateMMMPipe } from "./valueConverters";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

const SHARED_MODULES = [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule
];

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        NativeScriptRouterModule,
        NativeScriptCommonModule,
        DropDownModule,
        TNSCheckBoxModule
    ],
    declarations: [
        DrawerComponent,
        DateDDMMMYYYTimePipe,
        DateDDMMMYYYPipe,
        DateDDPipe,
        DateMMMPipe
    ],
    exports: [
        NativeScriptUISideDrawerModule,
        NativeScriptRouterModule,
        NativeScriptCommonModule,
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        DropDownModule,
        DrawerComponent,
        DateDDMMMYYYTimePipe,
        DateDDMMMYYYPipe,
        DateDDPipe,
        DateMMMPipe
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }