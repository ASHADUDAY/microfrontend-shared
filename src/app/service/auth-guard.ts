import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
      if(!!localStorage.getItem('JWToken') && this.router){
        return true;
    }else{
        window.location.href = "/login";           
         return false;
    }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  
  return inject(PermissionsService).canActivate(next, state);
}