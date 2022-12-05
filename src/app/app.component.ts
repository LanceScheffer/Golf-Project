import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Course } from './homepage/course.model';
import { DataStorageService } from './shared/data-storage.service';
import { HomepageService } from './homepage/homepage.service';
import { ItchListService } from './itch-list/itch-list.service';
import { Itchlist } from './itch-list/itch-list.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  // I might need some sort of Input here?
  title = 'personal-project';
  // attaching a property to my Course Array and Bucket List array.
   homeCourses: Course[] = [];
   akaBucketCourses: Itchlist[] = [];

    //  giving DataStorageService a property to use inside OnInit
    constructor(private elementRef: ElementRef,
                private dataStorageService: DataStorageService,
                private homePageService: HomepageService,
                private itchListService: ItchListService,
                private authService: AuthService

      ) {}

    ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = 'rgb(246, 233, 216)';
};

  ngOnInit() {
     this.authService.autoLogin();

     this.dataStorageService.fetchData();

    this.homePageService.coursesChanged.subscribe((updatedCourseList: Course[]) => {
      this.homeCourses = updatedCourseList;
      console.log(this.homeCourses);

    });


      this.itchListService.ilCoursesChanged.subscribe((bucketCourseList: Itchlist[]) => {
        this.akaBucketCourses = bucketCourseList;
    });
  };
}

// constructor(private elementRef: ElementRef) {}
// ngAfterViewInit() {
//     this.elementRef.nativeElement.ownerDocument
//       .body.style.backgroundColor = 'black';
// }
