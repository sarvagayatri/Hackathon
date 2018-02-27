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
import { DateDDMMMYYYTimePipe, DateDDMMMYYYPipe } from "./valueConverters";
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
        DropDownModule
    ],
    declarations: [
        DrawerComponent,
        DateDDMMMYYYTimePipe,
        DateDDMMMYYYPipe
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
        DateDDMMMYYYPipe
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }