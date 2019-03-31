import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoLikePage } from './photo-like.page';

describe('PhotoLikePage', () => {
  let component: PhotoLikePage;
  let fixture: ComponentFixture<PhotoLikePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoLikePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoLikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
