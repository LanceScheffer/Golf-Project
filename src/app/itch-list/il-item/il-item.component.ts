import { Component, Input, OnInit } from '@angular/core';
import { Itchlist } from '../itch-list.model';

@Component({
  selector: 'app-il-item',
  templateUrl: './il-item.component.html',
  styleUrls: ['./il-item.component.css']
})
export class IlItemComponent implements OnInit {
  @Input() itchListCourse: Itchlist;
  @Input() index: number;


  ngOnInit(): void {
  }

}
