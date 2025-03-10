import { RouterModule, Routes } from '@angular/router';
import { AddRawMaterialComponent } from './component/add-raw-material/add-raw-material.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ProductManagementComponent } from './component/product-management/product-management.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './component/layout/layout.component';

export const routes: Routes = [
    { path: '', component: LayoutComponent },
    { path: 'manage-products', component: ProductManagementComponent,
        children: [
            { path: 'add-raw', component: AddRawMaterialComponent },
            { path: 'add-product', component: AddProductComponent }
          ]
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
