import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaoLogadoComponent } from './nao-logado.component';

describe('NaoLogadoComponent', () => {
  let component: NaoLogadoComponent;
  let fixture: ComponentFixture<NaoLogadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NaoLogadoComponent]
    });
    fixture = TestBed.createComponent(NaoLogadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
