import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PhotoLikePage } from './photo-like.page';
var routes = [
    {
        path: '',
        component: PhotoLikePage
    }
];
var PhotoLikePageModule = /** @class */ (function () {
    function PhotoLikePageModule() {
    }
    PhotoLikePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PhotoLikePage]
        })
    ], PhotoLikePageModule);
    return PhotoLikePageModule;
}());
export { PhotoLikePageModule };
//# sourceMappingURL=photo-like.module.js.map