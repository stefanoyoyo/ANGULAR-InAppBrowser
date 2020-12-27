import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Bookmark } from 'src/Model/bookmark/bookmark';
import { BookmarkService } from 'src/Services/bookmark.service';

@Component({
  selector: 'app-bookmarks-bar',
  templateUrl: './bookmarks-bar.component.html',
  styleUrls: ['./bookmarks-bar.component.scss']
})
export class BookmarksBarComponent implements OnInit {

  isBookmarkBarOpen: boolean = true;  
  openCloseImage: string = "/assets/Images/bookmarks/expand_less.svg";
  outerBookmarks: any;

  constructor(private bookmarks_Service: BookmarkService, 
    private http_service: HttpClient) { }

  ngOnInit(): void {
    this.getOuterBookmarks();
    this.monitorBookmarkReceive();
  }

  /**Metodo che apre o chiude la barra dei segnalibri */
  public showHideBookmarks() {
    console.log('showHideBookmarks()')
    this.isBookmarkBarOpen = !this.isBookmarkBarOpen;
    this.openCloseImage = this.isBookmarkBarOpen ? "/assets/Images/bookmarks/expand_less.svg" : "/assets/Images/bookmarks/expand_more.svg";
  }

  /**Ottengo i segnalibri dal file bookmarks.json
  Se non funziona la prima promise, avviene perchè in alcuni casi, il dominio del server
  viene inserito due volte nella url, perchè viene inserito di default. Ritento quindi 
  facendo una promise solo sul path*/
  getOuterBookmarks() {
    const environment = this.getEnvironment(); 
    const path: string = 'assets/externalJson/bookmarks.json';
    let asset = environment + path;
    asset = asset.includes('//') ? asset.replace('//', '/') : asset;
    const promise = this.http_service.get((asset));
    promise.toPromise()
      .then((outerBookmarkd :any) => {
        this.outerBookmarks = outerBookmarkd;
        console.log(outerBookmarkd)
      })
      .catch((error: any) => {
        console.log(error);
        let promise_one = this.http_service.get((path));
        promise_one.toPromise()
          .then((outerBookmarks :any) => {
            this.outerBookmarks = outerBookmarks;
            // console.log(outerBookmarks);
            // this.bookmarks_Service.received_bookmarks.emit();
          })
          .catch((error: any) => {
            console.log(error);});
      });
    }

    
    /**Metodo che ritorna dove l'app è attualmente eseguita */
    getEnvironment(): string {
      console.log('getEnvironment()')
      let env = ''; 
      const url = window.location.href; 
      return url; 
    }


    /**Metodo che consente di gestire il click su un segnalibro */
    bookmarkClicked(bookmarkClicked :any) {
      console.log('bookmarkClicked(event)');
      console.log(bookmarkClicked);
      const bookmark: Bookmark = new Bookmark(bookmarkClicked.id, bookmarkClicked.name, bookmarkClicked.url, bookmarkClicked.bookmarkPath);
      this.bookmarks_Service.bookmarkClicked.emit(bookmark);
    }


    /**Metodo che consente di monitorar ela ricezione dei segnalibri */
    monitorBookmarkReceive() {
      this.bookmarks_Service.received_bookmarks.subscribe((bookmarks: any) => {

      });
    }

}
