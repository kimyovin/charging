import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { NavController } from '@ionic/angular';
import { TagfolderToServerController } from '../http-controller/tagfolderToServer'

@Component({
  selector: 'app-tag-folder',
  templateUrl: './tag-folder.page.html',
  styleUrls: ['./tag-folder.page.scss'],
})
export class TagFolderPage implements OnInit {
  imgs=[];
  tagName;
  constructor(private router:Router, public navCtrl:NavController,
    private tagfolderToServerController: TagfolderToServerController,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.tagName = JSON.parse(this.activatedRoute.snapshot.paramMap.get('tagName'));
    this.tagfolderToServerController.getReadOne(this.tagName).subscribe(data => {
      let items = JSON.parse(JSON.stringify(data));
      items.forEach(item => {
        this.imgs.push({image: item.photo_path_t, like:item.photo_like, creationDate: item.photo_name, creationLocation: item.photo_location});
      })
    })
  }

  gotoDetail(image){
      const imgObject = JSON.stringify(this.imgs[this.imgs.indexOf(image)]);
      this.router.navigate(['photo-detail', imgObject]);
  }

  gotoTagFolderLike(){
    let tagNameObject = JSON.stringify(this.tagName)
    this.router.navigate(['tag-folder-like', tagNameObject]);
  }
  backtoTab3(){
    this.router.navigateByUrl('/tabs/tab3')
  }
  gotoSearch(){
    this.navCtrl.navigateForward('/search');
  }

 
}
