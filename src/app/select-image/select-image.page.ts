import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { FolderToServerController } from '../http-controller/folderToServer';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.page.html',
  styleUrls: ['./select-image.page.scss'],
})
export class SelectImagePage implements OnInit {
  imgs=[];
  selectedimgs_array=[];
  folderName;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private photoLibrary: PhotoLibrary,
    private folderToServerController: FolderToServerController,
  ) { }

  ngOnInit() {
    this.folderName = (this.activatedRoute.snapshot.paramMap.get('folder'));
    let newimg=[];  //library가 담길 곳.
    this.photoLibrary.requestAuthorization().then(()=> {
      this.photoLibrary.getLibrary().subscribe({
        next: (alibrary)=>{

          newimg.concat(JSON.parse(JSON.stringify(alibrary))).forEach(item => {
            item.library.forEach(photo => {
              let path: string = 'file://'+ photo.id.split(';')[1];
              this.imgs.push({image: path});
            })
          });

        }
      })
    });

  }

  selectedImg(img){
    document.getElementById(img.image).style.opacity = '0.5';
    document.getElementById(img.image).style.background = '#6696ff'
    this.selectedimgs_array.push(img.image);
  }
  gotoback(){
    this.router.navigate(['album-folder', this.folderName])
  }
  submit(name){
    this.selectedimgs_array.forEach(path =>{
      this.folderToServerController.postAdd(this.folderName, path);
    });
    this.router.navigate(['album-folder', name]);
  
  }
}
