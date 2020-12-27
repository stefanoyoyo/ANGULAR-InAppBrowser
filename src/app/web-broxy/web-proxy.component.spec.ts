import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebProxyComponent } from './web-proxy.component';

describe('WebProxyComponent', () => {
  let component: WebProxyComponent;
  let fixture: ComponentFixture<WebProxyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebProxyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
