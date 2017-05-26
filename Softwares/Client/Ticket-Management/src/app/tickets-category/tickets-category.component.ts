import { Component, OnInit } from '@angular/core';

import {SelectModule} from 'ng2-select';
@Component({
  selector: 'app-tickets-category',
  templateUrl: './tickets-category.component.html',
  styleUrls: ['./tickets-category.component.css'],

})
export class TicketsCategoryComponent  {
  protected searchStr: string
  TicketArray=[];
  public Catagoryarray:Array<any> = [];
  public CategoryList=[];
  public FilterCatagory=[];
  public SelectedValue
  public devicetype
  constructor()
  {
   let  tickets=localStorage.getItem("ticket");
    let ticket = JSON.parse(tickets);
    this.TicketArray=ticket;
    console.log('from constructor tickerts');
    console.log(this.TicketArray);
    this.TicketArray.forEach((EachRecord)=>{
      let flag = 0;
      if(this.CategoryList.length === 0){
        this.CategoryList.push(EachRecord.category)
        flag =1;
      }else{
        this.CategoryList.forEach((EachElement)=>{
          if(EachElement === EachRecord.category){
            flag = 1;
          }
        })
      }
      if(flag === 0){
        this.CategoryList.push(EachRecord.category)
      }
    })

  }

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV():string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    this.SelectedValue = value.id;


  }



  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }
  public DisplayTable(SelectedValue,typeofdevice)
  {
    this.FilterCatagory= [];
    this.TicketArray.forEach((EachRecord)=>{
      if(EachRecord.type===SelectedValue && EachRecord.category===typeofdevice)
      {

        this.FilterCatagory.push(EachRecord);
      }

    })
    console.log(this.FilterCatagory)

  }

}
