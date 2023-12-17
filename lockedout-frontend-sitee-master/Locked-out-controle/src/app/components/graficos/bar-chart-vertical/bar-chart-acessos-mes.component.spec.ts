import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartAcessosMesComponent } from './bar-chart-vertical';

describe('BarChartAcessosMesComponent', () => {
  let component: BarChartAcessosMesComponent;
  let fixture: ComponentFixture<BarChartAcessosMesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartAcessosMesComponent]
    });
    fixture = TestBed.createComponent(BarChartAcessosMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
