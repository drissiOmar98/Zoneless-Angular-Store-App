import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyWishlist } from './empty-wishlist';

describe('EmptyWishlist', () => {
  let component: EmptyWishlist;
  let fixture: ComponentFixture<EmptyWishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyWishlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyWishlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
