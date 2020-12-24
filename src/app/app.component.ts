import { Component } from '@angular/core';
import { Bookmark } from 'src/Model/bookmark/bookmark';
import { BookmarkService } from 'src/Services/bookmark.service';
import { BrowserService } from 'src/Services/browser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InAppBrowser';

  urlInserted: string = '';
  url: string = '';
  
  constructor(private browser_service: BrowserService,  private bookmarks_Service: BookmarkService ) {
    this.monitorBookmarkClick();
  }

  goPressed() {
    console.log(this.url)
    this.urlInserted = this.url;
    this.browser_service.goButtonPress.emit();
  }

  /**Metodo che permette di monitorare il click di un segnalibro sulla barra dei segnalibri */
  monitorBookmarkClick() {
    this.bookmarks_Service.bookmarkClicked.subscribe((bookmark: Bookmark) => {
      console.log('monitorBookmarkClick()');
      this.url = bookmark.url;
    });
  }
}
