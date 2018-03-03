import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { CoreModule } from './services/services.module';

import { LoginComponent } from "./pages/auth/login/login";
import { RegisterComponent } from "./pages/auth/signup/register";
import { WorkshopComponent } from "./pages/workshops/registration/workshop-reg";
import { WorkshopListComponent } from "./pages/workshops/workshop-details/workshop-list";
import { SharedModule } from './shared/shared.module';
import { ProfileComponent } from './pages/auth/profile/profile'
import { UserWorkshopsComponent } from "./pages/workshops/user-workshops/workshops-user";
import { WorkshopDetailComponent } from "./pages/workshops/workshop-details/workshop-detail";
import { WorkshopUpdateComponent } from "./pages/workshops/workshop-update/workshop-update";
import { WorkshopsWillingComponent } from "./pages/workshops/workshop-willing/workshops-willing";


import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalComponent } from "./pages/modal-dailog/modal-dailog";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        SharedModule,
        CoreModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        WorkshopComponent,
        ModalComponent,
        WorkshopListComponent,
        ProfileComponent,
        UserWorkshopsComponent,
        WorkshopDetailComponent,
        WorkshopUpdateComponent,
        WorkshopsWillingComponent
    ],
    entryComponents: [ModalComponent],
    providers: [
        ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }