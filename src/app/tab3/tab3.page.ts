import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor(private router:Router, public navCtrl: NavController) { }

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
