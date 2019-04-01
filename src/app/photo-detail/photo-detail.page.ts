import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.page.html',
  styleUrls: ['./photo-detail.page.scss'],
})
export class PhotoDetailPage implements OnInit{
  tags=[];
 //photo=null;

  
  constructor(public navCtrl: NavController, 
    public alertController: AlertController,
    public appcomponent: AppComponent,
    public actionSheetController: ActionSheetController,
    //private activatedRoute:ActivatedRoute,
    ){
      
      this.tags=[
        "frame",
        "door",
        "knock",
       ];
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

  //직접 태그 눌러서 수정or삭제
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
  

  //태그를 직접 눌러서 수정하기
  async presentAlertPromptModify(oldtagId:any) { 
    const alertModify = await this.alertController.create({
      header: '태그 입력',
      inputs: [
        {
          name: 'newtag',
          type: 'text',
          placeholder: 'New Tag'
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
        }
        }
      ],
    });
   
    await alertModify.present();
  }

   //Footer 직접 추가하기
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
        }
        }
      ],
    });
    await alertModify.present();
  }
}
