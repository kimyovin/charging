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
      console.log('#im in constructor at album-folder')
     }

  ngOnInit() {
     console.log('#Im in ngOnInit at album-folder')
     this.folderName = (this.activatedRoute.snapshot.paramMap.get('folder'));
     
     this.getFolderphoto();

     this.plt.ready().then(() => {
      this.sub1$ = this.plt.pause.subscribe(()=> {
        console.log('****[Album-folder]UserdashbordPage PAUSED****')
      });
      this.sub2$ = this.plt.resume.subscribe(()=> {
        console.log('****[Album-folder]UserdashboardPage RESUMED****')
        this.getFolderphoto();
      });
    })
  }

  ngDestroy(){
    console.log('#[Album-folder] Destoryed...')
    this.sub1$.unsubscribe();
    this.sub2$.unsubscribe();
  }

  getFolderphoto(){
    console.log('##[GetFolderPhoto] Starting...');
    this.folderToServerController.getReadOne(this.folderName).subscribe(data=> {
      let items = JSON.parse(JSON.stringify(data));
      items.forEach(item => {
        this.imgs.push({image: item.photo_path, like:item.photo_like, creationDate: item.photo_name, creationLocation: item.photo_location});
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
 
  gotoDetail(image){
    const imgObject = JSON.stringify(this.imgs[this.imgs.indexOf(image)]);
    this.router.navigate(['photo-detail', imgObject]);
}
  addPhotos(){
    this.router.navigate(['select-image', this.folderName]);  
  }

}
