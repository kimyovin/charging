import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { NavController } from '@ionic/angular';
import { FolderToServerController } from '../http-controller/folderToServer';

@Component({
  selector: 'app-album-folder',
  templateUrl: './album-folder.page.html',
  styleUrls: ['./album-folder.page.scss'],
})
export class AlbumFolderPage implements OnInit {
  folderName = null;
  imgs=[];
  constructor(private router:Router, public navCtrl:NavController,
    private activatedRoute: ActivatedRoute, 
    private folderToServerController: FolderToServerController,
    ) { }

  ngOnInit() {
     this.folderName = (this.activatedRoute.snapshot.paramMap.get('folder'));
     
     this.folderToServerController.getReadOne(this.folderName).subscribe(data=> {
       let items = JSON.parse(JSON.stringify(data));
       items.forEach(item => {
         this.imgs.push(item.photo_path);
       })
     });

  }

  navigate(){
    this.router.navigate(['album-folder-like', this.folderName])  // 앨범 폴더 내에 좋아하는 사진을 보여준다요
  }
  backtoTab2(){
    this.router.navigateByUrl('/tabs/tab2')
  }
  gotoSearch(){
    this.navCtrl.navigateForward('/search');
  }

  

}
