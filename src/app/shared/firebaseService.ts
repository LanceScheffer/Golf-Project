import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
export class FirebaseService {
  constructor(private http: HttpClient) {}

  // Fetch courses from firebase
  fetchCoursesFromFirebase() {
    return this.http.get(environment.firebase.RootUrl + ".json", {})
  }

}
