import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute} from '@angular/router'
import { FolderToServerController } from '../http-controller/folderToServer'

@Component({
  selector: 'app-album-folder-like',
  templateUrl: './album-folder-like.page.html',
  styleUrls: ['./album-folder-like.page.scss'],
})
export class AlbumFolderLikePage implements OnInit {
  folderName;
  imgs=[
  ];
  constructor(public navCtrl:NavController,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private folderToServerContoller: FolderToServerController,
    ) { }

  ngOnInit() {
    this.folderName = this.activatedRouter.snapshot.paramMap.get('folder');
    this.folderToServerContoller.getReadOneLike(this.folderName).subscribe(data => {
      let items = JSON.parse(JSON.stringify(data));
      items.forEach(item =>
        this.imgs.push(item.photo_path)
        )
    });
  
  }
  gotoback(){
    this.navCtrl.pop();
  }
  
  gotoSearch(){
    this.navCtrl.navigateForward('/search');
  }
  
}
