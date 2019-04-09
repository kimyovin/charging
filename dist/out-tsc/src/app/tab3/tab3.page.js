import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(router, navCtrl) {
        this.router = router;
        this.navCtrl = navCtrl;
    }
    Tab3Page.prototype.ngOnInit = function () {
    };
    Tab3Page.prototype.gotoSearch = function () {
        this.navCtrl.navigateForward('/search');
    };
    Tab3Page.prototype.gotoTagFolder = function () {
        this.navCtrl.navigateForward('/tag-folder');
    };
    Tab3Page.prototype.navigate = function () {
        this.router.navigateByUrl('/tag-folder');
    };
    Tab3Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: './tab3.page.html',
            styleUrls: ['./tab3.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NavController])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map