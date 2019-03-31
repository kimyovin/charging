import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tag-folder',
  templateUrl: './tag-folder.page.html',
  styleUrls: ['./tag-folder.page.scss'],
})
export class TagFolderPage implements OnInit {

  constructor(private router:Router, public navCtrl:NavController) { }

  backtoTab3(){
    this.router.navigateByUrl('/tabs/tab3')
  }
  gotoSearch(){
    this.navCtrl.navigateForward('/search');
  }

  ngOnInit() {
  }

}
