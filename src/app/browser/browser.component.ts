import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnChanges, OnInit, Sanitizer, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import { Bookmark } from 'src/Model/bookmark/bookmark';
import { BookmarkService } from 'src/Services/bookmark.service';
import { BrowserService } from 'src/Services/browser.service';
import { DataFromJsonAssetsService } from 'src/Services/data-from-json-assets.service';
import { ProxyService } from 'src/Services/proxy.service';

@Component({
  selector: 'app-browser',
  templateUrl: './browser.component.html',
  styleUrls: ['./browser.component.scss']
})
export class BrowserComponent implements OnInit, OnChanges, AfterViewInit {

  // url: string = '';
  @Input() url: string = '';
  @ViewChild('iframePage') iframePage_ref : any;
  safeUrl: any = '';
  iframeHtml: string = ''
  iframePageMonitor: any = null;
  availableProxies: any;
  actualUsedProxy: any = this.proxy_service.choosenProxy;
  htmlFromProxy: SafeHtml | undefined;

  constructor(private browser_service: BrowserService,
        private bookmarks_Service: BookmarkService,
        private http_service: HttpClient,
        private sanitize: DomSanitizer,
        private proxy_service: ProxyService,
        private data_from_json_service: DataFromJsonAssetsService
    ) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.getDataFromJsonFile('assets/externalJson/webProxy.json')
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges() browser')
    if(changes['url']) {

      const proxyName: string = this.proxy_service.choosenProxy.name != null ? this.proxy_service.choosenProxy.name : this.proxy_service.choosenProxy; 
      
      this.getHtmlThoughtProxy(proxyName);


      this.getIframeHtml();
    }
  }

  /**Metodo per la richesta dei dati contenuti di un json all'interno degli assets.
   * Da chiamare nel costruttore o nel metodo onInit*/
  getDataFromJsonFile(jsonPath: string) {
    const proxyInfo = this.data_from_json_service.getDataFromJsonFile(jsonPath); 
    this.data_from_json_service.emitJsonData.subscribe((jsonData: any) => {
      this.availableProxies = jsonData;
    });
  }

  /**Metodo che recupera il codice html della pagina attualmente richiesta
  nella barra defli indirizzi mediante il proxy specificato nel parametro */
  private getHtmlThoughtProxy(proxyName: string) {
    switch (proxyName) {
      case 'No Proxy': 
        this.safeUrl = this.sanitize.bypassSecurityTrustResourceUrl(this.url);
        break; 
      case 'Web proxy scrapestack': 
        this.safeUrl = null;
        this.getHtmlThoughtProxyScrapestack(this.url);
        console.log(this.iframePage_ref);
        break; 
      case 'Local Node proxy': 
        const proxyToUse: any = this.getProxyToUseByName('Local Node proxy');
        const message = {  url: this.url };
        const messageAsStr = JSON.stringify(message);
        const promise = this.http_service.post(proxyToUse.url,messageAsStr ).toPromise();
        promise
          .then((message) => {
            let webSiteHtml: any = message;
            console.log(webSiteHtml);
            this.insertHtmlInIframe('iframePage', webSiteHtml);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
    }
  }

  /**Metodo che recupera il codice html della pagina richiesta mediante il proxy "Scrapestack" */
  getHtmlThoughtProxyScrapestack(url: string) {
    const proxyToUse: any = this.getProxyToUseByName('Web proxy scrapestack'); 
    const urlToCall = "http://api.scrapestack.com/scrape?access_key=" + proxyToUse.access_key + '&url=' + this.url;

    // const htmlFromProxy: any = this.sanitize.bypassSecurityTrustHtml('<p>CIAOOOOO MONDOOOOO </p>');
    // this.htmlFromProxy = htmlFromProxy;


    const getValues = this.http_service.get(urlToCall).toPromise();
    getValues
      .then((data: any) => {
        const receivedData: any = JSON.parse(JSON.stringify(data));
        this.htmlFromProxy = this.sanitize.bypassSecurityTrustHtml(receivedData.text); ; 
      })
      .catch((error) => {
        // La get va a buon fine ma per qualche motivo vado in errore.
        // Estraggo comunque il testo html ricevuto
        console.log(error);
        const htmlFromProxy: string = error.error.text; 
        // this.htmlFromProxy = htmlFromProxy;
        this.insertHtmlInIframe('iframePage', htmlFromProxy);
      });
  }

  /**Metodo che permette l'inserimento di codice html all'interno di un iframe specificato */
  private insertHtmlInIframe(iframe: string, html: string) {
    var s: any = document.getElementById(iframe);
    s.contentDocument.write(html);
  }

  /**Metodo che ritorna i dati del proxy da utilizzare dato il suo nome come parametro */
  getProxyToUseByName(proxyName: string): any {
    let proxyToUse: any = null;
    if (this.availableProxies != null) {
      this.availableProxies.content.forEach((element: any) => {
        if (element.name === proxyName) { 
          proxyToUse = element;
        }
      });
    }
    return proxyToUse;
  }

  /**Metodo che consente di ottenere il codice html della pagina al suo interno renderizzata */
  getIframeHtml() {
    this.iframePageMonitor = interval(500).subscribe(() =>  {
      try {
        const iframePage: any = this.getIframeHtmlCode('iframePage');
        if (iframePage != null && iframePage != "") {
          console.log(iframePage);
          this.iframeHtml = iframePage;
          this.iframePageMonitor.unsubscribe();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  /**Metodo che consente di recuperare il codice html della pagina identificata dall'id passata come parametro */
  getIframeHtmlCode(iframeId: string): any {
    try {
      const x: any = document.getElementById(iframeId);
      const y: any = x.contentWindow || x.contentDocument;
      const z: any = y.document != null ? y.document : y;
      return z.body.innerHTML;
    } catch (error) {
      return "";
    }
  }

  private httpGet(theUrl: string) {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
      xmlHttp.send( null );
      return xmlHttp.responseText;
  }



}
