import { Subject } from "rxjs";
import { Course } from "./course.model";

export class HomepageService{
  coursesChanged = new Subject<Course[]>();
  private coursesArray: Course[] = [];
//  private coursesArray: Course[] = [
//     new Course('A test Course Name', 'Sikeston, MO', '11-01-2022', 'Par: 72', 'Score: 70', 'a test description',
//      'https://images.squarespace-cdn.com/content/v1/56ce30477da24f587ace45cc/1551208243379-56310XLWUXOGUJHEVFCA/Screen+Shot+2019-02-26+at+2.10.31+PM.png'),
//     new Course('A second test Course Name', 'Jackson, MO', '11-02-2022', 'Par: 72', 'Score: 70', 'a test description',
//      'https://images.squarespace-cdn.com/content/v1/56ce30477da24f587ace45cc/1551208243379-56310XLWUXOGUJHEVFCA/Screen+Shot+2019-02-26+at+2.10.31+PM.png'),
//   ];

  setCourses(courses: Course[]) {
    this.coursesArray = courses;
    this.coursesChanged.next(this.coursesArray.slice())
  }

  getCourses() {
    return this.coursesArray.slice();
  }

  getCourse(index: number) {
    return this.coursesArray[index];
  }

  addCourse(course: Course) {
    this.coursesArray.push(course);
    this.coursesChanged.next(this.coursesArray.slice());
  }

  updateCourse(index: number, newCourse: Course) {
    this.coursesArray[index] = newCourse;
    this.coursesChanged.next(this.coursesArray.slice());

  }

  deleteCourse(index: number) {
    this.coursesArray.splice(index, 1);
    this.coursesChanged.next(this.coursesArray.slice());
  }

}
