import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountsService } from 'src/app/shared/services/discounts/discounts.service';
import { DiscountComponent } from './discount/discount.component';
import { DiscountsComponent } from './discounts.component';


const routes: Routes = [
    { path: '', component: DiscountsComponent },
    {
        path: ':id', component: DiscountComponent,
        resolve: {
        discountInfo: DiscountsService
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiscountsRoutingModule { }