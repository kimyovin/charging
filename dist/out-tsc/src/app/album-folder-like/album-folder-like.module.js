import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlbumFolderLikePage } from './album-folder-like.page';
var routes = [
    {
        path: '',
        component: AlbumFolderLikePage
    }
];
var AlbumFolderLikePageModule = /** @class */ (function () {
    function AlbumFolderLikePageModule() {
    }
    AlbumFolderLikePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AlbumFolderLikePage]
        })
    ], AlbumFolderLikePageModule);
    return AlbumFolderLikePageModule;
}());
export { AlbumFolderLikePageModule };
//# sourceMappingURL=album-folder-like.module.js.map