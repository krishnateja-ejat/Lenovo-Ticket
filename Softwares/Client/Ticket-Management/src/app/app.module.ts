import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AppComponent } from './app.component';
import { TicketsCategoryComponent } from './tickets-category/tickets-category.component';
import {SelectModule} from 'ng2-select';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import {DataTableModule} from "angular2-datatable";
import {routes} from './router';
import { ModalModule } from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { WizardModule } from 'ng2-archwizard';
@NgModule( {
  declarations: [
    AppComponent,
    TicketsCategoryComponent,
    CreateTicketComponent,
    ViewTicketComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    SelectModule,
    DataTableModule,
    routes,
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    NgbModule,
    WizardModule
  ],
  entryComponents : [ViewTicketComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
