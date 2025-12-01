import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSummary } from './rating-summary';

describe('RatingSummary', () => {
  let component: RatingSummary;
  let fixture: ComponentFixture<RatingSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
