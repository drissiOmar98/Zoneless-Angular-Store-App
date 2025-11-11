import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartItems } from './list-cart-items';

describe('ListCartItems', () => {
  let component: ListCartItems;
  let fixture: ComponentFixture<ListCartItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCartItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCartItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
