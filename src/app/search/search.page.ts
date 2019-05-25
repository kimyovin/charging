import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SearchResultToServerController } from '../http-controller/searchresultToServer'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  queryResults=[
  ];

  keyword: any;
  constructor(public navCtrl:NavController,
    private searchresultToServerController: SearchResultToServerController,
    private router: Router,
    ) { }
  getresult(){
    this.queryResults=[];
    this.searchresultToServerController.getRead(this.keyword).subscribe(data =>{
      const json = JSON.stringify(data)
      const items = JSON.parse(json)
      items.forEach(item => {
        this.queryResults.push({image: item.photo_path, creationDate:item.photo_name, like: item.photo_like, creationLocation:item.photo_location});
      });
    }, error => {
      console.log('##[Search Error]:queryResults'+error);
    });
  }
  gotoDetail(image){
    const imgPath = JSON.stringify(this.queryResults[this.queryResults.indexOf(image)]);
    this.router.navigate(['photo-detail', imgPath]);
  }

  gotoBack(){
    this.navCtrl.pop();
  }

  ngOnInit() {
  }

}
