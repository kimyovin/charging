import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { parseHttpResponse } from 'selenium-webdriver/http';

@Component({
  selector: 'app-tagview',
  templateUrl: './tagview.page.html',
  styleUrls: ['./tagview.page.scss'],
})

export class TagviewPage implements OnInit {
  tags=[];

  constructor(public actionSheetController: ActionSheetController,
    public appcomponent: AppComponent,
    public alertController: AlertController,
    // public tagClass: TagClass,
    ) { 
      this.tags=['frame', 'door', 'knock', ];
    }

  ngOnInit() {
  }
  //직접 태그 눌러서 수정or삭제
  async tagModifyBtnClick(){
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text : '수정하기',
        handler: () => {
          console.log('수정하기 clicked');
          this.presentAlertPromptModify();
        }
      },
      {
        text : '삭제하기',
        handler: () => {
          console.log('삭제하기 clicked');
          //직접 태그 눌러서 삭제하기 기능
          this.tags.splice(this.tags.indexOf(document.getElementById("oldtag")), 1);
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
  async presentAlertPromptModify() { 
    const alertModify = await this.alertController.create({
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
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: '완료',
          handler: data => {
            console.log('Modify tag: '+ document.getElementById("oldtag{{tags.indexOf(item)}}") +' => '+ data.newtag);
            this.tags.splice(this.tags.indexOf(document.getElementById("oldtag{{tags.indexOf(item)}}")), 1, data.newtag);
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
