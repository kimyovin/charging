import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import {Router} from '@angular/router';
import { NavController, AlertController, ActionSheetController, ToastController, Platform} from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';

import { FolderToServerController } from '../http-controller/folderToServer'

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
    private toastController: ToastController,
    private platform: Platform,
    // private imagePicker: ImagePicker,
    private camera: Camera,
    private filePath: FilePath,
    private folderToServerController: FolderToServerController,
    ) {
      this.folders=[
        {folderName: 'travel', image:'assets/image/img1.jpg'},
        {folderName: 'study', image:'assets/image/img2.jpg'},
        {folderName: 'friends', image:'assets/image/img3.jpg'},
      ]
      this.example = [];
   }

  ngOnInit() {
    this.folderToServerController.getRead().subscribe(data => {
      console.log("##[FoldergetRead]subscribe 받음: "+data)
      const json = JSON.stringify(data)
      const items = JSON.parse(json)
      items.forEach(item => {
        this.folders.push({ folderName: item.folder_name, image: item.main_photo});
        console.log('#[FoldergetRead]ToServer| item.folder_name: '+item.folder_name+' /item.main_photo: '+item.main_photo);
      });
    }, error => {
      console.log(error);
    })
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

  gotoFolder(folderName){
    console.log("#folderName: "+ folderName)
    this.router.navigate(['album-folder', folderName]);
  }

  // navigate(){
  //   this.router.navigateByUrl('/album-folder')
  // }

  //Plus new Folder
 newAddimage: string;
 newName: string;
 currentName: string;
 async createNewFolder(){
    this.presentToast("앨범의 대표 사진을 선택해주세요");
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
    this.presentAlertPromptAdd();
    
   }
 
takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
    console.log("### I'm in TakePicture() !!");
    this.camera.getPicture(options).then(imagePath => {
      console.log('##[getPicture] item.id: '+ imagePath)
        if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
            this.filePath.resolveNativePath(imagePath)
                .then(filePath => {
                     let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                     this.currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    
                     this.newAddimage = correctPath+ this.currentName;
                     console.log('### CorrectPath: '+correctPath+' / currentName: '+ this.currentName );   

                 //   this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
        } else {
            var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
            var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
            return correctPath;
        //    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
    });
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
          this.folderToServerController.getDel(oldFolder.folderName).subscribe(data =>{
            console.log(data['_body']);
          }, error => {
            console.log(error);
          });
        }
      },
      {
        text: '진입하기',
        handler: ()=> {
          this.gotoFolder(oldFolder.folderName)
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
          placeholder: this.folders[this.folders.indexOf(oldFolder)].folderName,
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
            this.folderToServerController.getUp(oldFolder.folderName, data.newFolder).subscribe(data =>{
              console.log('##[FoldergetUp]subscribe 받음: '+data);
            }, error => {
              console.log('##[FoldergetUp]Error: '+error);
            });
            console.log('Modify Folder2: ' + oldFolder.folderName + ' => ' + data.newFolder);
            this.folders[this.folders.indexOf(oldFolder)].folderName = data.newFolder;
    
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
            this.newName = data.newFolder;
            this.folders.push({folderName: this.newName, image: this.newAddimage});
            console.log("##NewName : "+this.newName + " || currentName : "+ this.currentName);
            this.folderToServerController.postCreate(this.newName, this.currentName, this.currentName).subscribe(data =>{
              console.log(data);
            }, error => {
              console.log(error);
            });
            console.log("##Adding NewFolder Success !!");
          }
        }
      ],
    });
    await alertModify.present();
  }

  //toastMessage
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }
}
