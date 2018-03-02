import { Component, OnInit, NgModule, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "ui/date-picker";
import { TimePicker } from "ui/time-picker";
import { Page } from "ui/page";

@Component({
    moduleId: module.id,
    templateUrl: "./modal-dailog.html",
})
export class ModalComponent implements OnInit {
    @ViewChild("CB1") FirstCheckBox: ElementRef;
    public type: number;
    public categories: Array<string> = [];
    public cities: Array<string> = [];
    constructor(private params: ModalDialogParams, private page: Page) {
        this.type = params.context.type;
        this.page.on("unloaded", () => {
            this.params.closeCallback();
        });
    }

    ngOnInit() {
        this.categories = ["Education", "activity", "art & craft", "cooking/baking", "others"];
        this.cities = ["Mumbai", "Hyderabad", "Machilipatnam"];
    }

    public submitDateTime() {
        let datePicker: DatePicker = <DatePicker>this.page.getViewById<DatePicker>("datePicker");
        let timePicker: TimePicker = <TimePicker>this.page.getViewById<TimePicker>("timePicker");
        let result = {
            date: `${datePicker.date}`,
            time: `${timePicker.hour}:${timePicker.minute}`
        };
        this.params.closeCallback(result);
    }
    public categoryClick(args) {
        this.params.closeCallback(args);
    }
    public cityClick(args) {
        this.params.closeCallback(args);
    }
    public getCheckProp(item) {
        // console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
        console.log('checked item value = ' + item);

        this.params.closeCallback(item);

    }
}