import {Component} from '@angular/core';
import {HttpService} from "../../service/http.service";
import {ParameterService} from "../../service/parameter.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent {

  constructor(private hs: HttpService,
              public ps: ParameterService,
              private router: Router) {

  }

}
