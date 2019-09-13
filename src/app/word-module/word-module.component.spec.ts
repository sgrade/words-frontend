import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordModuleComponent } from './word-module.component';

describe('WordModuleComponent', () => {
  let component: WordModuleComponent;
  let fixture: ComponentFixture<WordModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
