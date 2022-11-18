import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Itchlist } from '../itch-list.model';
import { ItchListService } from '../itch-list.service';

@Component({
  selector: 'app-il-group',
  templateUrl: './il-group.component.html',
  styleUrls: ['./il-group.component.css']
})
export class IlGroupComponent implements OnInit, OnDestroy {
    itchListArray: Itchlist[];
    subscription: Subscription;

  constructor(private itchListService: ItchListService,
              private router: Router,
              private route: ActivatedRoute) {

               }

  ngOnInit(): void {
    this.itchListArray = this.itchListService.getIlCourses();
    this.subscription = this.itchListService.ilCoursesChanged
      .subscribe(
        (itchListArray: Itchlist[]) => {
          this.itchListArray = itchListArray;
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
