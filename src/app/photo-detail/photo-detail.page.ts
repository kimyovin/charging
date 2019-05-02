import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ActivatedRoute} from '@angular/router';
import { TagToServerController }from'../http-controller/tagToServer'
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import {PhotoToServerController} from '../http-controller/photoToServer';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.page.html',
  styleUrls: ['./photo-detail.page.scss'],
})
export class PhotoDetailPage implements OnInit{
  tags=[];
  imgs=[];
  ParPhoto = null;

 // Imports the Google Cloud client library

// Creates a client
// client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file

  constructor(public navCtrl: NavController,    //의존성 주입에 대한 작업
    public alertController: AlertController,
    public appcomponent: AppComponent,
    public actionSheetController: ActionSheetController,
    private tagToServerController: TagToServerController,
    private photolibrary: PhotoLibrary,
    private activatedRoute:ActivatedRoute,
    private socialSharing: SocialSharing,
    private file: File,
    private photoToServerController: PhotoToServerController,
    ){
    }
    
  ngOnInit(){ //변수 초기화 작업
    console.log('#im in ngOnInit')
      this.ParPhoto = JSON.parse(this.activatedRoute.snapshot.paramMap.get('photo'));
      console.log('##ParPhoto: '+ JSON.stringify(this.ParPhoto))
      // this.imgs.push(this.ParPhoto);
      this.tagToServerController.postRead(this.ParPhoto.image).subscribe(items => {
        console.log("##PHOTO-DETAIL: tag postRead 받음:"+items)
        const data = JSON.stringify(items)  
        const json = JSON.parse(data)   //0430- JSON.parse(JSON.stringify(items))
        json.forEach(item => {
          this.tags.push(item.tag_name);
          console.log('#[PHOTO-DETAIL]ToServer_item.tag_name: '+item.tag_name);
        });
      })
    }
    
  public tagBtnClick(){
    this.navCtrl.navigateForward('/tagview');
  }

  gotoBack() {
    this.navCtrl.pop();
  }

  hiddenFlag:boolean = false;
  edit_tags() {
    this.hiddenFlag=true;
  }
  backtoDetail(){
    this.hiddenFlag=false;
  }

  changeLike(selectedImg){  //like: postClickHeart, unlike: postCancelHeart 
    if(this.ParPhoto.like == 1)
      this.photoToServerController.postCancelHeart(this.ParPhoto.image).subscribe(data => {
        console.log('#HEart-Empty : '+data);
      }, error => {
        console.log('#PostCancleHeart Error: '+error);
      });
    else
      this.photoToServerController.postClickHeart(this.ParPhoto.image).subscribe(data => {
        console.log('#Heart: '+data);
       }, error => {
        console.log('#PostClickHeart Error: '+error);
      });
    
    this.ParPhoto.like = (this.ParPhoto.like=='1')?null:'1';
  }

  //React to click Tag Button; delete tag()은 여기서 끝
  async tagModifyBtnClick(oldtagId: any){
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text : '수정하기',
        handler: () => {
          console.log('수정하기 clicked');

          this.presentAlertPromptModify(oldtagId);
        }
      },
      {
        text : '삭제하기',
        handler: () => {
          console.log('삭제하기 clicked');
          //직접 태그 눌러서 삭제하기 기능
          console.log('oldtagID: '+oldtagId);
          this.tags.splice(this.tags.indexOf(oldtagId), 1);
          this.tagToServerController.postDel(this.ParPhoto.image, oldtagId).subscribe(data => {
            console.log('#[PHOTO-DETAIL] postDel response :'+data['_body']);
           }, error => {
            console.log(error);
          });
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
  
  //Modify tag
  async presentAlertPromptModify(oldtagId:any) { 
    const alertModify = await this.alertController.create({
      header: '태그 입력',
      inputs: [
        {
          name: 'newtag',
          type: 'text',
          placeholder: oldtagId,
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
            console.log('Modify tag: '+ document.getElementById("oldtag{{tags.indexOf(item)}}") +' => '+ data.newtag);
            this.tags.splice(this.tags.indexOf(oldtagId), 1, data.newtag);
            this.tagToServerController.postUp(this.ParPhoto.image, oldtagId, data.newtag).subscribe(data => {
              console.log('#[PHOTO-DETAIL] postUp response :'+data['_body']);
             }, error => {
              console.log(error);
            });
            
        }
        }
      ],
    });
   
    await alertModify.present();
  }

   //Add Tag
   async presentAlertPromptAdd() {
    const alertModify = await this.alertController.create({
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
          handler: () => {
            console.log('Footer Add Cancel');
          }
        },
        {
          text: '완료',
          handler: data => {
            console.log('Add newtag:'+data.newtag);
            this.tags.push(data.newtag);
            this.tagToServerController.postCreate(this.ParPhoto.image, data.newtag).subscribe(data => {
              console.log('#[PHOTO-DETAIL] postCreate response :'+ data['_body']);
             }, error => {
              console.log(error);
            });

            console.log('Tag Upload Success !!');
        }
        }
      ],
    });
    await alertModify.present();
  }

  async shareBntClick() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
        text : '이미지 공유',
        handler: () => {
          console.log('이미지공유 clicked');
          this.shareOnlyImage();
          // this.presentAlertPromptModify(oldtagId);
        }
      },
      {
        text : '태그 공유',
        handler: () => {
          console.log('태그공유 clicked');
          this.shareOnlyTags();

          // this.tags.splice(this.tags.indexOf(oldtagId), 1);
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
  async shareOnlyImage() {
    console.log("#Im in shareOnlyImage()");
    this.socialSharing.share(null, null, this.ParPhoto.image, null)
    .then((entries) => {
      console.log('#success sharing')
    }).catch((e) => {
      console.log("##SocialSharing_Error: "+e);
    });

  }
  async shareOnlyTags() {
    const arr = this.tags.toString();
    this.socialSharing.share(arr, null, null, null)
    .then((entries) => {
      // Success
    }).catch((e) => {
      // Error
    });
  }
}
