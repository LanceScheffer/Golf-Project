import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { HomepageService } from "../homepage/homepage.service";
import { ItchListService } from "../itch-list/itch-list.service";
import { DataStorageService } from "../shared/data-storage.service";
@Injectable({providedIn: 'root'})
export class HomepageResolverService implements Resolve<[]> {
  constructor(private dataStorageService: DataStorageService,
              private homepageService: HomepageService,
              private itchListService: ItchListService ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
    const homeCourses = this.homepageService.getCourses()
    if (homeCourses.length === 0){
      return  this.dataStorageService.fetchHomeData()
    }
    else { return homeCourses };

}
}
