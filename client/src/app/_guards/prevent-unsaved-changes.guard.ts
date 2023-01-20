import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { MyhomeMemberSettingComponent } from '../myhome-member-setting/myhome-member-setting.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MyhomeMemberSettingComponent> {
  constructor(private confirmService: ConfirmService) {}
  
  canDeactivate(
    component: MyhomeMemberSettingComponent): Observable<boolean> {
      if (component.editForm?.dirty) {
        return this.confirmService.confirm();
      }

      return of(true);
  }
  
}
