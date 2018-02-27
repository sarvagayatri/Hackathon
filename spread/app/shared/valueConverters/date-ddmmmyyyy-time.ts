import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'date_ddmmmyyyy_time' })
export class DateDDMMMYYYTimePipe {
    transform(date: number): any {
        if (!date) {
            return "--";
        }
        var givenDate = new Date(date);
        var ampm = givenDate.getHours() >= 12 ? 'AM' : 'PM';
        var time = givenDate.getHours() + ':' + givenDate.getSeconds() + ':' + givenDate.getSeconds();
        var dd: number = givenDate.getDate();
        var mm: number = givenDate.getMonth();
        var yyyy = givenDate.getFullYear();
        var dateWithTime: string = "";
        var monthName: string = "";
        switch (mm) {
            case 0:
                monthName = 'Jan';
                break;
            case 1:
                monthName = 'Feb';
                break;
            case 2:
                monthName = 'Mar';
                break;
            case 3:
                monthName = 'Apr';
                break;
            case 4:
                monthName = 'May';
                break;
            case 5:
                monthName = 'Jun';
                break;
            case 6:
                monthName = 'Jul';
                break;
            case 7:
                monthName = 'Aug';
                break;
            case 8:
                monthName = 'Sept';
                break;
            case 9:
                monthName = 'Oct';
                break;
            case 10:
                monthName = 'Nov';
                break;
            case 11:
                monthName = 'Dec';
                break;

            default:
                monthName = 'mmm';
                break;
        }
        dateWithTime = `${dd}-${monthName}-${yyyy}, ${time} ${ampm}`;
        return dateWithTime;
    }

}
