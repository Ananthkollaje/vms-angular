import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './contentComponents/homepage/homepage.component';
import { NotAuthorizedComponent } from './contentComponents/not-authorized/not-authorized.component';
import { PromotionsearchComponent } from './contentComponents/promotionsearch/promotionsearch.component';
import { PromotionupdateComponent } from './contentComponents/promotionupdate/promotionupdate.component';
import { SearcheventComponent } from './contentComponents/searchevent/searchevent.component';
import { SessionExpiredComponent } from './contentComponents/session-expired/session-expired.component';
import { SrgeventsComponent } from './contentComponents/srgevents/srgevents.component';
import { SrgpromotionComponent } from './contentComponents/srgpromotion/srgpromotion.component';
import { SystemConfigComponent } from './contentComponents/system-config/system-config.component';
import { UpdateEventComponent } from './contentComponents/update-event/update-event.component';
import { UserConfigComponent } from './contentComponents/user-config/user-config.component';
import { VmsSignInComponent } from './contentComponents/vms-sign-in/vms-sign-in.component';
import { VouchersearchComponent } from './contentComponents/vouchersearch/vouchersearch.component';
import { ConfigurationComponent } from './pageComponents/configuration/configuration.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleService } from './services/role.service';

const routes: Routes = [
  {
    path: '',
    component: VmsSignInComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [AuthGuardService]
   },
  {
    path: 'logout',
    component: VmsSignInComponent
  },
  {
    path: 'events',
    component: SrgeventsComponent,
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin"]
    }
  },
  {
    path: 'searchevents',
    component: SearcheventComponent,
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin", "ReadOnly"]
    }
  },
  {
    path: 'createpromotion',
    component: SrgpromotionComponent,
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin"]
    }
  },
  {
    path: 'promotionsearch',
    component: PromotionsearchComponent,
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin", "ReadOnly"]
    }
  },
  {
    path: 'vouchersearch',
    component: VouchersearchComponent,
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin", "ReadOnly"]
    }
  },
  {
    path: 'promotionupdate',
    component: PromotionupdateComponent,
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin"]
    }
  },
  {
    path: 'updateevent',
    component: UpdateEventComponent,
    pathMatch: "full",
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin"]
    }
  },
  {
    path: 'notauthorized',
    component: NotAuthorizedComponent,
    pathMatch: "full",
    canActivate: [AuthGuardService]
  },
  {
    path: "sysconfig",
    component: SystemConfigComponent,
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin"]
    },
    pathMatch: "full"
  },
  {
    path: "userconfig",
    component: UserConfigComponent,
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin"]
    },
    pathMatch: "full"
  },
  {
    path: "configuration",
    component: ConfigurationComponent,
    canActivate: [AuthGuardService, RoleService],
    data: {
      expectedroles: ["Admin"]
    },
    pathMatch: "full"
  },
  {
    path: "sessionexpired",
    component: SessionExpiredComponent,
    pathMatch: "full"
  },
  {
    path: '**',
    component: VmsSignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
