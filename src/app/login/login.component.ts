import {Component} from '@angular/core';
import {HttpService} from "../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ParameterService} from "../service/parameter.service";
import {CookieService} from "ngx-cookie-service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ModalDefaultComponent} from "../modal/modal-default/modal-default.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  adminPassWord: any = '';
  infoSave: any = true;
  hashCheck: boolean = false;

  constructor(private hs: HttpService,
              private router: Router,
              public ps: ParameterService,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService,
              private modalService: NgbModal) {

    this.activatedRoute.queryParams.subscribe(hashKey => {
      if (hashKey && hashKey['pw']) {
        this.adminPassWord = hashKey['pw'];
        this.hashCheck = true;
      }
    });
    if (this.cookieService.get('adminPassWord')) {
      const params = {
        pw: this.cookieService.get('adminPassWord'),
      };

      this.hs.httpPost('checkAdminPW.do', params).then((data: any) => {
        if (data.CHECK_PW === 'Y') {
          this.router.navigate(['/mainPage']);
        }
      });
    }
  }

  loginShop() {
    const params = {
      pw: this.adminPassWord
    };
    this.hs.httpPost('insertAdminSession.do', params).then((data: any) => {
      if (data.status === 'Y') {
        this.ps.shopSession = true;
        const expire = new Date();
        expire.setDate(expire.getDate() + 90);
        this.cookieService.set('adminPassWord', this.adminPassWord, expire);
        this.router.navigate(['/mainPage']);
      } else {
        const modalRef = this.modalService.open(ModalDefaultComponent);
        modalRef.componentInstance.name = '인증실패';
      }
    });
  }
}
