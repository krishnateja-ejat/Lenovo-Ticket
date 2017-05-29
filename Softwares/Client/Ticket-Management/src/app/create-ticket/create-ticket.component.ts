import { Component, OnInit } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';
import {Ticket} from '../create-ticket/create-ticket-interface';
import {TicketsCategoryComponent} from "../tickets-category/tickets-category.component";
import {Router, Routes} from "@angular/router";
@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Tickets=[];

  AddTicket({ value }: { value: Ticket }) {
    let count=this.Tickets.length+1;
    value.Ticket_No = count;
    this.Tickets.push(value);
    console.log(this.Tickets)
    localStorage.setItem("ticket", JSON.stringify(this.Tickets));
  }
  send()
  {

    this.router.navigateByUrl('/home');
  }


}
