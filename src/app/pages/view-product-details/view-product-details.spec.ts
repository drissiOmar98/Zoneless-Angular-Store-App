import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductDetails } from './view-product-details';

describe('ViewProductDetails', () => {
  let component: ViewProductDetails;
  let fixture: ComponentFixture<ViewProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProductDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
