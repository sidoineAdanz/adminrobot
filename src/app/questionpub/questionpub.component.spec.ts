import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpubComponent } from './questionpub.component';

describe('QuestionpubComponent', () => {
  let component: QuestionpubComponent;
  let fixture: ComponentFixture<QuestionpubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionpubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
