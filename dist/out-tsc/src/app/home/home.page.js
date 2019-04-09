import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
//import * as cordovaGallery from 'cordova-gallery-access'; 
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, photoLibrary, photoViewer) {
        this.navCtrl = navCtrl;
        this.photoLibrary = photoLibrary;
        this.photoViewer = photoViewer;
        this.imgs = ['assets/imgs/1.jpg', 'assets/imgs/2.jpg', 'assets/imgs/3.jpg', 'assets/imgs/4.jpg',
            'assets/imgs/5.jpg', 'assets/imgs/6.jpg',];
        console.log('#home들어감');
        /***Using cordovaGallery plugin***/
        //   cordovaGallery.load({ count: 10, }).then(items => {
        //     items.forEach(item => {
        //       this.imgs.push('file://'+item.thumbnail);
        //       console.log("#Item.thumbnail: "+item.thumbnail);
        //     });
        // }).catch(e => console.error('#cordovaGallery Error'+e));
    }
    HomePage.prototype.navigate = function () {
        this.navCtrl.navigateForward('/photo-like');
    };
    // photo="assets/image/img1.jpg";
    // gotoDetail(){
    //   this.navCtrl.navigateForward(`/photo-detail/${this.photo}`);
    // }
    HomePage.prototype.gotoDetail = function () {
        this.navCtrl.navigateForward('/photo-detail');
    };
    HomePage.prototype.gotoSearch = function () {
        this.navCtrl.navigateForward('/search');
    };
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            PhotoLibrary,
            PhotoViewer])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map