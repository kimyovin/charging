import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PhotoToServerController } from '../http-controller/photoToServer'

@Component({
  selector: 'app-photo-like',
  templateUrl: './photo-like.page.html',
  styleUrls: ['./photo-like.page.scss'],
})
export class PhotoLikePage implements OnInit {
  imgs=[];
  constructor(public navCtrl:NavController,
    private photoToServerController: PhotoToServerController,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getReadLike();
  }

  getReadLike(){
    this.photoToServerController.getReadLike().subscribe(data => {
      let items = JSON.parse(JSON.stringify(data));
      items.forEach(item => {
        this.imgs.push({image: item.photo_path, like: item.photo_like, creationDate: item.photo_name, creationLocation: item.photo_location});
      })
    })
  }

  gotoDetail(image){
    const imgObject = JSON.stringify(this.imgs[this.imgs.indexOf(image)]);
    this.router.navigate(['photo-detail', imgObject]);
  }
  

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

}
