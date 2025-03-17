import { Component, Input } from '@angular/core';
import { Product } from '../../service/products/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private router: Router) {}

  goToCostCalculation() {
    this.router.navigate(['/cost-calculation', this.product.id]); // Navigation avec l'ID du produit
  }
}
