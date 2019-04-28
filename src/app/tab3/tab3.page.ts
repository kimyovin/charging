import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NavController } from '@ionic/angular';

import { TagfolderToServerController } from '../http-controller/tagfolderToServer'

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  tagfolders=[];
  constructor(private router:Router, public navCtrl: NavController,
    private tagfolderToServerController: TagfolderToServerController,
    ) {
      console.log('TAB3 들어옴')
      tagfolderToServerController.getRead()
      .subscribe(items => {
        console.log("##[Tab3]subscribe 받음")
        const data = JSON.stringify(items)
        const json = JSON.parse(data)
        json.forEach(item => {
          this.tagfolders.push({tagName: item.tag_name, mainPhotoPath: item.photo_path_t});
          console.log('#[Tab3]item.tag_name: '+item.tag_name+' /item.photo_path_t: '+item.photo_path_t);
        });
      })
    }

  ngOnInit() {
  }

  gotoSearch(){ // 검색창 페이지로 이동
    this.navCtrl.navigateForward('/search');
  }


  gotoTagFolder(){ 
    this.navCtrl.navigateForward('/tag-folder');
  }

  navigate(){
    this.router.navigateByUrl('/tag-folder')
  }
}
