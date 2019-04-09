import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
var AlbumFolderLikePage = /** @class */ (function () {
    function AlbumFolderLikePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AlbumFolderLikePage.prototype.gotoSearch = function () {
        this.navCtrl.navigateForward('/search');
    };
    AlbumFolderLikePage.prototype.ngOnInit = function () {
    };
    AlbumFolderLikePage = tslib_1.__decorate([
        Component({
            selector: 'app-album-folder-like',
            templateUrl: './album-folder-like.page.html',
            styleUrls: ['./album-folder-like.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController])
    ], AlbumFolderLikePage);
    return AlbumFolderLikePage;
}());
export { AlbumFolderLikePage };
//# sourceMappingURL=album-folder-like.page.js.map