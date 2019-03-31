import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-album-folder',
  templateUrl: './album-folder.page.html',
  styleUrls: ['./album-folder.page.scss'],
})
export class AlbumFolderPage implements OnInit {

  constructor(private router:Router, public navCtrl:NavController) { }

  navigate(){
    this.router.navigateByUrl('/album-folder-like')  // 앨범 폴더 내에 좋아하는 사진을 보여준다요
  }
  backtoTab2(){
    this.router.navigateByUrl('/tabs/tab2')
  }
  gotoSearch(){
    this.navCtrl.navigateForward('/search');
  }

  ngOnInit() {
  }

}
