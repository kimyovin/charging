import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable()
export class PhotoToServerController {

  headers= new HttpHeaders();
  constructor(public http: HttpClient) { 
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json' );
  }

  testimgPro(photoPath, vision_result){
    const httpOptions= {headers: this.headers}
    let body={
      "photo_path": photoPath,
      "result": vision_result
    }
    this.http.post(environment.serverURL+"/imgPro", body, httpOptions).subscribe(data => {
      console.log('##[TestimgPro]'+JSON.stringify(data));
     }, error => {
      console.log('##[Error] TestimgPro : '+JSON.stringify(error));
    });
  }

  postCreate(photoPath, photoName, photoLocation) {
    const httpOptions= { headers: this.headers};
    let body = {
      "fn": "create",
      "photo_path": photoPath,
      "photo_name": photoName,
      "photo_location": photoLocation
    }
    console.log('##Im in postCreate')
    return this.http.post(environment.serverURL+"/pphoto", body, httpOptions)
  }

  postClickHeart(photoPath) {
    const httpOptions= { headers: this.headers};
    let body = {
      "fn": "clickHeart",
      "photo_path": photoPath,
    }
    console.log("#Im in postcLICkHeart");
    return this.http.post(environment.serverURL+"/pphoto", body, httpOptions);
  }

  postCancelHeart(photoPath) {
    const httpOptions= { headers: this.headers};
    let body = {
      "fn": "cancelHeart",
      "photo_path": photoPath,
    }
    console.log("#Im in postcANCELkHeart");
    return this.http.post(environment.serverURL+"/pphoto", body, httpOptions);
  }

/*get*/ 
  getRead(){
   // this.http.get(environment.serverURL)  //이 코드를 tab1에 그냥 넣을까 함.
    console.log('##Im in getRead')
    return this.http.get(environment.serverURL+'/gphoto?fn=read');
  }

  getReadLike(){
    return this.http.get(environment.serverURL+'/gphoto?fn=readlike');
  }
}