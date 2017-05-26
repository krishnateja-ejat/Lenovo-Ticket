import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'data'
})
export class FilterPipe implements PipeTransform {

  transform(TicketArray: any, category?: any): any {

    if(category==="") return TicketArray;
    return TicketArray.filter(function (data) {

      return data.name.toLowerCase().includes(category.toLowerCase())

    })
  }

}
