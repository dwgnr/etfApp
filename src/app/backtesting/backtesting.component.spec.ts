import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktestingComponent } from './backtesting.component';

describe('BacktestingComponent', () => {
  let component: BacktestingComponent;
  let fixture: ComponentFixture<BacktestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacktestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacktestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
