import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  
  goButtonPress: EventEmitter<any> = new EventEmitter<any>(); 

  constructor() { }


}
