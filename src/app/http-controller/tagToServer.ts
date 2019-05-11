import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class TagToServerController {
  
  headers= new HttpHeaders();
  constructor(public http: HttpClient) { 
   
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json' );
  }

  postCreate(photoPath, tagName, flag) {

    const httpOptions= { headers: this.headers};

    let postData = {
      "fn":"create",
      "photo_path": photoPath,
      "tag_name": tagName,
      "t_flag": flag
    }
    console.log('##Im in postCreate, photoPath:'+ photoPath+' /tagName: '+tagName)
    return this.http.post(environment.serverURL+"/ptag", postData, httpOptions);

    // let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'});
    // const body = {
    //       "fn":"create",
    //       "photo_path": photoPath,
    //       "tag_name": tagName
    // };
    // // console.log('##base64Image: ' + base64Image);
    // console.log('##photoPath: '+ photoPath+' / tagName: '+tagName);
    // console.log('Im in addTag !!');
    // // return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.googleCloudVisionAPIKey, body);
    // return this.http.post('http://192.198.0.8:9010/ptag', body, { headers: this.headers1});
  }

  postRead(photoPath){
    const httpOptions= { headers: this.headers};
    let postData = {
      "fn":"read",
      "photo_path": photoPath,
    }
    console.log('##Im in postRead ')
    return this.http.post(environment.serverURL+"/ptag", postData, httpOptions);
      
  }

  postDel(photoPath, tagName){
    const httpOptions= { headers: this.headers};
    let postData = {
      "fn":"del",
      "photo_path": photoPath,
      "tag_name": tagName,
    }
    console.log('##Im in postDel, photoPath:'+ photoPath+' /tagName: '+tagName)
    return this.http.post(environment.serverURL+"/ptag", postData, httpOptions);
  }

  postUp(photoPath, tagName, newtagName){
    const httpOptions= { headers: this.headers};
    let postData = {
      "fn":"up",
      "photo_path": photoPath,
      "tag_name": tagName,
      "new_tag_name": newtagName,
    }
    console.log('##Im in postUp, photoPath:'+ photoPath+' /tagName: '+tagName + ' /newtagName: '+newtagName)
    return this.http.post(environment.serverURL+"/ptag", postData, httpOptions);
  }
  
}
