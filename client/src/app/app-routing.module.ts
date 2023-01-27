import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MyhomeDashboardComponent } from './myhome-dashboard/myhome-dashboard.component';
import { MyhomeLoginComponent } from './myhome-login/myhome-login.component';
import { MyhomeMemberSettingComponent } from './myhome-member-setting/myhome-member-setting.component';
import { MyhomeNavComponent } from './myhome-nav/myhome-nav.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { MyhomeMyroomComponent } from './myhome-myroom/myhome-myroom.component';
import { MyhomeDocumnetComponent } from './myhome-documnet/myhome-documnet.component';
import { MyhomeForgotPasswordComponent } from './myhome-forgot-password/myhome-forgot-password.component';
import { MyhomeResetPasswordComponent } from './myhome-reset-password/myhome-reset-password.component';
import { ResetPasswordGuard } from './reset-password.guard';

const routes: Routes = [
  { path: '', component: MyhomeLoginComponent },
  { path: 'forgot-password', component: MyhomeForgotPasswordComponent },
  { path: 'reset-password', component: MyhomeResetPasswordComponent, canActivate: [ResetPasswordGuard] },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'main', component: MyhomeNavComponent,
        children: [
          {
            path: 'dashboard',
            component: MyhomeDashboardComponent
          },
          {
            path: 'admin',
            component: AdminPanelComponent, canActivate: [AdminGuard]
          },
          {
            path: 'profile',
            component: MemberEditComponent, resolve: { member: MemberEditResolver }
          },
          {
            path: 'settings',
            component: MyhomeMemberSettingComponent, canDeactivate: [PreventUnsavedChangesGuard]
          },
          {
            path: 'contact',
            component: ContactComponent
          },
          { path: 'profile/:username', component: MemberDetailComponent, resolve: { member: MemberDetailedResolver } },
          {
            path: 'room',
            component: MyhomeMyroomComponent
          },
          {
            path: 'document',
            component: MyhomeDocumnetComponent
          }
        ]
      }
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
