import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {
  constructor(private toastr: ToastrService, private router: Router) {}

  canActivate(): Observable<boolean> {
    var token = localStorage.getItem('emailToken');
    if (token) {
      return of(true);
    }
    else {
      this.toastr.error("You shall not pass!");
      this.router.navigateByUrl('/');
      return of(false);
    }
  }

}
