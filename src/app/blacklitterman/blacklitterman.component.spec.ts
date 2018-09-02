import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklittermanComponent } from './blacklitterman.component';

describe('BlacklittermanComponent', () => {
  let component: BlacklittermanComponent;
  let fixture: ComponentFixture<BlacklittermanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklittermanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklittermanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
