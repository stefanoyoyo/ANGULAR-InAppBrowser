import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  choosenProxy: any;
  // choosenProxyEmitter: EventEmitter<any> = new EventEmitter<any>(); // Non necessario

  constructor() { }
}
