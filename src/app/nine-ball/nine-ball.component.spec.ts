import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NineBallComponent } from './nine-ball.component';

describe('NineBallComponent', () => {
  let component: NineBallComponent;
  let fixture: ComponentFixture<NineBallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NineBallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NineBallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
