import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { Customer } from './../../../entities';
import { CustomerService } from './../../../services'


@Component({
    moduleId: module.id,
    selector: "ns-register",
    templateUrl: "register.html",
})
export class RegisterComponent {

    customer: Customer = new Customer();
    password: string = null;
    public constructor(private location: Location,
        private customerService: CustomerService) {
    }

    public register() {
        if (this.customer.name && this.customer.email && this.customer.mobileNumber && this.password) {
            this.customerService.save(this.customer, this.password).then((result) => {
                ApplicationSettings.setString("account", JSON.stringify(this.customer));
                this.location.back();
            });

        } else {
            (new SnackBar()).simple("All Fields Required!");
        }
    }

    public goBack() {
        this.location.back();
    }
    

}