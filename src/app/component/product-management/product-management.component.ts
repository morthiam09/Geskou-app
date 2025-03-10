import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ListesProductAndRmComponent } from '../listes-products-and-rm/listesprodandrm.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [RouterOutlet, ListesProductAndRmComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
  constructor(private router: Router) {}
  
    goTo(route: string) {
      this.router.navigate([route]);
    }
}
