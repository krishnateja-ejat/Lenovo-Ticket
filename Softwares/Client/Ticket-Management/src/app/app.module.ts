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
@NgModule( {
  declarations: [
    AppComponent,
    TicketsCategoryComponent,
    CreateTicketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    SelectModule,
    DataTableModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
