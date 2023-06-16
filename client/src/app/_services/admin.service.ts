import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RolesModalComponent } from '../modals/roles-modal/roles-modal.component';
import { FinancialReport } from '../_models/financialReport';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, role: string[], active: boolean, payBill: boolean) {
    return this.http.post<string[]>(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + role + '&active=' + active + '&payBill=' + payBill, {})
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
