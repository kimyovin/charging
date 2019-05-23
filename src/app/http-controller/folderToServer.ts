import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class FolderToServerController{

    headers= new HttpHeaders();
    constructor(public http: HttpClient) { 
      this.headers.append("Accept", 'application/json');
      this.headers.append('Content-Type', 'application/json' );
    }

    postCreate(folderName, photoPath, mainPhoto){
      const httpOptions= {headers: this.headers}
      let body={
        "fn": "create",
        "folder_name": folderName,
        "photo_path": photoPath,
        "main_photo": mainPhoto,
      }
      console.log('#Im in postCreate, folderName: '+folderName+' /photoPath: '+photoPath);
      return this.http.post(environment.serverURL+"/pfolder", body, httpOptions);
        
    }

    postAdd(folderName, photoPath){
      const httpOptions={headers: this.headers};
      let body={
        "fn": "add",
        "folder_name": folderName,
        "photo_path": photoPath,
      };
      this.http.post(environment.serverURL+"/pfolder", body, httpOptions)
        .subscribe(data =>{
          console.log('#/pfolder postAdd: ' + JSON.stringify(data));
        }, error => {
          console.log('#[Error]/pfolder postAdd: ' + error);
        });
    }

/* get */
    getDel(folderName){
    
      return this.http.get(environment.serverURL+"/gfolder?fn=del&folder_name="+folderName)
    }
    
    getUp(folderName, newfolderName){
     
      return this.http.get(environment.serverURL+"/gfolder?fn=up&folder_name="+folderName+"&new_folder_name="+newfolderName)
    }
    
    getRead(){
      console.log('##Im in getRead')
      return this.http.get(environment.serverURL+"/gfolder?fn=read")
    }

    getReadOne(folderName){
      return this.http.get(environment.serverURL+"/gfolder?fn=readone&folder_name="+folderName)
    }

    getReadOneLike(folderName){
      return this.http.get(environment.serverURL+"/gfolder?fn=readonelike&folder_name="+folderName)
    }



}
