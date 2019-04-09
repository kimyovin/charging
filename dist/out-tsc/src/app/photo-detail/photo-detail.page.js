import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../app.component';
// import * as vision from'@google-cloud/vision';
var PhotoDetailPage = /** @class */ (function () {
    //photo=null;
    // Imports the Google Cloud client library
    // Creates a client
    // client = new vision.ImageAnnotatorClient();
    // Performs label detection on the image file
    function PhotoDetailPage(navCtrl, alertController, appcomponent, actionSheetController) {
        // try{
        //   const [result] = this.client.labelDetection('assets/imgs/1.jpg');
        //   const labels = result.labelAnnotations;
        //   console.log('Labels:');
        //   labels.forEach(label => console.log(label.description));
        // }catch(err) {
        //   console.error('ERROR:', err);
        // };
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.appcomponent = appcomponent;
        this.actionSheetController = actionSheetController;
        this.tags = [];
        this.hiddenFlag = false;
        this.tags = [
            "frame",
            "door",
            "knock",
        ];
    }
    PhotoDetailPage.prototype.ngOnInit = function () {
        //this.photo = this.activatedRoute.snapshot.paramMap.get('photo');
    };
    PhotoDetailPage.prototype.tagBtnClick = function () {
        this.navCtrl.navigateForward('/tagview');
    };
    PhotoDetailPage.prototype.gotoBack = function () {
        this.navCtrl.pop();
    };
    PhotoDetailPage.prototype.edit_tags = function () {
        this.hiddenFlag = true;
    };
    PhotoDetailPage.prototype.backtoDetail = function () {
        this.hiddenFlag = false;
    };
    //React to click Tag Button; delete tag()은 여기서 끝
    PhotoDetailPage.prototype.tagModifyBtnClick = function (oldtagId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [{
                                    text: '수정하기',
                                    handler: function () {
                                        console.log('수정하기 clicked');
                                        _this.presentAlertPromptModify(oldtagId);
                                    }
                                },
                                {
                                    text: '삭제하기',
                                    handler: function () {
                                        console.log('삭제하기 clicked');
                                        //직접 태그 눌러서 삭제하기 기능
                                        console.log('oldtagID: ' + oldtagId);
                                        _this.tags.splice(_this.tags.indexOf(oldtagId), 1);
                                    }
                                },
                                {
                                    text: '취소',
                                    role: 'destructive',
                                    handler: function () {
                                        console.log('취소 clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Modify tag
    PhotoDetailPage.prototype.presentAlertPromptModify = function (oldtagId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alertModify;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: '태그 입력',
                            inputs: [
                                {
                                    name: 'newtag',
                                    type: 'text',
                                    placeholder: 'Modify New Tag'
                                }
                            ],
                            buttons: [
                                {
                                    text: '취소',
                                    role: 'cancle',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                },
                                {
                                    text: '완료',
                                    handler: function (data) {
                                        console.log('Modify tag: ' + document.getElementById("oldtag{{tags.indexOf(item)}}") + ' => ' + data.newtag);
                                        _this.tags.splice(_this.tags.indexOf(oldtagId), 1, data.newtag);
                                    }
                                }
                            ],
                        })];
                    case 1:
                        alertModify = _a.sent();
                        return [4 /*yield*/, alertModify.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Add Tag
    PhotoDetailPage.prototype.presentAlertPromptAdd = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alertModify;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: '새로운 태그 입력',
                            inputs: [
                                {
                                    name: 'newtag',
                                    type: 'text',
                                    placeholder: ''
                                }
                            ],
                            buttons: [
                                {
                                    text: '취소',
                                    handler: function () {
                                        console.log('Footer Add Cancel');
                                    }
                                },
                                {
                                    text: '완료',
                                    handler: function (data) {
                                        console.log('Add newtag:' + data.newtag);
                                        _this.tags.push(data.newtag);
                                    }
                                }
                            ],
                        })];
                    case 1:
                        alertModify = _a.sent();
                        return [4 /*yield*/, alertModify.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PhotoDetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-photo-detail',
            templateUrl: './photo-detail.page.html',
            styleUrls: ['./photo-detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            AlertController,
            AppComponent,
            ActionSheetController])
    ], PhotoDetailPage);
    return PhotoDetailPage;
}());
export { PhotoDetailPage };
//# sourceMappingURL=photo-detail.page.js.map