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
        return this.http.get(environment.serverURL+"/gtagFol?fn=readone&tag_name="+tagName);
    }

    getReadOneLike(tagName){
        return this.http.get(environment.serverURL+"/gtagFol?fn=readonelike&tag_name="+tagName)
    }
}
