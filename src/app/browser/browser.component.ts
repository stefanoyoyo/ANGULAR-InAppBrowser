import { Component, Input, OnChanges, OnInit, Sanitizer, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Bookmark } from 'src/Model/bookmark/bookmark';
import { BookmarkService } from 'src/Services/bookmark.service';
import { BrowserService } from 'src/Services/browser.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit, OnChanges {

  // url: string = '';
  @Input() url: string = '';
  safeUrl: any = '';

  constructor(private browser_service: BrowserService,
        private bookmarks_Service: BookmarkService,
        private sanitize: DomSanitizer
    ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['url']) {
      console.log('browser');
      console.log(this.url);
      this.safeUrl = this.sanitize.bypassSecurityTrustResourceUrl(this.url);
    }
  }

  ngOnInit(): void {
    this.monitorGoButtonClick();
  }

  /**Metodo che permette di lanciare la subscribe all'evento scatenato dal click del bottone click nel padre */
  monitorGoButtonClick() {
    this.browser_service.goButtonPress.subscribe(() => {
      this.safeUrl = this.sanitize.bypassSecurityTrustResourceUrl(this.url);
    });
  }

}
