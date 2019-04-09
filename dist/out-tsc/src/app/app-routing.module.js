import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: './home/home.module#HomePageModule' },
    { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
    { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
    { path: 'album-folder', loadChildren: './album-folder/album-folder.module#AlbumFolderPageModule' },
    { path: 'album-folder-like', loadChildren: './album-folder-like/album-folder-like.module#AlbumFolderLikePageModule' },
    { path: 'photo-detail', loadChildren: './photo-detail/photo-detail.module#PhotoDetailPageModule' },
    { path: 'photo-like', loadChildren: './photo-like/photo-like.module#PhotoLikePageModule' },
    { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
    { path: 'tag-folder', loadChildren: './tag-folder/tag-folder.module#TagFolderPageModule' },
    { path: 'tag-folder-like', loadChildren: './tag-folder-like/tag-folder-like.module#TagFolderLikePageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map