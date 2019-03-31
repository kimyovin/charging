import { Component, OnInit } from '@angular/core';

import { routerNgProbeToken } from '@angular/router/src/router_module';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-photo-like',
  templateUrl: './photo-like.page.html',
  styleUrls: ['./photo-like.page.scss'],
})
export class PhotoLikePage implements OnInit {

  constructor(public navCtrl:NavController) { }

  gotoSearch(){
    this.navCtrl.navigateForward('/search');
  }

  gotoTab1(){
    this.goBack();
    this.navCtrl.navigateRoot('/tabs');
  }
  goBack(){
    this.navCtrl.pop();

  }

  ngOnInit() {
  }

}
