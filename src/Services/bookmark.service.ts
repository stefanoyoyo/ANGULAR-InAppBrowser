import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Bookmark } from 'src/Model/bookmark/bookmark';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  received_bookmarks: EventEmitter<any> = new EventEmitter<any>();

  bookmarkClicked: EventEmitter<Bookmark> = new EventEmitter<Bookmark>();

  constructor(private http_service: HttpClient) { }

}
