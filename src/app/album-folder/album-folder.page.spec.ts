import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumFolderPage } from './album-folder.page';

describe('AlbumFolderPage', () => {
  let component: AlbumFolderPage;
  let fixture: ComponentFixture<AlbumFolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumFolderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumFolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
