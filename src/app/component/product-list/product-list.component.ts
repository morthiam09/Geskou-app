import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../service/products/product.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products; // 🔹 Mise à jour automatique de la liste
    });

    this.productService.loadProducts(); // 🔹 Charge les produits au démarrage
  }

  onDelete(id: number): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      this.productService.deleteProduct(id).subscribe(() => {
        console.log('✅ Produit supprimé avec succès');
      });
    }
  }
  
}
