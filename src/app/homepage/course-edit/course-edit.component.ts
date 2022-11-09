import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HomepageService } from '../homepage.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  id: number;
  editMode = false;
  courseForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private homepageService: HomepageService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();

        }
      )
  }

  onSubmit() {
    if (this.editMode) {
      this.homepageService.updateCourse(this.id, this.courseForm.value)
    } else {
      this.homepageService.addCourse(this.courseForm.value)
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let courseName = '';
    let courseLocation = '';
    let courseDate = '';
    let coursePar = '';
    let courseScore = '';
    let courseImagePath = '';
    let courseDescription = '';

    if (this.editMode) {
      const course = this.homepageService.getCourse(this.id);
      courseName = course.name;
      courseLocation = course.location;
      courseDate = course.date;
      coursePar = course.par;
      courseScore = course.score;
      courseImagePath = course.imagePath;
      courseDescription = course.description;
    }

    this.courseForm = new FormGroup({
      'name': new FormControl(courseName, Validators.required),
      'location': new FormControl(courseLocation),
      'date': new FormControl(courseDate, Validators.required),
      'par': new FormControl(coursePar, Validators.required),
      'score': new FormControl(courseScore, Validators.required),
      'imagePath': new FormControl(courseImagePath),
      'description': new FormControl(courseDescription)
    })
  }

}
