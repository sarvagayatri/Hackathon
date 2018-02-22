import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./pages/auth/login/login";
import { RegisterComponent } from "./pages/auth/signup/register";
import { SkillComponent } from "./pages/skill/skill";
// import { SecureComponent } from "./components/secure/secure.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "", component: SkillComponent },

    // { path: "secure", component: SecureComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }