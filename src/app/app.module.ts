import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserComponent } from './browser/browser.component';
import { BookmarksBarComponent } from './bookmarks-bar/bookmarks-bar.component';

import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    BookmarksBarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule, FormsModule
  ],
  providers: [HttpClientModule, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
