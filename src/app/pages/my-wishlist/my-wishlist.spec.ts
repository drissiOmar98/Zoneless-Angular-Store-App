import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWishlist } from './my-wishlist';

describe('MyWishlist', () => {
  let component: MyWishlist;
  let fixture: ComponentFixture<MyWishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyWishlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyWishlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
