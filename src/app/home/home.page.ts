import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PhotoLibrary, LibraryItem  } from '@ionic-native/photo-library/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import * as cordovaGallery from 'cordova-gallery-access'; 
import { HttpClient } from '@angular/common/http';
import { TagToServerController }from'../http-controller/tagToServer'
import { PhotoToServerController }from'../http-controller/photoToServer'
import { FilePath } from '@ionic-native/file-path/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  imgs=[];

  newimg=[];  //library가 담길 곳.
  constructor(public navCtrl: NavController,
     private photoLibrary: PhotoLibrary,
     private filePath: FilePath,
     private photoViewer: PhotoViewer,
     private http: HttpClient,
     private tagToServerController: TagToServerController,
     private photoToServerController: PhotoToServerController,
     private router: Router,

     ){
      console.log('#home들어감');
      
        this.photoLibrary.getLibrary().subscribe({
          next: (alibrary) => {
            console.log('#[Library]alibrary : '+alibrary);
            let library = JSON.stringify(alibrary);
            console.log('#[Library]a : '+library);
            
            this.newimg.concat(JSON.parse(library)).forEach((item) =>{
              item.library.forEach((photo, i)=>{
                let path:string = 'file://'+ photo.id.split(';')[1];
                let date = photo.creationDate
                this.imgs.push({image: path, like: null, creationDate: date});
                console.log('#newimg에서 path '+i+' : '+date+' / ' + path);
              })
            })

            this.imgs.forEach(img =>{
              this.encodeBase64ImageTagviaCanvas(img.image).then(base64=>{
                console.log('##base64: '+ base64);
                this.photoToServerController.testimgPro(img.image, base64, img.creationDate);
              })
            });
          },
          error: err => { console.log('#library: could not get photos: '+ err); },
          complete: () => { console.log('#library: done getting photos'); }
        });
            
      photoToServerController.getRead().subscribe(data => {
        console.log("##subscribe 받음: "+data)
        const json = JSON.stringify(data)
        const items = JSON.parse(json)
        items.forEach(item => {
         this.imgs.push({image: item.photo_path, like: item.photo_like});
          console.log('#ToServer_item: '+item.photo_path);
        });
      })
  }

  navigate(){  // 좋아하는 사진 페이지로 이동
    this.navCtrl.navigateForward('/photo-like');
  //     this.http.get('http://1.224.52.232:9010/tags?fn=r&photo_path=1.jpg').subscribe((response) => {
  //      console.log(response);
  //      const data = JSON.stringify(response);
  //       const json = JSON.parse(data);
  //       console.log(json[0].tag_name);
  //       console.log(json[1].tag_name);
  //     });
  }

  gotoDetail(image){
    const imgPath = JSON.stringify(this.imgs[this.imgs.indexOf(image)]);
    this.router.navigate(['photo-detail', imgPath]);
  }
  
  gotoSearch(){ // 검색창 페이지로 이동
    this.navCtrl.navigateForward('/search');
  }

  changeLike(selectedImg){  //like: postClickHeart, unlike: postCancelHeart 
    let postPath= selectedImg.image.replace('file://', '');
    console.log("postPath: "+ postPath+" | selectedImg.like: "+selectedImg.like);
    if(selectedImg.like == 1)
      this.photoToServerController.postCancelHeart(postPath).subscribe(data => {
        console.log('#HEart-Empty : '+data);
      }, error => {
        console.log('#PostCancleHeart Error: '+error);
      });
    else
      this.photoToServerController.postClickHeart(postPath).subscribe(data => {
        console.log('#Heart: '+data);
       }, error => {
        console.log('#PostClickHeart Error: '+error);
      });
    
    this.imgs[this.imgs.indexOf(selectedImg)].like = (selectedImg.like=='1')?null:'1';
  }

  encodeBase64ImageTagviaCanvas (url) {
    return new Promise((resolve, reject) => {
      let image = new Image()
      image.onload = () => {
         let canvas = document.createElement('canvas');
        // or 'width' if you want a special/scaled size
        canvas.width = image.naturalWidth;
        // or 'height' if you want a special/scaled size
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
  
        let uri: string = canvas.toDataURL("image/jpeg");

        console.log("uri: "+uri);
        // uri.replace("data:image/jpeg;base64,", "");
        console.log("#uri: "+uri);
        resolve(uri);
      }
     image.src = url;
    })
  }
  
}
