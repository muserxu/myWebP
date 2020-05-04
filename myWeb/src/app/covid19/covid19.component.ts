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
  confirmedURL2: string = 'https://api.thevirustracker.com/free-api?countryTimeline=CA';
  confirmCase : number[] = [];
  newCase : number[] = [];
  confirmDates = [];
  confirmChart = {};
  dailyChart = {};
  isHideLog:boolean = true;
  isAPIError:boolean = false;

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

  dailyOptions = {
    title: {
      display: true,
      fontSize: 20,
      text: 'Canada COVID19 Daily New Cases'
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
            lineTension: 0.4,
          },
        ],
      };
    })
  }

  getStatus2(){
    this.httpClient.get(this.confirmedURL2).subscribe((data : any) => {
      let stats = data.timelineitems[0];
      if (stats.stat !== 'ok'){
        console.log('API Error');
        this.isAPIError = true;
        return null;
      }

      for(let i in stats){
        if (stats.hasOwnProperty(i) && i!=='stat'){
          this.confirmCase.push(stats[i].total_cases);
          this.newCase.push(stats[i].new_daily_cases);
          let date = new Date(i);
          this.confirmDates.push(formatDate(date, 'MMM.dd', 'en-US')); 
        }
      }
      this.confirmChart = {
        labels: this.confirmDates,
        datasets: [
          {
            label: 'Canada Total Cases',
            data: this.confirmCase,
            fill: false,
            borderColor: 'orange',
            borderWidth: 3,
            lineTension: 0.4,
          },
        ],
      };
      this.dailyChart = {
        labels: this.confirmDates,
        datasets: [
          {
            label: 'Canada daily New Cases',
            data: this.newCase,
            fill: false,
            borderColor: 'blue',
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
    this.getStatus2();
    

  }

}
