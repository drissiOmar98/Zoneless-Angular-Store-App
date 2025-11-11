import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizeOrder } from './summarize-order';

describe('SummarizeOrder', () => {
  let component: SummarizeOrder;
  let fixture: ComponentFixture<SummarizeOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizeOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarizeOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
