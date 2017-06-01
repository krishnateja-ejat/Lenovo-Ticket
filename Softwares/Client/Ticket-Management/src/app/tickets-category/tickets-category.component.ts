import { Component, OnInit,ViewChild } from '@angular/core';

import {ModalDirective} from "ngx-bootstrap";
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {Router, Routes} from "@angular/router";

@Component({
  selector: 'app-tickets-category',
  templateUrl: './tickets-category.component.html',
  styleUrls: ['./tickets-category.component.css'],

})
export class TicketsCategoryComponent  {

  public ticketArray;
  public categoryList=[];
  public filterCatagory=[];
  public selectedValue;
  public deviceType;
  public viewRecord:any={};
  public AllRecords=[];
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
  public process
  public strt=true;
  public resol;
  public checkStatusTicket;
  public btn_1Id=0;
  public btn_2Id=0;
  public btn_3Id=0;
  public viewRecordArray=[]

  constructor(private model:NgbModal,private router: Router)
  {

    let categories=localStorage.getItem("categories");
    this.categoryList=JSON.parse(categories);
    let  tickets=localStorage.getItem("ticket");
    this.ticketArray=JSON.parse(tickets);
    localStorage.setItem("tempTickets",JSON.stringify(this.ticketArray));

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
    let bool=0
    console.log(this.ticketArray)
    this.filterCatagory= [];
    this.AllRecords= [];
    this.ticketArray.forEach((EachRecord)=>{
      if(EachRecord.type===selectedValue && EachRecord.category===typeofdevice)
      {
        this.filterCatagory.push(EachRecord);
      }
    })

    //console.log(this.filterCatagory)
    console.log(this.AllRecords)
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
          this.checkStatusTicket=index;
            bool=false;
        }
      }
    });
    this.btn_1Id=this.btn_1Id+1
    this.btn_2Id=this.btn_2Id+1
    this.btn_3Id=this.btn_3Id+1
    console.log(this.viewRecord);
    this.viewModal.show();
     /*const modelRef = this.model.open(ViewTicketComponent,{size: 'lg'});
     modelRef.componentInstance.viewRecord = this.viewRecord;
     modelRef.result.then((formData) => {
       console.log("success");
     }).catch((failed) => {
      console.log("failed   ",failed)
     })
     console.log(this.viewRecord.Ticket_No)*/

  }
  //Delete Data
  public delete=(del_index:any,key)=>{

    this.deleteModal.show()
    this.deleteIndex=del_index;
    this.deleteKey=key;

  }
  //Update Data
  public edit=(index,status)=>
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
          this.viewRecord.status=EachRecord.Status;
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
      Status:this.viewRecord.status

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

      }
    }

    this.editTicketName="";
    this.editProirty="";
    this.editProirty="";
    this.editTicketType="";
    this.editCategory="";
    this.editModal.hide()
    console.log(this.ticketArray)
    this.start(this.viewRecord.status,index)
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

  CreateTicket()
  {
    this.router.navigateByUrl('/createticket');
  }
  start(status,Ticket)
  {

    if(status=="Open")
    {
      this.viewRecord.status="Start"
      let bool = true;
      this.strt=false;
      this.process=true
      this.resol=false;
      this.filterCatagory.forEach((EachRecord)=>{
        if(bool) {
          if (EachRecord.Ticket_No== Ticket) {
            EachRecord.Status=this.viewRecord.status;
            bool=false;
          }
        }
      })
      this.ticketArray.forEach((EachRecord)=>{
        if(bool) {
          if (EachRecord.Ticket_No== Ticket) {
            EachRecord.Status=this.viewRecord.status;
            bool=false;
          }
        }
      })

    }
  }
  proces(Ticket)
  {
    this.viewRecord.status="Resolve"
    let bool = true;
    this.strt=false
    this.resol=true;
    this.process=false
    this.filterCatagory.forEach((EachRecord)=>{
      if(bool) {
        if (EachRecord.Ticket_No== Ticket) {
          EachRecord.Status=this.viewRecord.status;
          bool=false;
        }
      }
    })
    this.ticketArray.forEach((EachRecord)=>{
      if(bool) {
        if (EachRecord.Ticket_No== Ticket) {
          EachRecord.Status=this.viewRecord.status;
          bool=false;
        }
      }
    })



  }
  resolv(Ticket)
  {
    this.viewRecord.status="Close"
    let bool = true;
    this.filterCatagory.forEach((EachRecord)=>{
      if(bool) {
        if (EachRecord.Ticket_No== Ticket) {
          EachRecord.Status=this.viewRecord.status;
          bool=false;
        }
      }
    })
    this.filterCatagory.forEach((EachRecord)=>{
      if(bool) {
        if (EachRecord.Ticket_No== Ticket) {
          EachRecord.Status=this.viewRecord.status;
          bool=false;
        }
      }
    })
    this.viewModal.hide()
  }


}
