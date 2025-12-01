import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteReview } from './write-review';

describe('WriteReview', () => {
  let component: WriteReview;
  let fixture: ComponentFixture<WriteReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
