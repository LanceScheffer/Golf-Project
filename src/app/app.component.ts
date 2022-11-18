import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Course } from './homepage/course.model';
import { DataStorageService } from './shared/data-storage.service';
import { HomepageService } from './homepage/homepage.service';
import { ItchListService } from './itch-list/itch-list.service';
import { Itchlist } from './itch-list/itch-list.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'personal-project';
  // attaching a property to my Course Array and Bucket List array.
   homeCourses: Course[] = [];
   akaBucketCourses: Itchlist[] = [];

    //  giving DataStorageService a property to use inside OnInit
    constructor(private elementRef: ElementRef,
                private dataStorageService: DataStorageService,
                private homePageService: HomepageService,
                private itchListService: ItchListService

      ) {}

    ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = 'rgb(246, 233, 216)';
};

// Upon Initialization we use these methods from the dataStorageService to fetch our data.
  ngOnInit() {
     this.dataStorageService.fetchHomeData().subscribe();
     this.dataStorageService.fetchBucketList().subscribe();

    this.homePageService.coursesChanged.subscribe((updatedCourseList: Course[]) => {
      this.homeCourses = updatedCourseList;
    });

      this.itchListService.ilCoursesChanged.subscribe((bucketCourseList: Itchlist[]) => {
        this.akaBucketCourses = bucketCourseList;

    });
  };
}

