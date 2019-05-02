import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PhotoLibrary, LibraryItem  } from '@ionic-native/photo-library/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HttpClient } from '@angular/common/http';
import { TagToServerController }from'../http-controller/tagToServer'
import { PhotoToServerController }from'../http-controller/photoToServer'
import { FilePath } from '@ionic-native/file-path/ngx';
import { Router } from '@angular/router';
import { resolve } from 'url';
import { reject, async } from 'q';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  imgs=[
  ];  //html에 보여지는 photo array
  

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
  }

  ngOnInit(){
    console.log("I'm in Home ngOninit()");
    this.getLocalphoto().then(items =>{
      console.log("#getLocalphoto[1]: "+items)
      console.log("#getLocalphoto[2]: "+JSON.stringify(items))
      JSON.parse(JSON.stringify(items)).forEach(item => {
        console.log('#getLocalphoto:'+item.path);
        this.encodeBase64ImageTagviaCanvas(item.path).then( base64 =>{
          this.photoToServerController.testimgPro(item.path, base64, item.date);
        })
      })
    });
    this.getRead();
  }

  getLocalphoto(){
    return new Promise((resolve, reject)=> {
      //Get Local imagesr
      this.photoLibrary.getLibrary().subscribe({
        next: (alibrary) => {
          let imgs_0=[];  //처음 DB로 들어가는 photo array
          let newimg=[];  //library가 담길 곳.
          let library = JSON.stringify(alibrary);
          newimg.concat(JSON.parse(library)).forEach((item) =>{
            item.library.forEach((photo)=>{
              let path: string = 'file://'+ photo.id.split(';')[1];
              let date = photo.creationDate.split('T')[0];
              this.photoToServerController.postCreate(path, date).subscribe(data => {
                console.log("##[postCreate in home]: "+JSON.stringify(data));
                JSON.parse(JSON.stringify(data)).forEach(item => {
                imgs_0.push({path: item.photo_path, date: date});
                })
              }, error => {
                console.log("##[postCreate in home Error]: "+JSON.stringify(error));
              })
            })
           
            resolve(imgs_0)
          })
        }
      })
   })
   
  }

  getRead(){
    this.photoToServerController.getRead().subscribe(data => {
      const json = JSON.stringify(data)
      console.log("##subscribe 받음: "+json)
      const items = JSON.parse(json)
      items.forEach(item => {
        console.log('#ToServer_item: '+item.PHOTO_PATH+' /like: '+item.photo_like+' /date: '+item.photo_name);
        this.imgs.push({image: item.PHOTO_PATH, like: item.PHOTO_LIKE, creationDate: item.PHOTO_NAME});
        
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
    const imgObject = JSON.stringify(this.imgs[this.imgs.indexOf(image)]);
    this.router.navigate(['photo-detail', imgObject]);
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
