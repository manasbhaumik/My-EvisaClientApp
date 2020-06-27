import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.css']
})
export class AgencyListComponent implements OnInit {
  title:string="List of Agency(s)";
  AgentList:any;
  count:number;

  constructor(
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.dataService.GetAgency().subscribe(res => {this.AgentList = res});
    this.count=1;
  }

}
