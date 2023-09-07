import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DatePickerComponent } from './_forms/date-picker/date-picker.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
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
import { BillManagementComponent } from './admin/bill-management/bill-management.component';
import { PaymentManagementComponent } from './admin/payment-management/payment-management.component';
import { MyhomeNavComponent } from './myhome-nav/myhome-nav.component';
import { BillsModalComponent } from './modals/bills-modal/bills-modal.component';
import { PaymentModalComponent } from './modals/payment-modal/payment-modal.component';
import { MyhomeMemberOverviewComponent } from './myhome-member-overview/myhome-member-overview.component';
import { MyhomeChangepasswordComponent } from './myhome-changepassword/myhome-changepassword.component';
import { ContactComponent } from './contact/contact.component';
import { MyhomeMemberSettingComponent } from './myhome-member-setting/myhome-member-setting.component';
import { RoomManagementComponent } from './room-management/room-management.component';
import { RoomModalComponent } from './modals/room-modal/room-modal.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MyhomeMyroomComponent } from './myhome-myroom/myhome-myroom.component';
import { MyhomeDocumnetComponent } from './myhome-documnet/myhome-documnet.component';
import { NewPaymentModalComponent } from './modals/new-payment-modal/new-payment-modal.component';
import { MyhomeNewMessageComponent } from './myhome-new-message/myhome-new-message.component';
import { NewMessageComponent } from './modals/new-message/new-message.component';
import { MyhomeForgotPasswordComponent } from './myhome-forgot-password/myhome-forgot-password.component';
import { MyhomeResetPasswordComponent } from './myhome-reset-password/myhome-reset-password.component';
import { MyhomeFaqComponent } from './myhome-faq/myhome-faq.component';
import { FinancialReportComponent } from './financial-report/financial-report.component';
import { FinancialModalComponent } from './financial-modal/financial-modal.component';
import { NewFinancialReportModalComponent } from './new-financial-report-modal/new-financial-report-modal.component';
import { CustomerReviewComponent } from './customer-review/customer-review.component';
import { LeaseModalComponent } from './modals/lease-modal/lease-modal.component';
import { FinancialChartComponent } from './financial-chart/financial-chart.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DatePickerComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
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
    MyhomeChangepasswordComponent,
    ContactComponent,
    MyhomeMemberSettingComponent,
    RoomManagementComponent,
    RoomModalComponent,
    MemberDetailComponent,
    MyhomeMyroomComponent,
    MyhomeDocumnetComponent,
    NewPaymentModalComponent,
    MyhomeNewMessageComponent,
    NewMessageComponent,
    MyhomeForgotPasswordComponent,
    MyhomeResetPasswordComponent,
    MyhomeFaqComponent,
    FinancialReportComponent,
    FinancialModalComponent,
    NewFinancialReportModalComponent,
    CustomerReviewComponent,
    LeaseModalComponent,
    FinancialChartComponent
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
