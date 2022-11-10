import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './homepage/course-detail/course-detail.component';
import { CourseEditComponent } from './homepage/course-edit/course-edit.component';
import { HomepageStartComponent } from './homepage/homepage-start/homepage-start.component';
import { HomepageComponent } from './homepage/homepage.component';
import { IlDetailComponent } from './itch-list/il-detail/il-detail.component';
import { IlEditComponent } from './itch-list/il-edit/il-edit.component';
import { ItchListComponent } from './itch-list/itch-list.component';
import { StartItchListComponent } from './itch-list/start-itch-list/start-itch-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent, children: [
    { path: '', component: HomepageStartComponent },
    { path: 'new', component: CourseEditComponent },
    { path: ':id', component: CourseDetailComponent },
    { path: ':id/edit', component: CourseEditComponent }
  ]},
  { path: 'bucket-list', component: ItchListComponent, children: [
    { path: '', component: StartItchListComponent },
    { path: 'new', component: IlEditComponent },
    { path: ':id', component: IlDetailComponent },
    { path: ':id/edit', component: IlEditComponent }


  ]},
];
    // change itchlist to bucketlist
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
