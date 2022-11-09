import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Course } from '../course.model';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  id: number;

  constructor(private homepageService: HomepageService,
              private route: ActivatedRoute,
              private router: Router) {

               }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.course = this.homepageService.getCourse(this.id)
        }
      );
  }
  onEditCourse() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCourse() {
    this.homepageService.deleteCourse(this.id);
    this.router.navigate(['/homepage'], {relativeTo: this.route})
  }
}
