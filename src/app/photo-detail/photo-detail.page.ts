import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ActivatedRoute} from '@angular/router';
import { TagToServerController }from'../http-controller/tagToServer'
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';


@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.page.html',
  styleUrls: ['./photo-detail.page.scss'],
})
export class PhotoDetailPage implements OnInit{
  tags=[];
  imgs=['assets/imgs/1.jpg', ];
  date: any;
 //photo=null;

 // Imports the Google Cloud client library

// Creates a client
// client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file

  constructor(public navCtrl: NavController, 
    public alertController: AlertController,
    public appcomponent: AppComponent,
    public actionSheetController: ActionSheetController,
    private tagToServerController: TagToServerController,
    private photolibrary: PhotoLibrary,
    //private activatedRoute:ActivatedRoute,
    ){
      this.tags=[
        "test1"
       ];
       tagToServerController.postRead(this.imgs[0]).subscribe(items => {
        console.log("##subscribe 받음")
        const data = JSON.stringify(items)
        const json = JSON.parse(data)
        json.forEach(item => {
          this.tags.push(item.tag_name);
          console.log('#[PHOTO-DETAIL]ToServer_item.tag_name: '+item.tag_name);
        });
      })

      //get photo data/time
      // const option={
      //   thumbnailWidth: number;
      //   thumbnailHeight?: number;
      //   quality?: number;
      //   itemsInChunk?: number;
      //   chunkTimeSec?: number;
      //   useOriginalFileNames?: boolean;
      //   includeAlbumData?: boolean;
      //   includeVideos?: boolean;
      //   maxItems?: number;
      // }
     
    //   error: err => { console.log('could not get photos'); },
    //   complete: () => { console.log('done getting photos'); }
    // });
    //   photolibrary.getPhoto(this.imgs[0], ).then(item => {
    //     this.date = item.creationDate;
    //     console.log('##[photo-detail] date:'+ this.date + ' / item.creationDate: '+item.creationDate);
    //   }).catch(error => console.log('##[photo-detail]Error get date: '+error));

  
  }
    
  ngOnInit(){
      //this.photo = this.activatedRoute.snapshot.paramMap.get('photo');
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
          this.tagToServerController.postDel(this.imgs[0], oldtagId).subscribe(data => {
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
            this.tagToServerController.postUp(this.imgs[0], oldtagId, data.newtag).subscribe(data => {
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
            this.tagToServerController.postCreate( this.imgs[0], data.newtag).subscribe(data => {
              console.log('#[PHOTO-DETAIL] postCreate response :'+data['_body']);
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
}
