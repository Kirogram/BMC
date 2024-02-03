import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpService} from './service/http.service';
import {ParameterService} from './service/parameter.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private hs: HttpService,
              private router: Router,
              public ps: ParameterService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const authCheck: any = new Promise((resolve) => {
      this.hs.httpPost('adminSessionCheck.do', null).then((data: any) => {
        if (!data) {
          this.router.navigate(['/login']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    return authCheck;
  }
}
