import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RolesModalComponent } from '../modals/roles-modal/roles-modal.component';
import { FinancialReport } from '../_models/financialReport';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  users: User[] = [];

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    if (this.users.length > 0) return of(this.users);
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles').pipe(
      map(user => {
        this.users = user.filter(x => x.userName != 'user');
        return this.users;
      })
    );
  }

  updateUserMonthlyPayment(username: string, payBill: boolean, payStatus: boolean, payRent: boolean) {
    return this.http.post<string[]>(this.baseUrl + 'admin/edit-monthly-payment/' + username + '?payBill=' + payBill + '&payStatus=' + payStatus + '&payRent=' + payRent, {})
  }
  
  updateUserDetails(username: string, role: string[], active: boolean, leaseStart: any, leaseEnd: any, notes: string) {
    return this.http.post<string[]>(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + role + '&active=' + active + '&leaseStart=' + leaseStart + '&leaseEnd=' + leaseEnd + '&notes=' + notes, {})
  }

  getPhotosForApproval() {
    return this.http.get<Photo[]>(this.baseUrl + 'admin/photos-to-moderate');
  }

  approvePhoto(photoId: number) {
    return this.http.post(this.baseUrl + 'admin/approve-photo/' + photoId, {});
  }

  rejectPhoto(photoId: number) {
    return this.http.post(this.baseUrl + 'admin/reject-photo/' + photoId, {});
  }

  changeRoom(username: string, roomNumber: number) {
    return this.http.put(this.baseUrl + 'admin/change-room/' + username + "/" + roomNumber, {});
  }

  getFinancialReport(year: number) {
    return this.http.get<FinancialReport[]>(this.baseUrl + 'admin/get-financial-report/' + year);
  }

  addFinancialReport(model: any) {
    return this.http.post(this.baseUrl + 'admin/add-new-report/', model);
  }
}
