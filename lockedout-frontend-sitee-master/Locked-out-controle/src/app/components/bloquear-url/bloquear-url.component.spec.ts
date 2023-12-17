import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloquearUrlComponent } from './bloquear-url.component';

describe('BloquearUrlComponent', () => {
  let component: BloquearUrlComponent;
  let fixture: ComponentFixture<BloquearUrlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BloquearUrlComponent]
    });
    fixture = TestBed.createComponent(BloquearUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
