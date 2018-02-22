import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./pages/auth/login/login";
import { RegisterComponent } from "./pages/auth/signup/register";
import { WorkshopComponent } from "./pages/workshops/workshop-reg";
import { SkillComponent } from "./pages/skill/skill";
// import { SecureComponent } from "./components/secure/secure.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "worshopReg", component: WorkshopComponent },
    
    // { path: "", component: SkillComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }