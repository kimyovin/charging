import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavController, AlertController, ActionSheetController} from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  folders: any;
  example: any;
  hiddenFlag: boolean = false;

  constructor(private router:Router, public navCtrl:NavController,
    public alertController: AlertController,
    public actionSheetController: ActionSheetController,
    ) {

      this.folders=[
        {folderName: 'travel', image:'assets/image/img1.jpg'},
        {folderName: 'study', image:'assets/image/img2.jpg'},
        {folderName: 'friends', image:'assets/image/img3.jpg'},
        {folderName: 'classic', image:'assets/image/img4.jpg'},
      ]
      this.example = [];
   }

  ngOnInit() {
  }

  edit_album() {
    this.hiddenFlag = true;
  }

  finish_edit() {
    this.hiddenFlag = false;
  }

  hideButton(){
    this.hiddenFlag=true;
  }
  showButton(){
    this.hiddenFlag=false;
  }

  gotoSearch(){ // 검색창 페이지로 이동
    this.navCtrl.navigateForward('/search');
  }

  gotoFolder(){ 
    this.navCtrl.navigateForward('/album-folder');
  }

  navigate(){
    this.router.navigateByUrl('/album-folder')
  }

  //React to click Folder
  async folderModifyBtnClick(oldFolder: any) {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text : '수정하기',
        handler: () => {
          console.log('수정하기 clicked');
          this.presentAlertPromptModify(oldFolder);
        }
      },
      {
        text : '삭제하기',
        handler: () => {
          console.log('삭제하기 clicked');
          // 직접 태그 눌러서 삭제하기 기능
          this.folders.splice(this.folders.indexOf(oldFolder), 1);
        }
      },
    {
      text: '취소',
      role: 'destructive',

      handler: () => {
        console.log('취소 clicked');
      }
    }]
    });
    await actionSheet.present();
  }

  //Modify FolderName
  async presentAlertPromptModify(oldFolder) {
    const alertModify = await this.alertController.create({
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
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: '완료',
          handler: data => {
            console.log('Modify Folder: ' + oldFolder.folderName + ' => ' + data.newFolder);
            this.folders[this.folders.indexOf(oldFolder)].folderName = data.newFolder;
//            this.folders.splice(this.folders.indexOf(oldFolder), 1, data.newFolder);
        }
        }
      ],
    });

    await alertModify.present();
  }

   // Add Folder
   async presentAlertPromptAdd() {
    const alertModify = await this.alertController.create({
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
          handler: () => {
            console.log('Folder Add Cancel');
          }
        },
        {
          text: '완료',
          handler: data => {
            console.log('Add newFolder:' + data.newFolder);
            this.folders.push({folderName: data.newFolder, image: 'assets/image/img9.jpg'});  //image is selected by ImagePicker
          }
        }
      ],
    });
    await alertModify.present();
  }
}
