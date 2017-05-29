import { Component, OnInit,ViewChild } from '@angular/core';

import {SelectModule} from 'ng2-select';
import {ModalDirective} from "ngx-bootstrap";
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ViewTicketComponent} from "app/view-ticket/view-ticket.component";
import {Ticket} from "../create-ticket/create-ticket-interface";

@Component({
  selector: 'app-tickets-category',
  templateUrl: './tickets-category.component.html',
  styleUrls: ['./tickets-category.component.css'],

})
export class TicketsCategoryComponent  {

  TicketArray=[];
  public CategoryList=[];
  public FilterCatagory=[];
  public SelectedValue;
  public devicetype;
  public ViewRecord:any={};
  public status;
  public EditRecord={};
  public EditTicketName;
  public EditTicketCategory;
  public EditTicketDiscription;
  public EditTicketType;
  public EditTicketPriorty;
  public editname;
  public edidiscription;
  public editedticket;
  public editcategory;
  public delete_key;
  public delete_index;
  constructor(private model:NgbModal)
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
  @ViewChild('viewModal') public viewModal:ModalDirective;
  @ViewChild('editModal') public editModal:ModalDirective;
  @ViewChild('deleteModal') public deleteModal:ModalDirective;
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
    console.log(this.TicketArray)
    this.FilterCatagory= [];
    this.TicketArray.forEach((EachRecord)=>{
      if(EachRecord.type===SelectedValue && EachRecord.category===typeofdevice)
      {
        this.FilterCatagory.push(EachRecord);
      }

    })
    console.log(this.FilterCatagory)

  }

  //View Data Method
  public view(index)
  {
    let bool = true;
    this.FilterCatagory.forEach((EachRecord)=>{
      if(bool) {
        if (EachRecord.Ticket_No == index) {
          let Category=EachRecord.category
            this.ViewRecord=
            {
              Discription:EachRecord.Discription,
              Ticket_No:EachRecord.Ticket_No,
              category:Category,
              name:EachRecord.name,
              status:this.status,
              type:EachRecord.type,
            }
            bool=false;
        }
      }
    });
    console.log(this.ViewRecord);
    this.viewModal.show();
    // const modelRef = this.model.open(ViewTicketComponent,{size: 'lg'});
    // modelRef.componentInstance.ViewRecord = this.ViewRecord;
    // modelRef.result.then((formData) => {
    //   console.log("success");
    // }).catch((failed) => {
    //   console.log("failed   ",failed)
    // })
    // console.log(this.ViewRecord.Ticket_No)

  }
  public delete(del_index:any,key){

    this.deleteModal.show()
    this.delete_index=del_index;
    this.delete_key=key;

  }
  public edit(index)
  {
    let bool = true;
    this.FilterCatagory.forEach((EachRecord)=>{
      if(bool) {
        if (EachRecord.Ticket_No == index) {
          this.editedticket=index
          this.editname=EachRecord.name
          this.edidiscription=EachRecord.Discription;
          this.editcategory=EachRecord.category;
          bool=false;
          this.editModal.show()
        }
      }
    });
  }
  public UpdatedRecord(index,category) {
    alert(category)
    let bool = true;
    this.EditRecord={
      Ticket_No:this.editedticket,
      name:this.EditTicketName,
      Category:category,
      Discription:this.EditTicketDiscription,
      type:this.EditTicketType,
      priority:this.EditTicketPriorty,

    }
  for(let i=0;i<this.FilterCatagory.length;i++)
  {
    if(this.FilterCatagory[i].Ticket_No===index)
    {
      this.FilterCatagory[i]=this.EditRecord;
    }
  }
    for(let i=0;i<this.TicketArray.length;i++)
    {
      if(this.TicketArray[i].Ticket_No===index)
      {
        this.TicketArray[i]=this.EditRecord;
        console.log(this.TicketArray)
      }
    }
   console.log(this.FilterCatagory);
    this.EditTicketName="";
    this.EditTicketDiscription="";
    this.EditTicketPriorty="";
    this.EditTicketType="";

  }
  deleteconformation(del_index:any,key)
  {
    this.FilterCatagory.splice(del_index,1);
    for(let i=0;i<this.TicketArray.length;i++)
    {
      if(this.TicketArray[i].Ticket_No==key)
      {
        this.TicketArray.splice(i,1);
        break;
      }
    }
  }
  notconfermation()
  {
    this.deleteModal.hide()
  }
  NoUpdate()
  {
    this.editModal.hide()
  }
  resolve()
  {
    this.viewModal.hide()
  }


}
