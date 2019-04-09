import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var PhotoLikePage = /** @class */ (function () {
    function PhotoLikePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    PhotoLikePage.prototype.gotoSearch = function () {
        this.navCtrl.navigateForward('/search');
    };
    PhotoLikePage.prototype.gotoTab1 = function () {
        this.goBack();
        this.navCtrl.navigateRoot('/tabs');
    };
    PhotoLikePage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    PhotoLikePage.prototype.ngOnInit = function () {
    };
    PhotoLikePage = tslib_1.__decorate([
        Component({
            selector: 'app-photo-like',
            templateUrl: './photo-like.page.html',
            styleUrls: ['./photo-like.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], PhotoLikePage);
    return PhotoLikePage;
}());
export { PhotoLikePage };
//# sourceMappingURL=photo-like.page.js.map