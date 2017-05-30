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
  public categoryList=[];
  public filterCatagory=[];
  public selectedValue;
  public devicetype;
  public viewRecord:any={};
  public editStatus;
  public editRecord={};
  public editTicketName;
  public editTicketType;
  public editProirty;
  public editname;
  public editDiscription;
  public editedticket;
  public editcategory;
  public delete_key;
  public delete_index;


  constructor(private model:NgbModal)
  {
   let  tickets=localStorage.getItem("ticket");
    let ticket = JSON.parse(tickets);
    this.TicketArray=ticket;

    this.TicketArray.forEach((EachRecord)=>{
      let flag = 0;
      if(this.categoryList.length === 0){
        this.categoryList.push(EachRecord.category)
        flag =1;
      }else{
        this.categoryList.forEach((EachElement)=>{
          if(EachElement === EachRecord.category){
            flag = 1;
          }
        })
      }
      if(flag === 0){
        this.categoryList.push(EachRecord.category)
      }
    })

  }
  @ViewChild('viewModal') public viewModal:ModalDirective;
  @ViewChild('editModal') public editModal:ModalDirective;
  @ViewChild('deleteModal') public deleteModal:ModalDirective;
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;



  public selected(value:any):void {
    this.selectedValue = value.id;
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
  //Display Data in Table
  public DisplayTable(selectedValue,typeofdevice)
  {
    console.log(this.TicketArray)
    this.filterCatagory= [];
    this.TicketArray.forEach((EachRecord)=>{
      if(EachRecord.type===selectedValue && EachRecord.category===typeofdevice)
      {
        this.filterCatagory.push(EachRecord);
      }

    })
    console.log(this.filterCatagory)

  }

  //View Data Method
  public view(index)
  {
    let bool = true;
    this.filterCatagory.forEach((EachRecord)=>{
      if(bool) {
        if (EachRecord.Ticket_No == index) {
          let Category=EachRecord.category
            this.viewRecord=
            {
              Discription:EachRecord.Discription,
              Ticket_No:EachRecord.Ticket_No,
              category:Category,
              name:EachRecord.name,
              status:EachRecord.Status,
              type:EachRecord.type,
            }
            bool=false;
        }
      }
    });
    console.log(this.viewRecord);
    this.viewModal.show();
    // const modelRef = this.model.open(ViewTicketComponent,{size: 'lg'});
    // modelRef.componentInstance.viewRecord = this.viewRecord;
    // modelRef.result.then((formData) => {
    //   console.log("success");
    // }).catch((failed) => {
    //   console.log("failed   ",failed)
    // })
    // console.log(this.viewRecord.Ticket_No)

  }
  //Delete Data
  public delete=(del_index:any,key)=>{

    this.deleteModal.show()
    this.delete_index=del_index;
    this.delete_key=key;

  }
  //Update Data
  public edit=(index)=>
  {
    let bool = true;
    console.log(this.filterCatagory)
    this.filterCatagory.forEach((EachRecord)=>{
      if(bool) {
        if (EachRecord.Ticket_No == index) {
          this.editTicketType = EachRecord.type
          this.editedticket=index
          this.editname=EachRecord.name
          this.editDiscription=EachRecord.Discription;
          this.editcategory=EachRecord.category;
          this.editProirty=EachRecord.priority;
          this.editStatus=EachRecord.Status;
          bool=false;
          this.editModal.show()
        }
      }
    });
  }
  public UpdatedRecord=(index,category) =>{
    let bool = true;
    this.editRecord={
      Ticket_No:this.editedticket,
      name:this.editname,
      category:this.editcategory,
      Discription:this.editDiscription,
      type:this.editTicketType,
      priority:this.editProirty,
      status:this.editStatus

    }
  for(let i=0;i<this.filterCatagory.length;i++)
  {
    if(this.filterCatagory[i].Ticket_No===index)
    {
      this.filterCatagory[i]=this.editRecord;
    }
  }
    for(let i=0;i<this.TicketArray.length;i++)
    {
      if(this.TicketArray[i].Ticket_No===index)
      {
        this.TicketArray[i]=this.editRecord;
        console.log(this.TicketArray)
      }
    }
    this.editTicketName="";
    this.editProirty="";
    this.editProirty="";
    this.editTicketType="";
    this.editcategory="";
    this.editModal.hide()

  }
  //Conforming to Delete Record
  deleteconformation=(del_index:any,key)=>
  {
    this.filterCatagory.splice(del_index,1);
    for(let i=0;i<this.TicketArray.length;i++)
    {
      if(this.TicketArray[i].Ticket_No==key)
      {
        this.TicketArray.splice(i,1);
        this.deleteModal.hide()
        break;
      }
    }
  }
  notconformation=()=>
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
