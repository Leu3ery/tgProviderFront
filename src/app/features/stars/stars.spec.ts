import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stars } from './stars';

describe('Stars', () => {
  let component: Stars;
  let fixture: ComponentFixture<Stars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
