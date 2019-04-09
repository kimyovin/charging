import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlbumFolderPage } from './album-folder.page';
var routes = [
    {
        path: '',
        component: AlbumFolderPage
    }
];
var AlbumFolderPageModule = /** @class */ (function () {
    function AlbumFolderPageModule() {
    }
    AlbumFolderPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AlbumFolderPage]
        })
    ], AlbumFolderPageModule);
    return AlbumFolderPageModule;
}());
export { AlbumFolderPageModule };
//# sourceMappingURL=album-folder.module.js.map