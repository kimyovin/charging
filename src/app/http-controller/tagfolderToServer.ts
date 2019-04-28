import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class TagfolderToServerController{

    headers= new HttpHeaders();
    constructor(public http: HttpClient) { 
      this.headers.append("Accept", 'application/json');
      this.headers.append('Content-Type', 'application/json' );
    }

    getRead(){
      return this.http.get(environment.serverURL+"/gtagFol?fn=read")
    }

    getReadOne(tagName){
        const httpOptions= {headers: this.headers}
        let body={
          "fn": "readone",
          "tag_name": tagName
        }
        this.http.post(environment.serverURL+"/gtagFol", body, httpOptions)
          .subscribe(data =>{
            console.log(data['_body']);
          }, error => {
            console.log(error);
          });
    }

    getReadOneLike(tagName){
        const httpOptions= {headers: this.headers}
        let body={
          "fn": "readonelike",
          "tag_name": tagName
        }
        this.http.post(environment.serverURL+"/gtagFol", body, httpOptions)
          .subscribe(data =>{
            console.log(data['_body']);
          }, error => {
            console.log(error);
          });
    }
}
