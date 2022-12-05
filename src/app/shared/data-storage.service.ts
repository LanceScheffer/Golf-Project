import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Course } from "../homepage/course.model";
import { HomepageService } from "../homepage/homepage.service";
import { ItchListService } from "../itch-list/itch-list.service";
import { Itchlist } from "../itch-list/itch-list.model";
import { AuthService } from "../auth/auth.service";
import { exhaustMap, Subject, take } from "rxjs";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  bucketListSubject= new Subject()
  homepageSubject= new Subject()
  constructor(private http: HttpClient,
              private homepageService: HomepageService,
              private itchListService: ItchListService,
              private authService: AuthService) {}

  storeData () {
    const courses = this.homepageService.getCourses();
    this.http.put(
      'https://lance-golf-project-default-rtdb.firebaseio.com/homepage.json',
       courses).subscribe(response => {
        console.log(response);
       })

    const ilCourses = this.itchListService.getIlCourses();
    this.http.put(
      'https://lance-golf-project-default-rtdb.firebaseio.com/itch-list.json',
      ilCourses).subscribe(response => {
        console.log(response);
      })
  }

  fetchData() {
      this.http
         .get<Course[]>(
        'https://lance-golf-project-default-rtdb.firebaseio.com/homepage.json',
      ).subscribe(data => {
        if(data){
          this.homepageService.setCourses(data)
        }
      })

        this.http
        .get<Itchlist[]>(
         'https://lance-golf-project-default-rtdb.firebaseio.com/itch-list.json',
        )
        .subscribe(data => {
          if(data){
            this.itchListService.setIlCourses(data)
          }
      })
      }


  }
