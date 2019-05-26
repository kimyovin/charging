import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { FolderToServerController } from '../http-controller/folderToServer';
import { FilePath } from '@ionic-native/file-path/ngx'

@Component({
  selector: 'app-album-folder',
  templateUrl: './album-folder.page.html',
  styleUrls: ['./album-folder.page.scss'],
})
export class AlbumFolderPage implements OnInit {
  folderName = null;
  imgs=[
  ];

  private sub1$: any;
  private sub2$: any;
  constructor(private router:Router, public navCtrl:NavController,
    private activatedRoute: ActivatedRoute, 
    private folderToServerController: FolderToServerController,
    private plt: Platform,
    private filePath: FilePath,
    ) {
     }

  ngOnInit() {
     this.folderName = (this.activatedRoute.snapshot.paramMap.get('folder'));
  }

  ionViewWillEnter() {
    this.getFolderphoto();
  }

  getFolderphoto(){
    this.imgs=[];
    this.folderToServerController.getReadOne(this.folderName).subscribe(data=> {
      let items = JSON.parse(JSON.stringify(data));
      items.forEach(item => {
        this.imgs.push({image: item.photo_path, like:item.photo_like, creationDate: item.photo_name, creationLocation: item.photo_location});
      })
    });
  }

  navigate(){
    this.router.navigate(['album-folder-like', this.folderName])
  }
  backtoTab2(){
    this.router.navigateByUrl('/tabs/tab2')
  }
  gotoSearch(){
    this.navCtrl.navigateForward('/search');
  }
 
  gotoDetail(image){
    const imgObject = JSON.stringify(this.imgs[this.imgs.indexOf(image)]);
    this.router.navigate(['photo-detail', imgObject]);
}
  addPhotos(){
    this.router.navigate(['select-image', this.folderName]);  
  }

}
