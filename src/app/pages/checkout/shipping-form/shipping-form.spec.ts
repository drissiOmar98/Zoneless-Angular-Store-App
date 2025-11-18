import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingForm } from './shipping-form';

describe('ShippingForm', () => {
  let component: ShippingForm;
  let fixture: ComponentFixture<ShippingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
