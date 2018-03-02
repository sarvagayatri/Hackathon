import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'date_dd' })
export class DateDDPipe {
    transform(date: number): any {
        var givenDate = new Date(date);
        var dd: number = givenDate.getDate();
        var dateContext: string = "";
        dateContext = `${dd}`;
        return dateContext;
    }
}
