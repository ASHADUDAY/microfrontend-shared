import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

// @Injectable()

@Injectable({
  providedIn : 'root'
})

export class IApiHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let uid = uuidv4();
    let permi :any;
    let traceId : any = Math.floor(Math.random() * (1000 - 2 + 1)) + 4
    sessionStorage.setItem('traceId',traceId);
    if(sessionStorage.getItem('userid')){
      permi  = sessionStorage.getItem('userid') ? sessionStorage.getItem('userid') : '';
    }
    sessionStorage.setItem('uid',uid);
    let jwttoken=req.clone({
      setHeaders:{
        Authorization:"Bearer "+ localStorage.getItem("JWToken"),     
        Uid : uid,
        traceId : sessionStorage.getItem('traceId') || '',
        Userid : permi ? permi : '',
        "x-api-key": 'trxH8cOmlp6e9EKOAUUuh6nEi2ofzB4v29me6vWO'
       }
    })
    return next.handle(jwttoken)

   // return next.handle(request);
  }
}
