import { Component, OnInit } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';
import {Ticket} from '../create-ticket/create-ticket-interface';
import {TicketsCategoryComponent} from "../tickets-category/tickets-category.component";
import {Router, Routes} from "@angular/router";
import {forEach} from "@angular/router/src/utils/collection";
import {validate} from "codelyzer/walkerFactory/walkerFn";
import {tick} from "@angular/core/testing";
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  public tempTickets:any
  static count=0;
  public value={"name":"krishna","age":23};
  constructor(private router: Router)
  {

  }

  ngOnInit()
  {
    let categories=["Spare Parts","Manufacture Defect","Parts Replacement","Battery Leakage","Charger Defect","Warrenty Extension"];
    localStorage.setItem("categories",JSON.stringify(categories));
     if ( localStorage.getItem("tempTickets")!=null)
    {
      let tickets=localStorage.getItem("tempTickets")
      this.tempTickets=JSON.parse(tickets);
      console.log(this.tempTickets);
    }

  }

  Tickets=[];
  makeid()
  {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 3; i++ ){
      text += possible.charAt(Math.floor(Math.random() * possible.length));}
    let num = Math.floor(Math.random() * 6) + 1
    return text+num;
  }
  AddTicket=({ value }: { value: Ticket })=> {
    value.Status="Open"

    value.Ticket_No = 'AP'+this.makeid();

    //this.Tickets.push(this.tempTickets[0]);

    if ( localStorage.getItem("tempTickets")!=null) {
      this.tempTickets.forEach((EachRecord)=>{
        this.Tickets.push(EachRecord)
        })

    }
    this.Tickets.push(value);
    console.log(this.Tickets)
    localStorage.setItem("ticket", JSON.stringify(this.Tickets));
    this.router.navigateByUrl('/home');
  }
  send()
  {
    localStorage.clear();
    this.router.navigateByUrl('/createticket');
  }

}
