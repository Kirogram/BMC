import {Component, EventEmitter, Output} from '@angular/core';
import {ChartOptions} from "chart.js";
import {HttpService} from "../../service/http.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {CalendarView} from "angular-calendar";

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss']
})
export class MainGridComponent {

  @Output() close = new EventEmitter();
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  monthDate;

  barChartLabels: any = [];
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: any = [];
  barChartOptions: ChartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      'x': {
        ticks: {
          color: "white",
        }
      },
      'y-axis-1': {
        ticks: {
          color: "white",
        }
      },
      'y-axis-2': {
        display: false,
        ticks: {
          color: "white",
        }
      }
    },
    elements: {
      line: {
        tension: 0.5
      }
    }

  };

  dayPrice: any = [];
  dayOrder: any = [];
  openListPrice: any = [];
  openListCount: any = [];
  etcListPrice: any = [];
  etcListCount: any = [];
  ultraListPrice: any = [];
  ultraListCount: any = [];
  walkListPrice: any = [];
  walkListCount: any = [];

  constructor(private hs: HttpService,
              private modalService: NgbModal,
              private router: Router) {
    this.monthDate = formatDate(this.viewDate.setMonth(0), 'yyyyMM', 'ko');
    this.setMainChart();
  }

  setMainChart() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('mainChartData.do', params).then((data: any) => {
      this.barChartLabels = [];
      this.dayPrice = [];
      this.dayOrder = [];
      this.openListPrice = [];
      this.openListCount = [];
      this.etcListPrice = [];
      this.etcListCount = [];
      this.ultraListPrice = [];
      this.ultraListCount = [];
      this.walkListPrice = [];
      this.walkListCount = [];

      data.forEach((d: any) => {
        this.barChartLabels.push(d.DAY_DATA);
        this.dayPrice.push(d.PRICE);
        this.dayOrder.push(d.COUNT);
        this.openListPrice.push(d.OPENLIST);
        this.openListCount.push(d.OPENLIST_COUNT);
        this.etcListPrice.push(d.ETC);
        this.etcListCount.push(d.ETC_COUNT);
        this.ultraListPrice.push(d.ULTRA);
        this.ultraListCount.push(d.ULTRA_COUNT);
        this.walkListPrice.push(d.WALKORDER);
        this.walkListCount.push(d.WALKORDER_COUNT);

        this.barChartData = [
          {
            yAxisID: 'y-axis-1',
            data: this.dayPrice,
            label: '매출액',
            backgroundColor: '#31DFD9',
            hoverBackgroundColor: 'rgba(49,223,217,0.56)',
          },
          {
            yAxisID: 'y-axis-1',
            data: this.openListPrice,
            label: '오픈리스트 매출',
            backgroundColor: '#2A3333',
            hoverBackgroundColor: 'rgba(42,51,51,0.46)',
          },
          {
            yAxisID: 'y-axis-1',
            data: this.etcListPrice,
            label: '기타 매출',
            backgroundColor: '#283333',
            hoverBackgroundColor: 'rgba(40,51,51,0.56)'
          },
          {
            yAxisID: 'y-axis-1',
            data: this.ultraListPrice,
            label: '울트라콜 매출',
            backgroundColor: '#395C5B',
            hoverBackgroundColor: 'rgba(57,92,91,0.53)'
          },
          {
            yAxisID: 'y-axis-1',
            data: this.walkListPrice,
            label: '포장주문 매출',
            backgroundColor: '#3C8F8C',
            hoverBackgroundColor: 'rgba(60,143,140,0.46)'
          },
          {
            yAxisID: 'y-axis-2',
            data: this.dayOrder,
            label: '주문수',
            type: 'line',
            hoverBackgroundColor: '#2AC1BC',
            borderColor: '#2AC1BC',
            backgroundColor: '#2AC1BC',
          },
          {
            yAxisID: 'y-axis-2',
            data: this.openListCount,
            label: '오픈리스트 신청',
            type: 'line',
            hoverBackgroundColor: '#24A5A0',
            borderColor: '#24A5A0',
            backgroundColor: '#24A5A0',
            hidden: true
          },
          {
            yAxisID: 'y-axis-2',
            data: this.etcListCount,
            label: '기타신청',
            type: 'line',
            hoverBackgroundColor: '#1E8985',
            borderColor: '#1E8985',
            backgroundColor: '#1E8985',
            hidden: true
          },
          {
            yAxisID: 'y-axis-2',
            data: this.ultraListCount,
            label: '울트라콜 신청',
            type: 'line',
            hoverBackgroundColor: '#186D6A',
            borderColor: '#186D6A',
            backgroundColor: '#186D6A',
            hidden: true
          },
          {
            yAxisID: 'y-axis-2',
            data: this.walkListCount,
            label: '포장주문 신청',
            type: 'line',
            hoverBackgroundColor: '#12514E',
            borderColor: '#12514E',
            backgroundColor: '#12514E',
            hidden: true
          },
        ];
      })
    });
  }

  dateChange() {
    this.monthDate = formatDate(this.viewDate, 'yyyyMM', 'ko');
    this.setMainChart();
    this.close.emit(this.monthDate);
  }
}
