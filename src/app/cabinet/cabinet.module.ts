import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetRoutingModule } from './cabinet-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CabinetComponent } from './cabinet/cabinet.component';
import { CabinetInfoComponent } from './cabinet-info/cabinet-info.component';
import { CabinetOrdersComponent } from './cabinet-orders/cabinet-orders.component';
import { CabinetPasswordComponent } from './cabinet-password/cabinet-password.component';


@NgModule({
  declarations: [
    CabinetComponent,
    CabinetInfoComponent,
    CabinetOrdersComponent,
    CabinetPasswordComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    SharedModule
  ]
})
export class CabinetModule { }
