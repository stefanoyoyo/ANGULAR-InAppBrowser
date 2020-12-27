import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProxyService } from 'src/Services/proxy.service';

@Component({
  selector: 'app-web-proxy',
  templateUrl: './web-proxy.component.html',
  styleUrls: ['./web-proxy.component.scss']
})
export class WebProxyComponent implements OnInit, OnChanges {
  @Input() choosenWebProxy: string = '';
  @Input() availableProxies: string[] = new Array<string>();
  webProxies: any[] = new Array<any>();
  choosenProxy: string = '';
  constructor(private http_service: HttpClient, 
              private proxy_service: ProxyService) { }


  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit(): void {
    this.getWebProxies();
  }

  /**Metodo che inserisce 'nessun web proxy' all'array */
  initWebProxies() {
    if (this.webProxies != null) {
      this.webProxies.push(    {
        name: "No proxy",
        url: null,
        access_key: null,
        mail : null
    });
    }
  }

  /**Ottengo i segnalibri dal file bookmarks.json
  Se non funziona la prima promise, avviene perchè in alcuni casi, il dominio del server
  viene inserito due volte nella url, perchè viene inserito di default. Ritento quindi 
  facendo una promise solo sul path*/
  getWebProxies() {
    const environment = this.getEnvironment(); 
    const path: string = 'assets/externalJson/webProxy.json';
    let asset = environment + path;
    asset = asset.includes('//') ? asset.replace('//', '/') : asset;
    const promise = this.http_service.get((asset));
    promise.toPromise()
      .then((webProxies :any) => {
        this.webProxies = webProxies;
        console.log(webProxies)
      })
      .catch((error: any) => {
        console.log(error);
        let promise_one = this.http_service.get((path));
        promise_one.toPromise()
          .then((webProxies :any) => {
            this.initWebProxies()
            this.webProxies = webProxies;
            this.proxy_service.choosenProxy = webProxies[0];
            this.choosenProxy = webProxies[0].name;
          })
          .catch((error: any) => {
            console.log(error);});
      });
    }

    /**Metodoc he permette di comunicare ad app-component il proxy selezionato */
    manageChoosenProxy(event: string) {
      console.log('manageChoosenProxy()');
      this.proxy_service.choosenProxy = this.choosenProxy = event; 
    }


    
    /**Metodo che ritorna dove l'app è attualmente eseguita */
    getEnvironment(): string {
      console.log('getEnvironment()')
      let env = ''; 
      const url = window.location.href; 
      return url; 
    }

}
