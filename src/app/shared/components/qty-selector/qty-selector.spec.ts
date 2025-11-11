import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtySelector } from './qty-selector';

describe('QtySelector', () => {
  let component: QtySelector;
  let fixture: ComponentFixture<QtySelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QtySelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QtySelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
