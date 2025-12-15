import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookdetails } from './bookdetails';

describe('Bookdetails', () => {
  let component: Bookdetails;
  let fixture: ComponentFixture<Bookdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
