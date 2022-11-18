import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Course } from "../homepage/course.model";
import { HomepageService } from "../homepage/homepage.service";
import { ItchListService } from "../itch-list/itch-list.service";
import { Itchlist } from "../itch-list/itch-list.model";
import { tap } from "rxjs";

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

// fetching data from firebase database using NgOnInit. Upon Initialization fetchHomeData() is being called.
  fetchHomeData(): any {

    return this.http.get<Course[]>('https://lance-golf-project-default-rtdb.firebaseio.com/homepage.json'
    ,{}).pipe(
      tap((courses) => {
        this.homepageService.setCourses(courses)
      console.log("Home Courses:", courses);
    }))
  };
// fetching data from firebase database using NgOnInit. Upon Initialization fetchBucketList() is being called.
fetchBucketList() {

   return this.http.get<Itchlist[]>('https://lance-golf-project-default-rtdb.firebaseio.com/itch-list.json'
   ,{}).pipe(
     tap((ilCourses) => {
       this.itchListService.setIlCourses(ilCourses);
       console.log("Bucket List:", ilCourses);

     }) )
    }
  }

