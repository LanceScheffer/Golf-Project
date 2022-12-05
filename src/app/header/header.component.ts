import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;


  constructor(
    private dataStorageService: DataStorageService,
     private authService: AuthService
     )  {}

  //I stored the subscription inside the userSub property
  // '!user ? false : true'  is saying 'If not user don't authenticate, otherwise true(isAuthenticated)
  // Another way to code this line is   !!user which means not,not user
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData() {
    this.dataStorageService.storeData()
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  // onFetchData() {
  //   this.dataStorageService.fetchData();
  // }

}
