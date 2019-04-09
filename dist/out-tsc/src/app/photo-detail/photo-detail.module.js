import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PhotoDetailPage } from './photo-detail.page';
var routes = [
    {
        path: '',
        component: PhotoDetailPage
    }
];
var PhotoDetailPageModule = /** @class */ (function () {
    function PhotoDetailPageModule() {
    }
    PhotoDetailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PhotoDetailPage]
        })
    ], PhotoDetailPageModule);
    return PhotoDetailPageModule;
}());
export { PhotoDetailPageModule };
//# sourceMappingURL=photo-detail.module.js.map