import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataFromJsonAssetsService {
  jsonData: any;
  emitJsonData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http_service: HttpClient) { }

  /**Ottengo i segnalibri dal file bookmarks.json
  Se non funziona la prima promise, avviene perchè in alcuni casi, il dominio del server
  viene inserito due volte nella url, perchè viene inserito di default. Ritento quindi 
  facendo una promise solo sul path*/
  getDataFromJsonFile(jsonPath: string) {
    const environment = this.getEnvironment(); 
    const path: string = jsonPath;
    let asset = environment + path;
    asset = asset.includes('//') ? asset.replace('//', '/') : asset;
    const promise = this.http_service.get((asset));
    promise.toPromise()
      .then((jsonData :any) => {
        this.jsonData = jsonData;
        console.log(jsonData);
        this.emitJsonData.emit({
          sender: 'DataFromJsonAssetsService',
          content: jsonData
        });
      })
      .catch((error: any) => {
        console.log(error);
        let promise_one = this.http_service.get((path));
        promise_one.toPromise()
          .then((jsonData :any) => {
            this.jsonData = jsonData;
            this.emitJsonData.emit({
              sender: 'DataFromJsonAssetsService',
              content: jsonData
            });
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
}
