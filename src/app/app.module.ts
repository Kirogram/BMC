import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {LoginComponent} from './login/login.component';
import {CommonModule, registerLocaleData} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ModalDefaultComponent} from "./modal/modal-default/modal-default.component";
import {FormsModule} from "@angular/forms";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {RouterModule} from "@angular/router";
import {NgChartsModule} from "ng2-charts";
import {Comma2Pipe} from "./pipe/comma2.pipe";
import ko from '@angular/common/locales/ko';
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {BottomComponentComponent} from './layout/bottom-component/bottom-component.component';
import {HeaderComponentComponent} from './layout/header-component/header-component.component';
import { CrawlingComponent } from './pages/crawling/crawling.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from "@angular/material/radio";
import { MainGridComponent } from './main/main-grid/main-grid.component';
import {MatExpansionModule} from "@angular/material/expansion";

registerLocaleData(ko);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    ModalDefaultComponent,
    Comma2Pipe,
    BottomComponentComponent,
    HeaderComponentComponent,
    CrawlingComponent,
    MainGridComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgChartsModule,
    MatRadioModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
