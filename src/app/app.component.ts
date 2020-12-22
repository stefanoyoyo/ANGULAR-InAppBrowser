import { Component } from '@angular/core';
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
  
  constructor(private browser_service: BrowserService) {}

  goPressed() {
    console.log(this.url)
    this.urlInserted = this.url;
    this.browser_service.goButtonPress.emit();
  }
}
