import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ActionSheetController, ToastController} from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ActivatedRoute} from '@angular/router';
import { TagToServerController }from'../http-controller/tagToServer'
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import {PhotoToServerController} from '../http-controller/photoToServer';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.page.html',
  styleUrls: ['./photo-detail.page.scss'],
})
export class PhotoDetailPage implements OnInit{
  tags=[];
  text=[];
  imgs=[];
  ParPhoto = null;

  constructor(public navCtrl: NavController,    //의존성 주입에 대한 작업
    public alertController: AlertController,
    public appcomponent: AppComponent,
    public actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private tagToServerController: TagToServerController,
    private activatedRoute:ActivatedRoute,
    private socialSharing: SocialSharing,
    private photoToServerController: PhotoToServerController,
    ){
    }
    
  ngOnInit(){ //변수 초기화 작업
      this.ParPhoto = JSON.parse(this.activatedRoute.snapshot.paramMap.get('photo'));
      // this.imgs.push(this.ParPhoto);
      this.tagToServerController.postRead(this.ParPhoto.image).subscribe(items => {
        const data = JSON.stringify(items)  
        const json = JSON.parse(data)   //0430- JSON.parse(JSON.stringify(items))
        json.forEach(item => {
          this.ParPhoto.like = item.photo_like;
          if(item.t_flag == 0)
            this.tags.push(item.tag_name);
          else
            this.text.push(item.tag_name);
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

  //React to click Tag Button
  async tagModifyBtnClick(oldtagId: any){
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text : '수정하기',
        handler: () => {
          this.presentAlertPromptModify(oldtagId);
        }
      },
      {
        text : '삭제하기',
        handler: () => {
          //직접 태그 눌러서 삭제하기 기능
          if(this.tags.indexOf(oldtagId) != -1){  //tag 삭제
            this.tags.splice(this.tags.indexOf(oldtagId), 1);
            this.tagToServerController.postDel(this.ParPhoto.image, oldtagId).subscribe(data => {
              console.log('#[PHOTO-DETAIL] postDel response :'+data['_body']);
            }, error => {
              console.log(error);
            });
            this.presentToast(oldtagId+' 태그가 삭제되었습니다');
          }
          else{ //text 삭제
            this.text.splice(this.text.indexOf(oldtagId), 1);
            this.tagToServerController.postDel(this.ParPhoto.image, oldtagId).subscribe(data => {
              console.log('#[PHOTO-DETAIL] postDel response :'+data['_body']);
            }, error => {
              console.log(error);
            });
            this.presentToast(oldtagId+' 텍스트가 삭제되었습니다');
          }
          
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
            if(this.tags.indexOf(oldtagId) != -1){  //tag 수정
              this.tags.splice(this.tags.indexOf(oldtagId), 1, data.newtag);
              this.tagToServerController.postUp(this.ParPhoto.image, oldtagId, data.newtag).subscribe(data => {
                console.log('#[PHOTO-DETAIL] postUp response :'+data['_body']);
               }, error => {
                console.log(error);
              });
              
              this.presentToast(data.newtag+' 태그로 수정되었습니다');
            }
            else{ //text 수정
              this.text.splice(this.text.indexOf(oldtagId), 1, data.newtag);
              this.tagToServerController.postUp(this.ParPhoto.image, oldtagId, data.newtag).subscribe(data => {
                console.log('#[PHOTO-DETAIL] postUp response :'+data['_body']);
               }, error => {
                console.log(error);
              });
              this.presentToast(data.newtag+' 텍스트로 수정되었습니다');
            }
        }
        }
      ],
    });
   
    await alertModify.present();
  }

   //Add Tag
   async presentAlertPromptAdd(flag) {
    const alertModify = await this.alertController.create({
      header: '새로운 '+ flag + '입력',
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
            console.log('Add newtag:'+data.newtag+' flag:'+flag);
            if(flag.includes('태그')){
              this.tags.push(data.newtag);
              this.tagToServerController.postCreate(this.ParPhoto.image, data.newtag, '0').subscribe(data => {
                console.log('#[PHOTO-DETAIL] postCreate response :'+ JSON.stringify(data));
               }, error => {
                console.log(error);
              });
              this.presentToast(data.newtag+' 태그를 추가했습니다');
            }
            else{
              this.text.push(data.newtag);
              this.tagToServerController.postCreate(this.ParPhoto.image, data.newtag, '1').subscribe(data => {
                console.log('#[PHOTO-DETAIL] postCreate response :'+ JSON.stringify(data));
               }, error => {
                console.log(error);
              });
              this.presentToast(data.newtag+' 텍스트를 추가했습니다');
            }
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
          this.shareOnlyImage();
        }
      },
      {
        text : '텍스트 공유',
        handler: () => {
          this.shareOnlyTags();
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
    this.socialSharing.share(null, null, this.ParPhoto.image, null)
    .then((entries) => {
      console.log('#success sharing')
    }).catch((e) => {
      console.log("##SocialSharing_Error: "+e);
    });

  }
  async shareOnlyTags() {
    const arr = this.text.toString();
    this.socialSharing.share(arr, null, null, null)
    .then((entries) => {
      // Success
    }).catch((e) => {
      // Error
    });
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
