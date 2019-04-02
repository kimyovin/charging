import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import * as cordovaGallery from 'cordova-gallery-access'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  imgs=['assets/imgs/1.jpg', 'assets/imgs/2.jpg','assets/imgs/3.jpg','assets/imgs/4.jpg',
  'assets/imgs/5.jpg','assets/imgs/6.jpg',];

  constructor(public navCtrl: NavController,
     private photoLibrary: PhotoLibrary,
     private photoViewer: PhotoViewer,
     ){
      console.log('#home들어감');

    /***Using cordovaGallery plugin***/
    //   cordovaGallery.load({ count: 10, }).then(items => {
       
    //     items.forEach(item => {
    //       this.imgs.push('file://'+item.thumbnail);
    //       console.log("#Item.thumbnail: "+item.thumbnail);
        
    //     });
    
    // }).catch(e => console.error('#cordovaGallery Error'+e));

  }

  navigate(){  // 좋아하는 사진 페이지로 이동
    this.navCtrl.navigateForward('/photo-like')
  }

  // photo="assets/image/img1.jpg";
  // gotoDetail(){
  //   this.navCtrl.navigateForward(`/photo-detail/${this.photo}`);
  // }

  gotoDetail(){
    this.navCtrl.navigateForward('/photo-detail', );
  }

  
  gotoSearch(){ // 검색창 페이지로 이동
    this.navCtrl.navigateForward('/search');
  }
  
}
