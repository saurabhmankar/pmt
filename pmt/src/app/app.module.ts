import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from 'primeng/dragdrop';
import {ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DialogModule,
    ReactiveFormsModule,
    DragDropModule,
    ToastModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
