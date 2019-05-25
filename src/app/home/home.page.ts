import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { PhotoLibrary, LibraryItem  } from '@ionic-native/photo-library/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HttpClient } from '@angular/common/http';
import { TagToServerController }from'../http-controller/tagToServer'
import { PhotoToServerController }from'../http-controller/photoToServer'
import { GoogleVisionApiProvider }from '../http-controller/google-vision-api'
import { FilePath } from '@ionic-native/file-path/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeGeocoder,
  NativeGeocoderReverseResult,
  NativeGeocoderForwardResult,
  NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
  
  private sub1$: any;
  private sub2$: any;
  
  imgs=[
  ];  //html에 보여지는 photo array

  options: NativeGeocoderOptions = {
    useLocale: true, // 설정언어로 보여줌
    maxResults: 5
};

  constructor(public navCtrl: NavController,
     private photoLibrary: PhotoLibrary,
     private plt: Platform,
     private filePath: FilePath,
     private photoViewer: PhotoViewer,
     private http: HttpClient,
     private tagToServerController: TagToServerController,
     private photoToServerController: PhotoToServerController,
     private router: Router,
     private activaedRoute: ActivatedRoute,
     private googleVisionApiProvider: GoogleVisionApiProvider,
     private nativeGeocoder: NativeGeocoder,
     ){
      
  }

  ngOnInit(){

    this.getLocalphoto();    

    this.getRead();

    this.plt.ready().then(() => {
      this.sub1$ = this.plt.pause.subscribe(()=> {
        console.log('****[Home]UserdashbordPage PAUSED****')
      });
      this.sub2$ = this.plt.resume.subscribe(()=> {
        console.log('****[Home]UserdashboardPage RESUMED****')
        this.getLocalphoto();
      });
    })
  }
  
  ngDestroy(){
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }

  getLocalphoto(){
    this.photoLibrary.requestAuthorization().then(()=> {
      this.photoLibrary.getLibrary().subscribe({  //getLocalphoto
        next: (alibrary) => {
          let newimg=[];  //library가 담길 곳.
          this.imgs =[];
          let library = JSON.stringify(alibrary);
          newimg.concat(JSON.parse(library)).forEach((item) =>{
            item.library.forEach((photo)=>{
              let path: string = 'file://'+ photo.id.split(';')[1];
              let date = photo.creationDate.split('T')[0];
              let location="";
              
              // 주소 변환
              if(photo.latitude == 0){  //주소 값이 없을 경우
                this.imgs.push({image: path, like: '0', creationDate: date, creationLocation: location});
                this.photoToServerController.postCreate(path, date, location).subscribe(data => {
                  if(JSON.stringify(data) =='"SUCCESS"'){
                    this.encodeBase64ImageTagviaCanvas(path).then(base64=> {
                      this.googleVisionApiProvider.postGoogleVisionApi(base64).subscribe(data=>{
                        let parse_data = JSON.parse(JSON.stringify(data));
                        this.photoToServerController.testimgPro(path, parse_data);
                      }, err => {
                        console.log('#GoogleVisionApiProvider_Error: '+ JSON.stringify(err))
                      })
                    });
                  }
    
                }, error => {
                  console.log("##[postCreate in home Error]: "+JSON.stringify(error));
                });
              }
              else{ //주소 값이 있을 경우
                this.nativeGeocoder.reverseGeocode(photo.latitude, photo.longitude, this.options)
                .then((result: NativeGeocoderReverseResult[]) => {
                  if(result[0].locality == "")
                    location = result[0].administrativeArea + ' ' + result[0].subLocality;
                  else
                    location = result[0].locality +' ' + result[0].subLocality;
                    
                  this.imgs.push({image: path, like: '0', creationDate: date, creationLocation: location});
                  
                  this.photoToServerController.postCreate(path, date, location).subscribe(data => {
                    if(JSON.stringify(data) =='"SUCCESS"'){
                      this.encodeBase64ImageTagviaCanvas(path).then(base64=> {
                        this.googleVisionApiProvider.postGoogleVisionApi(base64).subscribe(data=>{
                          let parse_data = JSON.parse(JSON.stringify(data));
                          this.photoToServerController.testimgPro(path, parse_data);
                        }, err => {
                          console.log('#GoogleVisionApiProvider_Error: '+ JSON.stringify(err))
                        })
                      });
                    }
      
                  }, error => {
                    console.log("##[postCreate in home Error]: "+JSON.stringify(error));
                  });
              })
              .catch((error: any) => console.log('#getLocalphoto: '+error));
    
              }
             
            })
          });
        }
      });
    })
  }

  getRead(){
    this.photoToServerController.getRead().subscribe(data => {
      const json = JSON.stringify(data)
      const items = JSON.parse(json)
      items.forEach(item => {
        this.imgs[this.imgs.indexOf(item.PHOTO_PATH)].like = item.PHOTO_LIKE;
        
      });
    })
  }

  navigate(){  // 좋아하는 사진 페이지로 이동
    this.navCtrl.navigateForward('/photo-like');
  }

  gotoDetail(image){
    const imgObject = JSON.stringify(this.imgs[this.imgs.indexOf(image)]);
    this.router.navigate(['photo-detail', imgObject]);
  }
  
  gotoSearch(){ // 검색창 페이지로 이동
    this.navCtrl.navigateForward('/search');
  }

  changeLike(selectedImg){  //like: postClickHeart, unlike: postCancelHeart 
    if(selectedImg.like == 1)
      this.photoToServerController.postCancelHeart(selectedImg.image).subscribe(data => {
        console.log('#HEart-Empty : '+data);
      }, error => {
        console.log('#PostCancleHeart Error: '+error);
      });
    else
      this.photoToServerController.postClickHeart(selectedImg.image).subscribe(data => {
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
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        canvas.getContext('2d').drawImage(image, 0, 0);
  
        let uri: string = canvas.toDataURL("image/jpeg");

        uri.split(',')[1];
        resolve(uri.split(',')[1]);
      }
     image.src = url;
    })
  }
  
}
