import { NgModule } from '@angular/core';

// app
import { BaseConfig } from './../common/base-config'
import { FireBaseService, CustomerService } from "./";


@NgModule({
    imports: [

    ],
    providers: [
        BaseConfig,
        CustomerService,
        FireBaseService,
    ],
})
export class CoreModule { }