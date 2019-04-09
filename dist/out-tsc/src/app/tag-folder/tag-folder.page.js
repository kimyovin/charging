import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
var TagFolderPage = /** @class */ (function () {
    function TagFolderPage(router, navCtrl) {
        this.router = router;
        this.navCtrl = navCtrl;
    }
    TagFolderPage.prototype.backtoTab3 = function () {
        this.router.navigateByUrl('/tabs/tab3');
    };
    TagFolderPage.prototype.gotoSearch = function () {
        this.navCtrl.navigateForward('/search');
    };
    TagFolderPage.prototype.ngOnInit = function () {
    };
    TagFolderPage = tslib_1.__decorate([
        Component({
            selector: 'app-tag-folder',
            templateUrl: './tag-folder.page.html',
            styleUrls: ['./tag-folder.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NavController])
    ], TagFolderPage);
    return TagFolderPage;
}());
export { TagFolderPage };
//# sourceMappingURL=tag-folder.page.js.map