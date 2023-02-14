import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountsRoutingModule } from './discounts-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiscountComponent } from './discount/discount.component';
import { DiscountsComponent } from './discounts.component';

@NgModule({
  declarations: [
    DiscountsComponent,
    DiscountComponent,
  ],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    SharedModule
  ]
})
export class DiscountsModule { }
