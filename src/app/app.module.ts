import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pageComponents/header/header.component';
import { HomepageComponent } from './contentComponents/homepage/homepage.component';
import { LeftNavigationComponent } from './pageComponents/left-navigation/left-navigation.component';
import { FooterComponent } from './pageComponents/footer/footer.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { SrgeventsComponent } from './contentComponents/srgevents/srgevents.component';
import { SrgpromotionComponent } from './contentComponents/srgpromotion/srgpromotion.component';
import { SearcheventComponent } from './contentComponents/searchevent/searchevent.component';
import { PromotiondetailsComponent } from './contentComponents/promotiondetails/promotiondetails.component';
import { PromotionsearchComponent } from './contentComponents/promotionsearch/promotionsearch.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { VmsSignInComponent } from './contentComponents/vms-sign-in/vms-sign-in.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule} from "ngx-spinner";
import { VouchersearchComponent } from './contentComponents/vouchersearch/vouchersearch.component';
import { PromotionupdateComponent } from './contentComponents/promotionupdate/promotionupdate.component';
import { UpdateEventComponent } from './contentComponents/update-event/update-event.component';
import { SystemConfigComponent } from './contentComponents/system-config/system-config.component';
import { UserConfigComponent } from './contentComponents/user-config/user-config.component';
import { ConfigurationComponent } from './pageComponents/configuration/configuration.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { NotAuthorizedComponent } from './contentComponents/not-authorized/not-authorized.component';
import { SessionExpiredComponent } from './contentComponents/session-expired/session-expired.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    LeftNavigationComponent,
    FooterComponent,
    SrgeventsComponent,
    SrgpromotionComponent,
    SearcheventComponent,
    PromotiondetailsComponent,
    PromotionsearchComponent,
    VmsSignInComponent,
    VouchersearchComponent,
    PromotionupdateComponent,
    UpdateEventComponent,
    SystemConfigComponent,
    UserConfigComponent,
    ConfigurationComponent,
    NotAuthorizedComponent,
    SessionExpiredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    AmplifyAuthenticatorModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatIconModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, BnNgIdleService],
   bootstrap: [AppComponent]
})
export class AppModule { }
