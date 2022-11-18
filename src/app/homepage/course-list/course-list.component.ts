import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from '../course.model';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Course[];
  subscription: Subscription;

  constructor(private homepageService: HomepageService,
              private router: Router,
              private route: ActivatedRoute) {

              }

  ngOnInit(): void {
    this.courses = this.homepageService.getCourses();
    this.subscription = this.homepageService.coursesChanged
      .subscribe(
        (courses:Course[]) => {
          this.courses = courses;
        }
      );
  }

  onNewCourse() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
