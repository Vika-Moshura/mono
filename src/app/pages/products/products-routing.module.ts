import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductService } from 'src/app/shared/services/products/product.service';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [
    { path: '', component: ProductsComponent },
    {
        path: ':id', component: ProductComponent,
        resolve: {
        productInfo: ProductService
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }