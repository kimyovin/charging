import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActionSheetController, AlertController } from '@ionic/angular';
var TagviewPage = /** @class */ (function () {
    function TagviewPage(actionSheetController, appcomponent, alertController) {
        this.actionSheetController = actionSheetController;
        this.appcomponent = appcomponent;
        this.alertController = alertController;
        this.tags = [];
        this.tags = ['frame', 'door', 'knock',];
    }
    TagviewPage.prototype.ngOnInit = function () {
    };
    //직접 태그 눌러서 수정or삭제
    TagviewPage.prototype.tagModifyBtnClick = function () {
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
                                        _this.presentAlertPromptModify();
                                    }
                                },
                                {
                                    text: '삭제하기',
                                    handler: function () {
                                        console.log('삭제하기 clicked');
                                        //직접 태그 눌러서 삭제하기 기능
                                        _this.tags.splice(_this.tags.indexOf(document.getElementById("oldtag")), 1);
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
    //태그를 직접 눌러서 수정하기
    TagviewPage.prototype.presentAlertPromptModify = function () {
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
                                    placeholder: 'document.getElementById("oldtag").innerText'
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
                                        _this.tags.splice(_this.tags.indexOf(document.getElementById("oldtag{{tags.indexOf(item)}}")), 1, data.newtag);
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
    //Footer 직접 추가하기
    TagviewPage.prototype.presentAlertPromptAdd = function () {
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
    TagviewPage = tslib_1.__decorate([
        Component({
            selector: 'app-tagview',
            templateUrl: './tagview.page.html',
            styleUrls: ['./tagview.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActionSheetController,
            AppComponent,
            AlertController])
    ], TagviewPage);
    return TagviewPage;
}());
export { TagviewPage };
//# sourceMappingURL=tagview.page.js.map