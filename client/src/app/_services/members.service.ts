import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Message } from '../_models/message';
import { Payment } from '../_models/payment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  member: Member | undefined;

  constructor(private http: HttpClient) {

  }

  getMembersWithoutUserParam(refetch: boolean = false) {
    if (refetch) {
      return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
        map(members => {
          this.members = members.filter(x => x.userName != 'user' && x.userName != 'admin');
          return this.members;
        })
      )
    }
    else {
      if (this.members.length > 0) return of(this.members);
      return this.http.get<Member[]>(this.baseUrl + 'users').pipe(
        map(members => {
          this.members = members.filter(x => x.userName != 'user' && x.userName != 'admin');
          return this.members;
        })
      )
    }
  }

  getMember(username: string, refetch = false) {
    if (refetch) {
      return this.http.get<Member>(this.baseUrl + 'users/' + username).pipe(
        map(member => {
          this.member = member;
          return member;
        })
      )
    }
    else {
      const member = this.member;
      if (member) return of(member);

      return this.http.get<Member>(this.baseUrl + 'users/' + username).pipe(
        map(member => {
          this.member = member;
          return member;
        })
      )
    }
  }

  getMemberForResolver(username: string) {
    return this.http.get<Member>(this.baseUrl + 'users/' + username)
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member)
        this.members[index] = { ...this.members[index], ...member }
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId, {});
  }

  addNewPayment(model: any) {
    return this.http.post<Payment>(this.baseUrl + "users/add-new-payment", model);
  }

  addNewMessage(model: any) {
    return this.http.post<Message>(this.baseUrl + "users/add-new-message", model);
  }
}
