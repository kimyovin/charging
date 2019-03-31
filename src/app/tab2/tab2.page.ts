import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor(private router:Router, public navCtrl:NavController) { }

  ngOnInit() {
  }

  hiddenFlag:boolean=false;
  hideButton(){
    this.hiddenFlag=true;
  }
  showButton(){
    this.hiddenFlag=false;
  }

  gotoSearch(){ // 검색창 페이지로 이동
    this.navCtrl.navigateForward('/search');
  }

  gotoFolder(){ 
    this.navCtrl.navigateForward('/album-folder');
  }



  navigate(){
    this.router.navigateByUrl('/album-folder')
  }
}
