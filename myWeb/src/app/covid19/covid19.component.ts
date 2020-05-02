import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { formatDate } from "@angular/common";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.css']
})
export class Covid19Component implements OnInit {

  constructor(private httpClient : HttpClient) { }

  confirmedURL: string = 'https://api.covid19api.com/total/dayone/country/canada/status/confirmed';
  confirmCase : number[] = [];
  confirmDates = [];
  confirmChart = {};
  isHideLog = true;

  logOptions = {
    title: {
      display: true,
      fontSize: 20,
      text: 'Canada COVID19 Total Cases Logarithmic '
    },
    scales:{
      yAxes:[{
        type: 'logarithmic',
        ticks: {
          callback: function(label, index, labels) {
              return label/1000*1000;
          }
        },
      }]
    }
  };

  defaultOptions = {
    title: {
      display: true,
      fontSize: 20,
      text: 'Canada COVID19 Total Cases'
    },
  }
  

  getStatus(){
    this.httpClient.get(this.confirmedURL).subscribe((data : any) => {
      for(let i of data){
        this.confirmCase.push(i.Cases);
        let date = new Date(i.Date);
        this.confirmDates.push(formatDate(date.setDate( date.getDate() + 1 ), 'MMM.dd', 'en-US')); 
      }
      this.confirmChart = {
        labels: this.confirmDates,
        datasets: [
          {
            label: 'Canada Total Cases',
            data: this.confirmCase,
            fill: false,
            borderColor: 'orange',
            borderWidth: 1,
          },
        ],
      };
    })
  }

  showLinear(){
    this.isHideLog = true;
  }

  showLog(){
    this.isHideLog = false;
  }


  ngOnInit() {
    this.getStatus();
    

  }

}
