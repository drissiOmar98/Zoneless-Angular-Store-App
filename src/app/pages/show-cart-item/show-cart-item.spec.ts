import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCartItem } from './show-cart-item';

describe('ShowCartItem', () => {
  let component: ShowCartItem;
  let fixture: ComponentFixture<ShowCartItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCartItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCartItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
