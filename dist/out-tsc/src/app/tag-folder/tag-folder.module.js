import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TagFolderPage } from './tag-folder.page';
var routes = [
    {
        path: '',
        component: TagFolderPage
    }
];
var TagFolderPageModule = /** @class */ (function () {
    function TagFolderPageModule() {
    }
    TagFolderPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TagFolderPage]
        })
    ], TagFolderPageModule);
    return TagFolderPageModule;
}());
export { TagFolderPageModule };
//# sourceMappingURL=tag-folder.module.js.map