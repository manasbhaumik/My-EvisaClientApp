import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
// import 'src/assets/vendor/datatables/jquery.dataTables.min.js';
// import 'src/assets/vendor/datatables/dataTables.bootstrap4.min';
// import 'src/assets/vendor/jquery/jquery.min.js';
// import 'src/assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
// import 'src/assets/vendor/jquery-easing/jquery.easing.min.js';
// import 'src/assets/js/sb-admin-2.min.js';
// "src/assets/vendor/datatables/jquery.dataTables.min.js",
// "src/assets/vendor/datatables/dataTables.bootstrap4.min.js",
// "src/assets/js/demo/datatables-demo.js",
// "src/assets/vendor/chart.js/Chart.min.js",
// "src/assets/js/demo/chart-area-demo.js",
// "src/assets/js/demo/chart-pie-demo.js",
// "src/assets/js/demo/chart-bar-demo.js"

// import 'src/assets/vendor/chart.js/Chart.min.js';
// import * as 'src/assets/js/demo/chart-pie-demo.js';
//import { Console } from 'console';

declare var $: any;


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  applicationsList:any;
  
  // var ctx = document.getElementById("myPieChart");
  // var myPieChart = new Chart(ctx, {
  //   type: 'doughnut',
  //   data: {
  //     labels: ["Direct", "Referral", "Social"],
  //     datasets: [{
  //       data: [55, 30, 15],
  //       backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
  //       hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
  //       hoverBorderColor: "rgba(234, 236, 244, 1)",
  //     }],
  //   },
  //   options: {
  //     maintainAspectRatio: false,
  //     tooltips: {
  //       backgroundColor: "rgb(255,255,255)",
  //       bodyFontColor: "#858796",
  //       borderColor: '#dddfeb',
  //       borderWidth: 1,
  //       xPadding: 15,
  //       yPadding: 15,
  //       displayColors: false,
  //       caretPadding: 10,
  //     },
  //     legend: {
  //       display: false
  //     },
  //     cutoutPercentage: 80,
  //   },
  // });

  constructor(
    private router: Router,
    private http: HttpClient,
    private dataService:DataService,
    ) { }

    // ADD CHART OPTIONS. 
    pieChartOptions = {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
  }

  pieChartLabels =  ["Direct", "Referral", "Social"];

  // CHART COLOR.
  pieChartColor:any = [
      {
          backgroundColor: ['rgba(30, 169, 224, 0.8)',
          'rgba(255,165,0,0.9)',
          'rgba(139, 136, 136, 0.9)',
          'rgba(255, 161, 181, 0.9)',
          'rgba(255, 102, 0, 0.9)'
          ]
      }
  ]

  pieChartData:any = [
    { 
      data: [55, 30, 15],
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)"
    }
];

  ngOnInit(): void {
    // this.http.get('./assets/js/demo/chart-pie-demo.js', {responseType: 'json'}).subscribe(
    //   data => {
    //       this.pieChartData = data as any [];	 // FILL THE CHART ARRAY WITH DATA.
    //       console.log("123");
    //   },
    //   (err: HttpErrorResponse) => {
    //       console.log (err.message);
    //   }
    // );

    //$("#dataTable").datatable();

    this.dataService.getApplications()
      .subscribe((data:any)=>{
        
        this.applicationsList=data;
        console.log(this.applicationsList);
        //var appList:[];
       // appList=this.applicationsList.Applicants;
        //console.log(data.Applicants);

      }

    )
    
    // $.getScript('src/assets/vendor/jquery/jquery.min.js');
    // $.getScript('src/assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
    // $.getScript('src/assets/vendor/jquery-easing/jquery.easing.min.js');
    // $.getScript('src/assets/js/sb-admin-2.min.js');
   // $.getScript('../src/assets/vendor/datatables/jquery.dataTables.min.js');
    // $.getScript('src/assets/vendor/datatables/dataTables.bootstrap4.min.js');
   // $.getScript('../src/assets/js/demo/datatables-demo.js');
    // $.getScript('src/assets/vendor/chart.js/Chart.min.js');
    // $.getScript('src/assets/js/demo/chart-pie-demo.js');
    //this.loadScript('../src/assets/vendor/datatables/jquery.dataTables.min.js');
    // this.loadScript('src/assets/js/demo/datatables-demo.js');
  }
  // public loadScript(url: string) {
  //   const body = <HTMLDivElement> document.body;
  //   const script = document.createElement('script');
  //   script.innerHTML = '';
  //   script.src = url;
  //   script.async = false;
  //   script.defer = true;
  //   body.appendChild(script);
  // }
  ngAfterViewInit(){
    // $("#myPieChart").
  }

}
