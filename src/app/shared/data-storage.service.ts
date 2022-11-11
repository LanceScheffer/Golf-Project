import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Course } from "../homepage/course.model";
import { HomepageService } from "../homepage/homepage.service";
import { ItchListService } from "../itch-list/itch-list.service";
import { Itchlist } from "../itch-list/itch-list.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient,
              private homepageService: HomepageService,
              private itchListService: ItchListService) {}

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
    console.log("hello");

    this.http.get<Course[]>('https://lance-golf-project-default-rtdb.firebaseio.com/homepage.json'
    ).subscribe(courses => {
      console.log("courses:", courses);

      this.homepageService.setCourses(courses);
    })
    this.http.get<Itchlist[]>('https://lance-golf-project-default-rtdb.firebaseio.com/itch-list.json'
    ).subscribe(ilcourses => {
      console.log("ilcourses:", ilcourses);

      this.itchListService.setIlCourses(ilcourses);

    })
  }
  }
