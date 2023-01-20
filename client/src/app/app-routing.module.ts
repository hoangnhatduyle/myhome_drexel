import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { MyhomeDashboardComponent } from './myhome-dashboard/myhome-dashboard.component';
import { MyhomeLoginComponent } from './myhome-login/myhome-login.component';
import { MyhomeMemberSettingComponent } from './myhome-member-setting/myhome-member-setting.component';
import { MyhomeNavComponent } from './myhome-nav/myhome-nav.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';

const routes: Routes = [
  { path: '', component: MyhomeLoginComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'members/:username', component: MemberDetailComponent, resolve: { member: MemberDetailedResolver } },
      { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard] },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
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
            component: MemberEditComponent, resolve: { member: MemberDetailedResolver }
          },
          {
            path: 'settings',
            component: MyhomeMemberSettingComponent, canDeactivate: [PreventUnsavedChangesGuard]
          },
          {
            path: 'contact',
            component: ContactComponent
          }
        ]
      }
    ]
  },
  { path: 'errors', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
