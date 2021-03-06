import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { SnackBar } from "nativescript-snackbar";
import * as ApplicationSettings from "application-settings";
import { Customer } from './../../../entities';
import { CustomerService } from './../../../services'
import { CacheManager } from "../../../common/cache-manager";
import { isValidEmail, isValidMobileNumber, isValidCity } from "../../../common/validations";
import { Page } from "ui/page";

@Component({
    moduleId: module.id,
    selector: "ns-register",
    templateUrl: "register.html",
})
export class RegisterComponent {

    customer: Customer = new Customer();
    password: string = null;
    public constructor(private location: Location,
        private customerService: CustomerService,
        private page: Page) {
        this.customer.name = "John";
        this.customer.email = "john@pp.com";
        this.customer.mobileNumber = "9876543211";
        this.customer.city = "hyderabad";
        this.password = "test@123";
    }
    public ngOnInit() {
        // this.page.actionBarHidden = true;
    }
    public register() {
        if (this.validateSignUpDetails()) {
            this.customerService.save(this.customer, this.password).then((result) => {
                CacheManager.set("account", JSON.stringify(this.customer));
                this.location.back();
            }).catch(error => {
                console.log("catch block::", error);
                (new SnackBar()).simple("User Already Exists!");
            });
        } else {
            (new SnackBar()).simple("All Fields Required!");
        }
    }

    public goBack() {
        this.location.back();
    }
    validateSignUpDetails() {
        let isValid = true,
            message = "";
        if (!this.customer.name || !this.password
            || !this.customer.email || !this.customer.mobileNumber
        ) {
            isValid = false;
            message = "Please fill the fields ";
        }
        else {
            if (!isValidEmail(this.customer.email)) {
                isValid = false;
                message = "Valid email required \r\n";
            }
            if (!isValidMobileNumber(this.customer.mobileNumber)) {
                isValid = false;
                message += "Valid Mobile Number required \r\n";
            }
            if (this.password.length < 6) {
                isValid = false;
                message += "Password is min 6 letters \r\n";
            }
            if (!isValidCity(this.customer.city)) {
                isValid = false;
                message += "Valid city required \r\n";
            }
        }
        if (!isValid) {
            (new SnackBar()).simple(message);
        }
        return isValid;
    }


}