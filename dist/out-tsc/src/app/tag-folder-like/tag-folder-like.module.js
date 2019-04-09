import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TagFolderLikePage } from './tag-folder-like.page';
var routes = [
    {
        path: '',
        component: TagFolderLikePage
    }
];
var TagFolderLikePageModule = /** @class */ (function () {
    function TagFolderLikePageModule() {
    }
    TagFolderLikePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TagFolderLikePage]
        })
    ], TagFolderLikePageModule);
    return TagFolderLikePageModule;
}());
export { TagFolderLikePageModule };
//# sourceMappingURL=tag-folder-like.module.js.map