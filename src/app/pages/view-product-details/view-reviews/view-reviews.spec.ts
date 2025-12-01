import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviews } from './view-reviews';

describe('ViewReviews', () => {
  let component: ViewReviews;
  let fixture: ComponentFixture<ViewReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReviews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
