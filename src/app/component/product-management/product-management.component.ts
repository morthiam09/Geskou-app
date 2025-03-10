import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
  constructor(private router: Router) {}
  
    goTo(route: string) {
      this.router.navigate([route]);
    }
}
