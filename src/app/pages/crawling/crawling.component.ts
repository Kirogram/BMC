import {Component, NgZone} from '@angular/core';
import {HttpService} from "../../service/http.service";

@Component({
  selector: 'app-crawling',
  templateUrl: './crawling.component.html',
  styleUrls: ['./crawling.component.scss']
})

export class CrawlingComponent {

  crawlingText: any = '';
  source: any;
  favoriteSeason: any;
  brandSelect: any;
  seasons: any = [
    {name: '어제', value: 1},
    {name: '지난7일', value: 2},
    {name: '이번달', value: 3},
    {name: '지난6개월', value: 4}];
  brand: any = [
    {name: 'CXD피자', value: 'CXD'},
    {name: '문그릭스', value: 'MOON'}];

  constructor(private hs: HttpService,
              private zone: NgZone) {

  }

  bmCrawling() {
    this.crawlingText = '';
    this.source = new EventSource(this.hs.localHost + 'crawlingBot.do');
    this.source.onmessage = (message: any) => {
      this.zone.run(() => {
        if (message.data == '[시스템] 수집 종료') {
          this.changeText(message.data);
          this.source.close();
        } else {
          this.changeText(message.data);
        }
      })
    }
    this.source.onerror = () => {
      this.source.close();
    }

    const params = {
      brand: this.brandSelect,
      time: this.favoriteSeason
    }
    this.hs.httpPost('setCrawling.do', params).then((data: any) => {
    });
  }

  changeText(text: any) {
    if (text.indexOf('[시스템]') != -1) {
      this.crawlingText += '<span class="crawling-system">' + text + '</span><br>';
    } else if (text.indexOf('[일반]') != -1) {
      this.crawlingText += '<span class="default">' + text + '</span><br>';
    } else if (text.indexOf('[중요]') != -1) {
      this.crawlingText += '<span class="crawling-important">' + text + '</span><br>';
    }
  }
}
