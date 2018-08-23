import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtfdetailComponent } from './etfdetail.component';

describe('EtfdetailComponent', () => {
  let component: EtfdetailComponent;
  let fixture: ComponentFixture<EtfdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtfdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtfdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
