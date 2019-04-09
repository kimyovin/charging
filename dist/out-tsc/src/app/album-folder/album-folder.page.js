import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
var AlbumFolderPage = /** @class */ (function () {
    function AlbumFolderPage(router, navCtrl) {
        this.router = router;
        this.navCtrl = navCtrl;
    }
    AlbumFolderPage.prototype.navigate = function () {
        this.router.navigateByUrl('/album-folder-like'); // 앨범 폴더 내에 좋아하는 사진을 보여준다요
    };
    AlbumFolderPage.prototype.backtoTab2 = function () {
        this.router.navigateByUrl('/tabs/tab2');
    };
    AlbumFolderPage.prototype.gotoSearch = function () {
        this.navCtrl.navigateForward('/search');
    };
    AlbumFolderPage.prototype.ngOnInit = function () {
    };
    AlbumFolderPage = tslib_1.__decorate([
        Component({
            selector: 'app-album-folder',
            templateUrl: './album-folder.page.html',
            styleUrls: ['./album-folder.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NavController])
    ], AlbumFolderPage);
    return AlbumFolderPage;
}());
export { AlbumFolderPage };
//# sourceMappingURL=album-folder.page.js.map