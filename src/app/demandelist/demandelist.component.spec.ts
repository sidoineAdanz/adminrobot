import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandelistComponent } from './demandelist.component';

describe('DemandelistComponent', () => {
  let component: DemandelistComponent;
  let fixture: ComponentFixture<DemandelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
