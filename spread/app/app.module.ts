import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { CoreModule } from './services/services.module';

import { LoginComponent } from "./pages/auth/login/login";
import { RegisterComponent } from "./pages/auth/signup/register";
import { WorkshopComponent } from "./pages/workshops/workshop-reg";

import { CustomerService, FireBaseService } from './services';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        CoreModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        WorkshopComponent    
    ],
    providers: [ ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }