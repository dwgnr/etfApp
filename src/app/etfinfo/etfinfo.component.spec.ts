import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtfinfoComponent } from './etfinfo.component';

describe('EtfinfoComponent', () => {
  let component: EtfinfoComponent;
  let fixture: ComponentFixture<EtfinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtfinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtfinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
