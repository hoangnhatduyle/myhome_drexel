import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { MyhomeLoginComponent } from './myhome-login/myhome-login.component';
import { MyhomeRegisterComponent } from './myhome-register/myhome-register.component';
import { MyhomeDashboardComponent } from './myhome-dashboard/myhome-dashboard.component';
import { MyhomeCalendarComponent } from './myhome-calendar/myhome-calendar.component';
import { MyhomeInfocardComponent } from './myhome-infocard/myhome-infocard.component';
import { BillChartComponent } from './bill-chart/bill-chart.component';
import { ReisdentSumComponent } from './reisdent-sum/reisdent-sum.component';
import { RecentPaymentComponent } from './recent-payment/recent-payment.component';
import { PaymentPieChartComponent } from './payment-pie-chart/payment-pie-chart.component';
import * as CanvasJSAngularChart from '../assets/canvasjs-3.7.4/canvasjs.angular.component';
import { BillManagementComponent } from './bill-management/bill-management.component';
import { PaymentManagementComponent } from './payment-management/payment-management.component';
import { MyhomeNavComponent } from './myhome-nav/myhome-nav.component';
import { BillsModalComponent } from './modals/bills-modal/bills-modal.component';
import { PaymentModalComponent } from './modals/payment-modal/payment-modal.component';
import { MyhomeMemberOverviewComponent } from './myhome-member-overview/myhome-member-overview.component';
import { MyhomeChangepasswordComponent } from './myhome-changepassword/myhome-changepassword.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DatePickerComponent,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    ConfirmDialogComponent,
    MyhomeLoginComponent,
    MyhomeRegisterComponent,
    MyhomeDashboardComponent,
    MyhomeCalendarComponent,
    MyhomeInfocardComponent,
    BillChartComponent,
    ReisdentSumComponent,
    RecentPaymentComponent,
    PaymentPieChartComponent,
    CanvasJSChart,
    BillManagementComponent,
    PaymentManagementComponent,
    MyhomeNavComponent,
    BillsModalComponent,
    PaymentModalComponent,
    MyhomeMemberOverviewComponent,
    MyhomeChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
