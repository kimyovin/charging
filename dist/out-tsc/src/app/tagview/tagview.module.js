import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TagviewPage } from './tagview.page';
var routes = [
    {
        path: '',
        component: TagviewPage
    }
];
var TagviewPageModule = /** @class */ (function () {
    function TagviewPageModule() {
    }
    TagviewPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TagviewPage]
        })
    ], TagviewPageModule);
    return TagviewPageModule;
}());
export { TagviewPageModule };
//# sourceMappingURL=tagview.module.js.map