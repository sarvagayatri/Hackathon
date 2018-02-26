import { Component, OnInit, NgModule } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "ui/date-picker";
import { TimePicker } from "ui/time-picker";
import { Page } from "ui/page";

// >> passing-parameters
@Component({
    moduleId: module.id,
    templateUrl: "./modal-dailog.html",
})
export class ModalComponent implements OnInit {
    public currentdate: Date;

    constructor(private params: ModalDialogParams, private page: Page) {
        this.currentdate = new Date(params.context);

        this.page.on("unloaded", () => {
            // using the unloaded event to close the modal when there is user interaction
            // e.g. user taps outside the modal page
            this.params.closeCallback();
        });
    }

    ngOnInit() {
        let datePicker: DatePicker = <DatePicker>this.page.getViewById<DatePicker>("datePicker");
        datePicker.year = this.currentdate.getFullYear();
        datePicker.month = this.currentdate.getMonth() + 1;
        datePicker.day = this.currentdate.getDate();
        datePicker.minDate = new Date(1975, 0, 29);
        datePicker.maxDate = new Date(2045, 4, 12);
        let timePicker: TimePicker = <TimePicker>this.page.getViewById<TimePicker>("timePicker");
        timePicker.hour = this.currentdate.getHours();
        timePicker.minute = this.currentdate.getMinutes();
    }

    public submit() {
        let datePicker: DatePicker = <DatePicker>this.page.getViewById<DatePicker>("datePicker");
        let timePicker: TimePicker = <TimePicker>this.page.getViewById<TimePicker>("timePicker");
        // let result = `${datePicker.day}/${datePicker.month}/${datePicker.year},${timePicker.hour}:${timePicker.minute}`;
        let result = {
            date: `${datePicker.day}/${datePicker.month}/${datePicker.year}`,
            time: `${timePicker.hour}:${timePicker.minute}`
        };
        this.params.closeCallback(result);
    }
}