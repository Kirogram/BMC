import { Component } from '@angular/core';
import {ParameterService} from "../../service/parameter.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bottom-component',
  templateUrl: './bottom-component.component.html',
  styleUrls: ['./bottom-component.component.scss']
})
export class BottomComponentComponent {

  constructor(private ps: ParameterService,
              private router: Router) {
  }

  privacy(item: any) {
    this.ps.privacy = item;
    this.router.navigate(['/privacy']);
  }

}
