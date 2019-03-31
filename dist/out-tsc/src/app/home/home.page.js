import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import * as cordovaGallery from 'cordova-gallery-access';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, photoLibrary, photoViewer) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.photoLibrary = photoLibrary;
        this.photoViewer = photoViewer;
        this.imgs = [];
        this.photoPath = "../../assets/imgs/1.jpg";
        /***Using cordovaGallery plugin***/
        cordovaGallery.load().then(function (items) {
            var html = '';
            items.forEach(function (item) {
                _this.imgs.push(item.thumbnail);
                html += "<img src=\"file://" + item.thumbnail + "\"></img>";
            });
            document.getElementById("content").innerHTML = html;
        }).catch(function (e) { return console.error(e); });
        cordovaGallery.load({
            albumType: 'PHAssetCollectionSubtypeSmartAlbumUserLibrary',
            count: 10
        });
        /* Using PhotoLibrary plugin */
        // this.photoLibrary.requestAuthorization().then(() => {
        //   this.photoLibrary.getLibrary().subscribe({
        //     next: library => {
        //       library.forEach(function(libraryItem){
        //         this.photoPath=libraryItem.photoURL;
        //         console.log(libraryItem.id);          // ID of the photo
        //         console.log(libraryItem.photoURL);    // Cross-platform access to photo
        //         this.imgs.push(libraryItem.photoURL);
        //         console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
        //         console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
        //       });
        //     },
        //     error: err => { console.log('could not get photos');},
        //     complete: () => { console.log('done getting photos');}
        //   });
        // })
        // .catch(err => console.log('permissions weren\'t granted'));
        /* Using PhotoViewer plugin */
        //this.photoViewer.show(this.photoPath);
    }
    HomePage.prototype.tagBtnClick = function () {
        this.navCtrl.navigateForward('/tagview');
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