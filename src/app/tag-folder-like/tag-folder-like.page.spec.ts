import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFolderLikePage } from './tag-folder-like.page';

describe('TagFolderLikePage', () => {
  let component: TagFolderLikePage;
  let fixture: ComponentFixture<TagFolderLikePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagFolderLikePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagFolderLikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
