import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxAuthFirebaseuiComponent } from './ngx-auth-firebaseui.component';

describe('NgxAuthFirebaseuiComponent', () => {
  let component: NgxAuthFirebaseuiComponent;
  let fixture: ComponentFixture<NgxAuthFirebaseuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxAuthFirebaseuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxAuthFirebaseuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
