import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserComponent } from './browser/browser.component';
import { BookmarksBarComponent } from './bookmarks-bar/bookmarks-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    BrowserComponent,
    BookmarksBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
