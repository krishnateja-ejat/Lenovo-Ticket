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

  ticketArray=[];
  public categoryList=[];
  public filterCatagory=[];
  public selectedValue;
  public deviceType;
  public viewRecord:any={};
  public editStatus;
  public editRecord={};
  public editTicketName;
  public editTicketType;
  public editProirty;
  public editName;
  public editDiscription;
  public editedTicket;
  public editCategory;
  public deleteKey;
  public deleteIndex;


  constructor(private model:NgbModal)
  {
   let  tickets=localStorage.getItem("ticket");
    let ticket = JSON.parse(tickets);
    this.ticketArray=ticket;

    this.ticketArray.forEach((EachRecord)=>{
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
    console.log(this.ticketArray)
    this.filterCatagory= [];
    this.ticketArray.forEach((EachRecord)=>{
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
    this.deleteIndex=del_index;
    this.deleteKey=key;

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
          this.editedTicket=index
          this.editName=EachRecord.name
          this.editDiscription=EachRecord.Discription;
          this.editCategory=EachRecord.category;
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
      Ticket_No:this.editedTicket,
      name:this.editName,
      category:this.editCategory,
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
    for(let i=0;i<this.ticketArray.length;i++)
    {
      if(this.ticketArray[i].Ticket_No===index)
      {
        this.ticketArray[i]=this.editRecord;
        console.log(this.ticketArray)
      }
    }
    this.editTicketName="";
    this.editProirty="";
    this.editProirty="";
    this.editTicketType="";
    this.editCategory="";
    this.editModal.hide()

  }
  //Conforming to Delete Record
  deleteconformation=(del_index:any,key)=>
  {
    this.filterCatagory.splice(del_index,1);
    for(let i=0;i<this.ticketArray.length;i++)
    {
      if(this.ticketArray[i].Ticket_No==key)
      {
        this.ticketArray.splice(i,1);
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
