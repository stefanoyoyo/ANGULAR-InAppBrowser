import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { pageElements } from 'src/Model/page-elements/pageElementsManage';

@Component({
  selector: 'app-manage-page-info',
  templateUrl: './manage-page-info.component.html',
  styleUrls: ['./manage-page-info.component.scss']
})
export class ManagePageInfoComponent implements OnInit, OnChanges {

  @Input() iframeInput: string = '';
  @Input() url: string = '';
  pageElementsManage: any[] = new Array<any>();

  constructor(private http_service: HttpClient) { 
    this.getPageElements()
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['iframeInput']) {
      console.log('manage-page-info')
    }

    this.runPageMonitoring();
  }

  /**Metodo che esegue il monitoraggio della pagina secondo i parametri specificati */
  runPageMonitoring() {
    interval(100).subscribe(() => {
      if (this.pageElementsManage != null) {
        this.pageElementsManage.forEach(element => {

          if (element.cssClass != null && element.cssToApply != null && element.nodeProperty === null) {
            this.applyCssRule(element);
          } else if (element.cssClass == null && element.cssToApply == null && element.nodeProperty != null && element.nodeValue == null) {
            this.applyJavascriptGetValueRule(element);
          } else if (element.cssClass == null && element.cssToApply == null && element.nodeProperty != null && element.nodeValue != null) {
            this.applyJavascriptSetValueRule(element);
          } 
        });
      }
    });
  }

  /**Metodo che permette di settare il valore specificato dalla property dell'oggetto ricavato dalla dom */
  applyJavascriptSetValueRule(element: any) {
    let el:any = document.querySelectorAll(element.elementOnDom);
    const nodeProperty: string = element.nodeProperty;
    let ele = el[0];
    let valore = null;
    if (element.url === this.url || this.url === '') {
      ele[nodeProperty] = element.nodeValue;
    }
    return valore;
  }

  /**Metodo che permette di recuperare il valore specificato dalla property dell'oggetto ricavato dalla dom */
  applyJavascriptGetValueRule(element: any): string {
    let el:any = document.querySelectorAll(element.elementOnDom);
    const nodeProperty: string = element.nodeProperty;
    let ele = el[0];
    let valore = null;
    if (element.url === this.url || this.url === '') {
      valore = ele[nodeProperty];
    }
    return valore;
  }

  /**Metodo che consente di applicare le regole di stile definite nel json */
  applyCssRule(element: any) {
    let el:any = document.querySelectorAll(element.elementOnDom);
    const cssClass: string = element.cssClass;
    let ele = el[0];
    if (element.url === this.url || this.url === '') {
      ele.style[cssClass] = element.cssToApply;
    }
  }

  ngOnInit(): void {
    console.log("manage-page-info")
  }

  /**Metodo che consente di ottenere gli elementi sulla dom da monitorare 
  direttamente dal pageElementsManage.json in cui sono presenti  */
  private getPageElements() {
    console.log('getPageElements()')
    const environment = this.getEnvironment(); 
    const path: string = 'assets/externalJson/pageElementsManage.json';
    let asset = environment + path;
    asset = asset.includes('//') ? asset.replace('//', '/') : asset;
    const promise = this.http_service.get((asset));
    promise.toPromise()
      .then((pageElements :any) => {
        this.pageElementsManage = pageElements;
        this.runPageMonitoring();
      })
      .catch((error: any) => {
        console.log(error);
        let promise_one = this.http_service.get((path));
        promise_one.toPromise()
          .then((pageElements :any) => {
            this.pageElementsManage = pageElements; 
            this.runPageMonitoring();         
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
