import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  httpClient: any;
  token1: any;
   val = localStorage.getItem('lang') || 'english';
  $langObesrvable = new BehaviorSubject<string>(this.val);

  constructor(private http: HttpClient) { }

getLang(val){
 this.$langObesrvable.next(val);
}
  loginUser(_loginData: any) {
    
    return this.http.post(
      environment.apiUrlReq + 'authenticate',_loginData,{ observe: 'response'}
    );
  }


  loginUser_2(_loginData: any) {
    
return this.http.post(environment.apiUrlReq + 'authenticate',_loginData, 
{ observe: 'response'}).subscribe(response => {

  const keys = response.headers.keys();

  console.table('keys : ' + keys);

  
  const headers = keys.map(key =>`${key}: ${response.headers.get(key)}`);

    this.token1 =response.headers.get('ACCESS-TOKEN');

  //console.log(response.headers.get('ACCESS-TOKEN'));

  console.log(this.token1);

  localStorage.setItem('JWToken',this.token1);

   //console.table(headers); 

   this.getResponseData(response);

   this.getResponseData(JSON.stringify(Response));

   return response;
   
});




    // return this.http.post(
    //   environment.apiUrlReq + 'authentidfdfcate',
    //   _loginData
    // );
  }



  getResponseData(_loginData: any) {
    let url: string = environment.apiUrlReq + 'authenticate';

    let hdrs = new HttpHeaders({ 'Content-Type': 'application/json' });

   // let param = { group: this.userAuth.group, user: this.userAuth.user, password: this.userAuth.password };

    return this.http.post(url, _loginData, { headers: hdrs, observe: 'response' }).subscribe(res => {
      console.log("123", res);
      console.log("123 headers"+res.headers.get('Date'));
    });
  }


//   getContent(_loginData: any) {
//     const url = environment.apiUrlReq + 'authenticate';
//     return this.http.post(url, _loginData)
//         .map((res: Response) => {
//             console.log('http content', res);
//         });


//    return this.httpClient.post(url, _loginData, { observe: 'response' })
//         .map((res: HttpResponse<any>) => {
//             console.log('httpClient content',res);
//         });
// }




      

  loginUserforToken(_loginData: any) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json"        
    //   }),
    //   observe: "response"
    // };


    this.http
  .post<any>(environment.apiUrlReq + 'authenticate',_loginData, {observe: 'response'})
  .subscribe(resp => {
    console.log(resp.headers.get('X-Token'));
  });
    
    
  }
 getAuthorised(id){
  this.http
  return this.http.get(
    environment.apiUrlReq + `GetAccessbyUserid?userId=${id}`,{ observe: 'response'}
  );
 }

 setRFQUsersList(params){
  this.http
  return this.http.get(
    environment.setRFQApiUrlReq + 'bffdropdown/getLeSettingByGroupAndDesc' + '?legalentityid=' + params.legalentityid + '&settingdescription=' + params.settingdescription
  );
 }
}
