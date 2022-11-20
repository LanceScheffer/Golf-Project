import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItchListService } from '../itch-list.service';
@Component({
  selector: 'app-il-edit',
  templateUrl: './il-edit.component.html',
  styleUrls: ['./il-edit.component.css']
})
export class IlEditComponent implements OnInit {
  id: number;
  editMode = false;
  ilCourseForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private itchListService: ItchListService,
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
      this.itchListService.updateIlCourse(this.id, this.ilCourseForm.value)
    } else {
      this.itchListService.addIlCourse(this.ilCourseForm.value)
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  private initForm() {
    let ilCourseName = '';
    let ilLocation = '';
    let ilImagePath = '';
    let ilDescription = '';

    if (this.editMode) {
      const ilCourse = this.itchListService.getIlCourse(this.id);
      ilCourseName = ilCourse.name;
      ilLocation = ilCourse.location;
      ilImagePath = ilCourse.imagePath;
      ilDescription = ilCourse.description;
    }

    this.ilCourseForm = new FormGroup({
      'name': new FormControl(ilCourseName, Validators.required),
      'location': new FormControl(ilLocation, Validators.required),
      'imagePath': new FormControl(ilImagePath),
      'description': new FormControl(ilDescription)
    })
  }

}
