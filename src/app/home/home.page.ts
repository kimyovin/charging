import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PhotoLibrary, LibraryItem  } from '@ionic-native/photo-library/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import * as cordovaGallery from 'cordova-gallery-access'; 
import { HttpClient } from '@angular/common/http';
import { TagToServerController }from'../http-controller/tagToServer'
import { PhotoToServerController }from'../http-controller/photoToServer'
import { FilePath } from '@ionic-native/file-path/ngx';
import { DomSanitizer } from '@angular/platform-browser';

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

     private sanitizer: DomSanitizer,
     ){
      console.log('#home들어감');
      
        this.photoLibrary.getLibrary().subscribe({
          next: (alibrary) => {
            console.log('#[Library]alibrary : '+alibrary);
            let library = JSON.stringify(alibrary);
            console.log('#[Library]a : '+library);
            
            this.newimg.concat(JSON.parse(library)).forEach(item =>{
              let path:string = item.library[0].id;
              console.log('#path_item.id:'+path);
              if (item.id.split(';').length > 0 && path !== undefined) {
                console.log('#path is not undefined');
                path= 'file://' + path.split(';')[1];
              } else{ console.log('#path is undefined');}
              this.imgs.push({image: path, like: null});
              console.log('#newimg에서 path: '+ path);
              
            })

            // this.printArray( this.imgs.concat(JSON.parse(library)));
            // this.imgs.forEach(function(libraryItem) {
            //   console.log("#libraryItem.id: "+libraryItem.library[0].id);          // ID of the photo
            //   console.log("#libraryItem.photoURL: "+libraryItem.library[0].photoURL);    // Cross-platform access to photo
            //   console.log("#libraryItem.thumbnailURL: "+libraryItem.library[0].thumbnailURL);// Cross-platform access to thumbnail
            //   // console.log("#libraryItem.fileName: "+libraryItem.library[0].fileName);
            //   // console.log("#libraryItem.width: "+libraryItem.library[0].width);
            //   // console.log("#libraryItem.height: "+libraryItem.library[0].height);
            //   // console.log("#libraryItem.creationDate: "+libraryItem.library[0].creationDate);
            //   // console.log("#libraryItem.latitude: "+libraryItem.library[0].latitude);
            //   // console.log("#libraryItem.longitude: "+libraryItem.library[0].longitude);
            //   // console.log("#libraryItem.albumIds: "+libraryItem.library[0].albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
            // });

          //   this.imgs.push({image: alibrary.photoURL, like: null});
          //     console.log('#pushing... photoURL: '+photo.photoURL);
          // this.imgs.forEach(img=>{
          //   console.log('##image: '+img.image);
          // })
            
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

    /***Using cordovaGallery plugin***/
    //   cordovaGallery.load({ count: 20, }).then(items => {
    //     items.forEach(item => {
    //       this.imgs.push('file://'+item.thumbnail);
    //       console.log('##item.thumbnail : '+item.thumbnail);
          
    //     });
    // }).catch(e => console.error('#cordovaGallery Error'+e));
    this.imgs.forEach(image=>{
      console.log('#img: '+ image);
    })
  }
  transform(url: string) {
    if (url != null) {
      return url.startsWith('cdvphotolibrary://') ? this.sanitizer.bypassSecurityTrustUrl(url) : url;
    }
  }

  printArray(me)
  {
    console.log("#[Library] me: "+me);
    console.log("#[Library] me.stringify: "+JSON.stringify(me));
    me.forEach(function(libraryItem) {
      console.log("#libraryItem.id: "+libraryItem.library[0].id);          // ID of the photo
      console.log("#libraryItem.photoURL: "+libraryItem.library[0].photoURL);    // Cross-platform access to photo
      console.log("#libraryItem.thumbnailURL: "+libraryItem.library[0].thumbnailURL);// Cross-platform access to thumbnail
      console.log("#libraryItem.fileName: "+libraryItem.library[0].fileName);
      console.log("#libraryItem.width: "+libraryItem.library[0].width);
      console.log("#libraryItem.height: "+libraryItem.library[0].height);
      console.log("#libraryItem.creationDate: "+libraryItem.library[0].creationDate);
      console.log("#libraryItem.latitude: "+libraryItem.library[0].latitude);
      console.log("#libraryItem.longitude: "+libraryItem.library[0].longitude);
      console.log("#libraryItem.albumIds: "+libraryItem.library[0].albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
    });
  }

  navigate(){  // 좋아하는 사진 페이지로 이동
  //  this.navCtrl.navigateForward('/photo-like');
  //     this.http.get('http://1.224.52.232:9010/tags?fn=r&photo_path=1.jpg').subscribe((response) => {
  //      console.log(response);
  //      const data = JSON.stringify(response);
  //       const json = JSON.parse(data);
  //       console.log(json[0].tag_name);
  //       console.log(json[1].tag_name);
  //     });
  }

  gotoDetail(){
    this.navCtrl.navigateForward('/photo-detail');
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
