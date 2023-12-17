import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartBloqueiosComponent } from './bar-chart.component';

describe('BarChartBloqueiosComponent', () => {
  let component: BarChartBloqueiosComponent;
  let fixture: ComponentFixture<BarChartBloqueiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartBloqueiosComponent]
    });
    fixture = TestBed.createComponent(BarChartBloqueiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
