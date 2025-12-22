import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/userAuth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loaderShow: boolean = false;
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  forgotForm!: FormGroup;
  showRegistrationForm = false;
  showForgotForm = false;
  showLoginForm = true;
  loginData: any;
  token1: any;
  constructor( private formBuilder:FormBuilder, private router: Router,private authService: UserAuthService,
  ) {
    
  }
 
  ngOnInit() {
    localStorage.removeItem('DepFlag');
    sessionStorage.removeItem('permission');
    sessionStorage.removeItem('officeId');
    sessionStorage.removeItem('legalEntityId');
    sessionStorage.removeItem('JWToken');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
 
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required,Validators.email],
      company: ['', Validators.required],
      country:[ '', Validators.required],
      password: ['', Validators.required],
   });
 
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
 
 
  register() {
    if(this.registrationForm.valid) {
      alert("Registration successful.")
      this.showRegistrationForm= false;
      }  
    }
 
  forgotPassword() {
    if(this.forgotForm.valid) {
    alert("Link has been sent to your registered email.")
    this.showForgotForm= false;
    }
  }
 
//  login() {
//   if(this,this.loginForm.valid){
//     let user=this.auth.login(
//       this.loginForm.value.username,
//       this.loginForm.value.password
//     )
 
//     if (!user) {
//       alert("user not found");
//      }
//      else {
//        this.router.navigateByUrl('/home');
//      }
//    }
//   }
 
login() {
  if(this,this.loginForm.valid){
    let req =  {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      channelId: 0,
      authenticated: true
    }
    this.authService.loginUser(req);
    this.loaderShow = true;
      this.authService.loginUser(req).subscribe((res:any) => {
        
        this.loginData = res;
        console.log(res);
        this.token1 =res.headers.get('ACCESS-TOKEN')?.toString().trim();
        let user =res.headers.get('ACCESS-TOKEN')?.toString().trim();

        localStorage.setItem('JWToken',this.token1);
        sessionStorage.setItem('userid',res.body.data.responseObj1.response.responseData.user_id);
        if(res.body.data.responseObj1.response.responseData.office_id){
          sessionStorage.setItem('officeId',res.body.data.responseObj1.response.responseData.office_id || '88');
         
        }
        else{
          sessionStorage.setItem('officeId', '88');
        }
        
        console.log(this.token1);

        console.log(res)
        if (this.loginData.length<=0) {
          alert("user not found");
        }
        else {
          this.checkAuthorisation(res.body.data.responseObj1.response.responseData.id);
        }
        },err=>{
          this.loaderShow = false;
        });
    }
}
checkAuthorisation(userId){
  this.authService.getAuthorised(userId).subscribe((res:any)=>{
    console.log(res);
    if(res.status == 200){
      if(res.body.data.responseObj1.response){
        sessionStorage.setItem('permission', JSON.stringify(res.body.data.responseObj1.response));
        if(sessionStorage.getItem('officeId')){
          let data = res.body.data.responseObj1.response?.userOfficeList.find(e=> e.office_id == sessionStorage.getItem('officeId'))
          if(data){
            sessionStorage.setItem('legalEntityId',data.le_id);
            }
        }
      }
      this.loaderShow = false;
      localStorage.setItem('session',JSON.stringify(this.loginData.loginname))
      this.router.navigateByUrl('/dashboard');
    }
  },err=>{
    this.loaderShow = false;
  })
}
}
