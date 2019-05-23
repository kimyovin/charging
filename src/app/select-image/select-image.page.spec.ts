import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectImagePage } from './select-image.page';

describe('SelectImagePage', () => {
  let component: SelectImagePage;
  let fixture: ComponentFixture<SelectImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectImagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
