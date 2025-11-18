import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-count-list-component',
  standalone: false,
  templateUrl: './leave-count-list-component.html',
  styleUrl: './leave-count-list-component.scss',
})
export class LeaveCountListComponent {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    // this.getLeaveCountList();
    this.httpClient
      .get(
        `https://1238r13n-2209.inc1.devtunnels.ms/api/LeaveCount/GetLeaveCountList`
      )
      .subscribe((res) => console.log(res));
  }
}
