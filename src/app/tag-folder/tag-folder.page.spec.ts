import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagFolderPage } from './tag-folder.page';

describe('TagFolderPage', () => {
  let component: TagFolderPage;
  let fixture: ComponentFixture<TagFolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagFolderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagFolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
