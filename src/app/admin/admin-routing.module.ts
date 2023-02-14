import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminDiscountsComponent } from './admin-discounts/admin-discounts.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    {
        path: '', component: AdminComponent, children: [
          { path: 'discounts', component: AdminDiscountsComponent },
          { path: 'categories', component: AdminCategoriesComponent },
          { path: 'products', component: AdminProductsComponent },
          { path: 'orders', component: AdminOrdersComponent },
          { path: '', pathMatch: 'full', redirectTo: 'discounts' },
        ]
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }