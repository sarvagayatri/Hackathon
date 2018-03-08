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
    public categories: Array<any> = [];
    public cities: Array<string> = [];
    constructor(private params: ModalDialogParams, private page: Page) {
        this.type = params.context.type;
        this.page.on("unloaded", () => {
            this.params.closeCallback(null);
        });
    }

    ngOnInit() {
        this.cities = ["Mumbai", "Pune", "Hyderabad", "Visakhaptnam"];
        this.categories = [{
            'name': "Education",
            "icon": String.fromCharCode(parseInt('f19d', 16))
        },
        {
            'name': "Art & Craft",
            "icon": String.fromCharCode(parseInt('f0c4', 16))
        },
        {
            'name': "Cooking/Baking",
            "icon": String.fromCharCode(parseInt('f1fd', 16))
        },
        {
            'name': "Activity",
            "icon": String.fromCharCode(parseInt('f434', 16))
        },
        {
            'name': "Others",
            "icon": String.fromCharCode(parseInt('f129', 16))
        },
        ]

        let datePicker: DatePicker = <DatePicker>this.page.getViewById<DatePicker>("datePicker");
        if (datePicker) {
            console.log("came inside ng date");
            let today = new Date();
            datePicker.year = today.getFullYear();
            datePicker.month = today.getMonth() + 1;
            datePicker.day = today.getDate();
            datePicker.minDate = new Date();
            datePicker.maxDate = new Date(2045, 4, 12);
        }
    }
    close(res: string) {
        this.params.closeCallback(res);
    }
    public submitDateTime() {
        let datePicker: DatePicker = <DatePicker>this.page.getViewById<DatePicker>("datePicker");
        let timePicker: TimePicker = <TimePicker>this.page.getViewById<TimePicker>("timePicker");
        let result = {
            date: `${datePicker.date}`,
            time: this.format_time(timePicker.hour, timePicker.minute)
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
    format_time(hour, minute) {
        // formats a javascript Date object into a 12h AM/PM time string
        var amPM = (hour > 11) ? "PM" : "AM";
        if (hour > 12) {
            hour -= 12;
        } else if (hour == 0) {
            hour = "12";
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        return hour + ":" + minute + amPM || '';
    }
}