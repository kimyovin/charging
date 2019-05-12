import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagfolderToServerController } from '../http-controller/tagfolderToServer';
@Component({
  selector: 'app-tag-folder-like',
  templateUrl: './tag-folder-like.page.html',
  styleUrls: ['./tag-folder-like.page.scss'],
})
export class TagFolderLikePage implements OnInit {

  tagName;
  imgs=[];
  constructor(private activatedRoute: ActivatedRoute,
      private tagfolderToServerController: TagfolderToServerController,
      private router: Router,
    ) { }

  ngOnInit() {
    this.tagName=JSON.parse(this.activatedRoute.snapshot.paramMap.get('tagName'));
    console.log('#tag-folder-like: '+ this.tagName)
    this.tagfolderToServerController.getReadOneLike(this.tagName).subscribe(data =>{
      console.log('#tag-folder-like_getReadOneLike: '+JSON.stringify(data))
      let items = JSON.parse(JSON.stringify(data));
      items.forEach(item => {
        this.imgs.push({image: item.photo_path_t, creationDate: item.photo_name});
      })
    })
  }

  gotoDetail(image){
    const imgObject = JSON.stringify(this.imgs[this.imgs.indexOf(image)]);
    this.router.navigate(['photo-detail', imgObject]);
}

}
