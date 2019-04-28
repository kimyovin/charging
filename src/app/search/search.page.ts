import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { SearchResultToServerController } from '../http-controller/searchresultToServer'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  queryResults=[];

  constructor(public navCtrl:NavController,
    private searchresultToServerController: SearchResultToServerController
    ) { }

  getresult(){
    let keyword = document.getElementById('keyword');
    console.log("keyword: "+keyword);
    this.queryResults=[];
    this.searchresultToServerController.getRead(keyword).subscribe(data =>{
      const json = JSON.stringify(data)
      const items = JSON.parse(json)
      items.forEach(item => {
        this.queryResults.push({photoPath: item.photo_path_t});
        console.log("##[Search Result]item.photo_path_t: "+item.photo_path_t)
      });
      console.log('##[Search]queryResults: '+data);
    }, error => {
      console.log('##[Search Error]:queryResults'+error);
    });
  }


  gotoBack(){
    this.navCtrl.pop();
  }

  ngOnInit() {
  }

}
