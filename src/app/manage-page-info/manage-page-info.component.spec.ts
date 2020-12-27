import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePageInfoComponent } from './manage-page-info.component';

describe('ManagePageInfoComponent', () => {
  let component: ManagePageInfoComponent;
  let fixture: ComponentFixture<ManagePageInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePageInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
