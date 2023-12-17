import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteComMaisAcessosETempoComponent } from './card.component';

describe('SiteComMaisAcessosETempoComponent', () => {
  let component: SiteComMaisAcessosETempoComponent;
  let fixture: ComponentFixture<SiteComMaisAcessosETempoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteComMaisAcessosETempoComponent]
    });
    fixture = TestBed.createComponent(SiteComMaisAcessosETempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
