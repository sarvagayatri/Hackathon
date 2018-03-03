import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./pages/auth/login/login";
import { RegisterComponent } from "./pages/auth/signup/register";
import { WorkshopComponent } from "./pages/workshops/registration/workshop-reg";
import { WorkshopListComponent } from "./pages/workshops/workshop-details/workshop-list";
import { ProfileComponent } from './pages/auth/profile/profile'

import { UserWorkshopsComponent } from "./pages/workshops/user-workshops/workshops-user";
import { WorkshopDetailComponent } from "./pages/workshops/workshop-details/workshop-detail";
import { WorkshopUpdateComponent } from "./pages/workshops/workshop-update/workshop-update";
import { WorkshopsWillingComponent } from "./pages/workshops/workshop-willing/workshops-willing";


const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "workshopReg", component: WorkshopComponent },
    { path: "workshopList", component: WorkshopListComponent },
    { path: "profile", component: ProfileComponent },
    { path: "workshops-user", component: UserWorkshopsComponent },
    { path: "workshop-detail", component: WorkshopDetailComponent },
    { path: "workshop-update", component: WorkshopUpdateComponent },
    { path: "workshop-willing", component: WorkshopsWillingComponent },

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }