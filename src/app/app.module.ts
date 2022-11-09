import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CourseListComponent } from './homepage/course-list/course-list.component';
import { CourseDetailComponent } from './homepage/course-detail/course-detail.component';
import { CourseItemComponent } from './homepage/course-list/course-item/course-item.component';
import { ItchListComponent } from './itch-list/itch-list.component';
import { IlGroupComponent } from './itch-list/il-group/il-group.component';
import { IlDetailComponent } from './itch-list/il-detail/il-detail.component';
import { IlItemComponent } from './itch-list/il-item/il-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { HomepageStartComponent } from './homepage/homepage-start/homepage-start.component';
import { StartItchListComponent } from './itch-list/start-itch-list/start-itch-list.component';
import { CourseEditComponent } from './homepage/course-edit/course-edit.component';
import { IlEditComponent } from './itch-list/il-edit/il-edit.component';
import { HomepageService } from './homepage/homepage.service';
import { ItchListService } from './itch-list/itch-list.service';
import { DataStorageService } from './shared/data-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    CourseListComponent,
    CourseDetailComponent,
    CourseItemComponent,
    ItchListComponent,
    IlGroupComponent,
    IlDetailComponent,
    IlItemComponent,
    DropdownDirective,
    HomepageStartComponent,
    StartItchListComponent,
    CourseEditComponent,
    IlEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

  ],
  providers: [HomepageService, ItchListService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
