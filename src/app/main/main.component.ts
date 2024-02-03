import {Component} from '@angular/core';
import {HttpService} from "../service/http.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {ChartOptions} from "chart.js";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  viewDate: Date = new Date();
  monthDate;
  panelOpenState = true;

  timeData: any;
  weekData: any;
  reviewData: any;
  deliveryData: any;
  monthPrice: any;
  bestMenuData: any;
  sourceData: any;
  douData: any;
  ultraData: any;
  orderCategoryData: any;
  reviewDataShow = true;
  bestMenuDataShow = true;
  ultraDataShow = true;
  sourceDataShow = true;

  public pieChartLabels = ['기타', '포장주문', '오픈리스트', '울트라콜'];
  public pieChartDatasets: any = [{data: []}];
  public pieChartLegend = false;
  public pieChartPlugins = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {},

    scales: {
      'x': {
        ticks: {
          color: "white",
        }
      },
      'y': {
        ticks: {
          color: "white",
        }
      },
    },
  };


  constructor(private hs: HttpService,
              private modalService: NgbModal,
              private router: Router) {
    this.monthDate = formatDate(this.viewDate.setMonth(0), 'yyyyMM', 'ko');
    this.setPieChart();
    this.selectTimeTable();
    this.selectWeekTable();
    this.selectBestReview();
    this.selectDeliveryPrice();
    this.selectMonthPrice();
    this.selectBestMenu();
    this.selectSourceData();
    this.selectDouData();
    this.selectUltraData();
  }


  dateChange(data: any) {
    this.monthDate = data;
    this.setPieChart();
    this.selectTimeTable();
    this.selectWeekTable();
    this.selectBestReview();
    this.selectDeliveryPrice();
    this.selectMonthPrice();
    this.selectBestMenu();
    this.selectSourceData();
    this.selectDouData();
    this.selectUltraData();
  }

  setPieChart() {

    const params = {monthDate: this.monthDate};
    this.hs.httpPost('pieChartData.do', params).then((data: any) => {
      if (data) {
        this.orderCategoryData = data;
        this.pieChartDatasets = [{
          data: [data.ETC, data.WALK, data.OPENLIST, data.ULTRA],
          backgroundColor: ['#2ac1bc', '#2ac1bc', '#2ac1bc', '#2ac1bc'],
          hoverBackgroundColor: '#2ac1bc',
          borderColor: '#2ac1bc'
        }];
      }
    });
  }

  selectTimeTable() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('selectTimeTable.do', params).then((data: any) => {

      this.timeData = data;
    });
  }

  selectWeekTable() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('selectWeekTable.do', params).then((data: any) => {

      this.weekData = data;
    });
  }

  selectBestReview() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('selectBestReview.do', params).then((data: any) => {

      this.reviewData = data;
    });
  }

  selectDeliveryPrice() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('selectDeliveryPrice.do', params).then((data: any) => {

      this.deliveryData = data;
    });
  }

  selectMonthPrice() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('selectMonthPrice.do', params).then((data: any) => {

      this.monthPrice = data;
    });
  }

  selectBestMenu() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('selectBestMenu.do', params).then((data: any) => {

      this.bestMenuData = data;
    });
  }

  selectSourceData() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('selectSourceData.do', params).then((data: any) => {

      this.sourceData = data;
    });
  }

  selectDouData() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('selectDouData.do', params).then((data: any) => {

      this.douData = data;
    });
  }

  selectUltraData() {
    const params = {monthDate: this.monthDate};
    this.hs.httpPost('selectUltraData.do', params).then((data: any) => {

      this.ultraData = data;
    });
  }
}
