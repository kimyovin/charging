import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
var Tab2Page = /** @class */ (function () {
    function Tab2Page(router, navCtrl, alertController, actionSheetController, imagePicker) {
        this.router = router;
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.actionSheetController = actionSheetController;
        this.imagePicker = imagePicker;
        this.hiddenFlag = false;
        this.folders = [
            { folderName: 'travel', image: 'assets/image/img1.jpg' },
            { folderName: 'study', image: 'assets/image/img2.jpg' },
            { folderName: 'friends', image: 'assets/image/img3.jpg' },
            { folderName: 'classic', image: 'assets/image/img4.jpg' },
        ];
        this.example = [];
    }
    Tab2Page.prototype.ngOnInit = function () {
    };
    Tab2Page.prototype.edit_album = function () {
        this.hiddenFlag = true;
    };
    Tab2Page.prototype.finish_edit = function () {
        this.hiddenFlag = false;
    };
    Tab2Page.prototype.hideButton = function () {
        this.hiddenFlag = true;
    };
    Tab2Page.prototype.showButton = function () {
        this.hiddenFlag = false;
    };
    Tab2Page.prototype.gotoSearch = function () {
        this.navCtrl.navigateForward('/search');
    };
    Tab2Page.prototype.gotoFolder = function () {
        this.navCtrl.navigateForward('/album-folder');
    };
    Tab2Page.prototype.navigate = function () {
        this.router.navigateByUrl('/album-folder');
    };
    //Plus new Folder
    Tab2Page.prototype.createNewFolder = function () {
    };
    //Initializing image to new folder
    Tab2Page.prototype.pickImage = function () {
        this.imagePicker.getPictures(function (results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, function (error) {
            console.log('Error: ' + error);
        });
    };
    //React to click Folder
    Tab2Page.prototype.folderModifyBtnClick = function (oldFolder) {
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
                                        _this.presentAlertPromptModify(oldFolder);
                                    }
                                },
                                {
                                    text: '삭제하기',
                                    handler: function () {
                                        console.log('삭제하기 clicked');
                                        // 직접 태그 눌러서 삭제하기 기능
                                        _this.folders.splice(_this.folders.indexOf(oldFolder), 1);
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
    //Modify FolderName
    Tab2Page.prototype.presentAlertPromptModify = function (oldFolder) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alertModify;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: '폴더 이름 입력',
                            inputs: [
                                {
                                    name: 'newFolder',
                                    type: 'text',
                                    placeholder: 'Modify New name'
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
                                        console.log('Modify Folder: ' + oldFolder.folderName + ' => ' + data.newFolder);
                                        _this.folders[_this.folders.indexOf(oldFolder)].folderName = data.newFolder;
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
    // Add Folder
    Tab2Page.prototype.presentAlertPromptAdd = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alertModify;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: '새로운 폴더 이름 입력',
                            inputs: [
                                {
                                    name: 'newFolder',
                                    type: 'text',
                                    placeholder: 'New Folder'
                                }
                            ],
                            buttons: [
                                {
                                    text: '취소',
                                    handler: function () {
                                        console.log('Folder Add Cancel');
                                    }
                                },
                                {
                                    text: '완료',
                                    handler: function (data) {
                                        console.log('Add newFolder:' + data.newFolder);
                                        _this.folders.push({ folderName: data.newFolder, image: 'assets/image/img9.jpg' }); //image is selected by ImagePicker
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
    Tab2Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab2',
            templateUrl: './tab2.page.html',
            styleUrls: ['./tab2.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NavController,
            AlertController,
            ActionSheetController,
            ImagePicker])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.page.js.map