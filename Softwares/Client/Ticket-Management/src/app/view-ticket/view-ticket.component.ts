import { Component, OnInit,Input } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  @Input()
  ViewRecord
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log('=================== ',this.ViewRecord);
  }
  cancelBtn(event)  {
    this.activeModal.close(event);
  }
}
