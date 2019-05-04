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
  imgs=['assets/imgs/1.jpg', 'assets/imgs/2.jpg', 'assets/imgs/3.jpg', 'assets/imgs/4.jpg', 'assets/imgs/5.jpg',
    'assets/imgs/6.jpg', 'assets/imgs/7.jpg',
  ];
  constructor(public navCtrl:NavController,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private folderToServerContoller: FolderToServerController,
    ) { }

  ngOnInit() {
    this.folderName = this.activatedRouter.snapshot.paramMap.get('folder');
    console.log('#In album-folder-like folderName: '+ this.folderName);
    this.folderToServerContoller.getReadOneLike(this.folderName).subscribe(data => {
      console.log('#album-folder-like_getREadOneLike: '+ JSON.stringify(data))
      let items = JSON.parse(JSON.stringify(data));
      items.forEach(item =>
        this.imgs.push(item.photo_path)
        )
    });
  
  }

  
  gotoSearch(){
    this.navCtrl.navigateForward('/search');
  }
  
}
