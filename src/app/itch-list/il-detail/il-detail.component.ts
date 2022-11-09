import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Itchlist } from '../itch-list.model';
import { ItchListService } from '../itch-list.service';

@Component({
  selector: 'app-il-detail',
  templateUrl: './il-detail.component.html',
  styleUrls: ['./il-detail.component.css']
})
export class IlDetailComponent implements OnInit {
   itchListCourse: Itchlist
   id: number;

  constructor(private itchListService: ItchListService,
              private route: ActivatedRoute,
              private router: Router) {

              }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.itchListCourse = this.itchListService.getIlCourse(this.id)
        }

      );
  }
  onEditCourse() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteCourse() {
    this.itchListService.deleteCourse(this.id);
    this.router.navigate(['/itchlist'], {relativeTo: this.route});
  }
}
