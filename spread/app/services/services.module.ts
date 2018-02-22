import { NgModule } from '@angular/core';

// app
import { BaseConfig } from './../common/base-config'
import { FireBaseService, CustomerService, UserService } from "./";
import { ApplicationStateService } from "./../common";


@NgModule({
    imports: [

    ],
    providers: [
        ApplicationStateService,
        BaseConfig,
        CustomerService,
        FireBaseService,
        UserService
    ],
})
export class CoreModule { }