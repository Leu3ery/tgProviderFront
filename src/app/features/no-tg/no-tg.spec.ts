import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoTg } from './no-tg';

describe('NoTg', () => {
  let component: NoTg;
  let fixture: ComponentFixture<NoTg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoTg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoTg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
