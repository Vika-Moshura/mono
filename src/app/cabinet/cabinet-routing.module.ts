import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetInfoComponent } from './cabinet-info/cabinet-info.component';
import { CabinetOrdersComponent } from './cabinet-orders/cabinet-orders.component';
import { CabinetPasswordComponent } from './cabinet-password/cabinet-password.component';
import { CabinetComponent } from './cabinet/cabinet.component';

const routes: Routes = [
    { path: '', component: CabinetComponent, 
     children: [
        { path: 'info', component: CabinetInfoComponent },
        { path: 'orders', component: CabinetOrdersComponent },
        { path: 'password', component: CabinetPasswordComponent },
        { path: '', pathMatch: 'full', redirectTo: 'info' },
      ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }