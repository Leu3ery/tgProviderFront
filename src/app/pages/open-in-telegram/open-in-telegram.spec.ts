import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenInTelegram } from './open-in-telegram';

describe('OpenInTelegram', () => {
  let component: OpenInTelegram;
  let fixture: ComponentFixture<OpenInTelegram>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenInTelegram]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenInTelegram);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
