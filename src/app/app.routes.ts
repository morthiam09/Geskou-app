import { RouterModule, Routes } from '@angular/router';
import { AddRawMaterialComponent } from './component/add-raw-material/add-raw-material.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ProductManagementComponent } from './component/product-management/product-management.component';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './component/layout/layout.component';
import { ProductGridComponent } from './component/product-grid/product-grid.component';
import { CostCalculationComponent } from './component/cost-calculation/cost-calculation.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { BoardUserComponent } from './component/board-user/board-user.component';
import { BoardAdminComponent } from './component/board-admin/board-admin.component';

export const routes: Routes = [
    //{ path: '', component: LayoutComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'user', component: BoardUserComponent },
    { path: 'admin', component: BoardAdminComponent },
    {
        path: 'manage-products', component: ProductManagementComponent,
        children: [
            { path: 'add-raw', component: AddRawMaterialComponent },
            { path: 'add-product', component: AddProductComponent }
        ]
    },
    { path: 'products', component: ProductGridComponent },
    { path: 'cost-calculation/:id', component: CostCalculationComponent }, // 🔹 Page de calcul des coûts
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
