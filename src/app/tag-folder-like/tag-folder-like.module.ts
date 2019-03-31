import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TagFolderLikePage } from './tag-folder-like.page';

const routes: Routes = [
  {
    path: '',
    component: TagFolderLikePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TagFolderLikePage]
})
export class TagFolderLikePageModule {}
