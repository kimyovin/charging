import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-album-folder-like',
  templateUrl: './album-folder-like.page.html',
  styleUrls: ['./album-folder-like.page.scss'],
})
export class AlbumFolderLikePage implements OnInit {

  constructor(public navCtrl:NavController) { }

  gotoSearch(){
    this.navCtrl.navigateForward('/search');
  }
  ngOnInit() {
  }

}
