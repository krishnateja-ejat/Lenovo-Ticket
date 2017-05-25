import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets-category',
  templateUrl: './tickets-category.component.html',
  styleUrls: ['./tickets-category.component.css']
})
export class TicketsCategoryComponent  {

  public parts:Array<string> = ['Spare Parts','Manufacture Defect','Parts Replacement'];

  private value:any = ['Spare Parts'];
  public PartArray=[];
  public selected(value:any):void {

    if(value==="Spare Parts")
    {

    let  CategoryObject=
      {
        "S.No":1,
        "TicketName":"Manufacture defect",
        "Status":"open",
        "Priority":"High",

      };
      this.PartArray.push(CategoryObject)
    }
    else if(value=="Manufacture Defect")
    {
      let  CategoryObject=
        {
          "S.No":2,
          "TicketName":"Spare Parts",
          "Status":"closed",
          "Priority":"low",

        };
      this.PartArray.push(CategoryObject)
    }
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

}
