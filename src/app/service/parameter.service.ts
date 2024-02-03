import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {

  userInfo = {status: 'fail', userName: null};
  url: any = null;
  widthSize = 0;
  scrollHeight = 0;
  browserWidth = 0;
  privacy = 1;
  cleanType = 1;
  shopSession = false;
  private subject = new Subject<any>();
  private favorSubject = new Subject<any>();


  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.url = router.url;
    });
  }

  getData() {
    return this.subject.asObservable();
  }

  getFavorData() {
    return this.favorSubject.asObservable();
  }

}
