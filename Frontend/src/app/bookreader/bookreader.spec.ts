import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bookreader } from './bookreader';

describe('Bookreader', () => {
  let component: Bookreader;
  let fixture: ComponentFixture<Bookreader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bookreader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bookreader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
