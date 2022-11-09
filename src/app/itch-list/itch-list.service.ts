import { Subject } from "rxjs";
import { Itchlist } from "./itch-list.model";

export class ItchListService {
  ilCoursesChanged = new Subject<Itchlist[]>();
  private itchListArray: Itchlist[] = [];
//  private itchListArray: Itchlist[] = [
//     new Itchlist('Augusta National Golf Club', 'Augusta, GA', 'Home of the Masters',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHTUnaMpXuA-K4l-cxND-6zTlo2dGzVfcUmZZsCg96nGFavBb3jB5EYxQ8_EJJWB57TAs&usqp=CAU'),

//     new Itchlist('Paynes Valley Golf Course', 'Branson, Mo',
//      'First completed fully public-access course in the world designed by Tiger Woods.',
//      'https://www.rentbranson.com/wp-content/uploads/2020/09/paynes-valley.png')
//   ];

  setIlCourses(ilcourses: Itchlist[]) {
    this.itchListArray = ilcourses;
    this.ilCoursesChanged.next(this.itchListArray.slice())
  }

  getIlCourses() {
    return this.itchListArray.slice();
  }

  getIlCourse(index: number) {
    return this.itchListArray[index];
  }

  addIlCourse(ilCourse: Itchlist) {
    this.itchListArray.push(ilCourse);
    this.ilCoursesChanged.next(this.itchListArray.slice());
  }

  updateIlCourse(index: number, newCourse: Itchlist) {
    this.itchListArray[index] = newCourse;
    this.ilCoursesChanged.next(this.itchListArray.slice());

  }

  deleteCourse(index: number) {
    this.itchListArray.splice(index, 1);
    this.ilCoursesChanged.next(this.itchListArray.slice());
  }


}
