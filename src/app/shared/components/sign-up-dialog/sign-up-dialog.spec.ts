import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpDialog } from './sign-up-dialog';

describe('SignUpDialog', () => {
  let component: SignUpDialog;
  let fixture: ComponentFixture<SignUpDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
