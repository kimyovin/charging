import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchResultToServerController{

    constructor(public http: HttpClient) { 
    }

    getRead(tag){
      
      return this.http.get(environment.serverURL+"/search?tag="+tag)
    }
}