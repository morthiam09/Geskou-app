import { Injectable } from '@angular/core';
import { RawMaterial } from '../rawMaterials/raw-materials.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface Product {
  id?: number;
  reference: string; // non nullable
  name?: string;
  percentageRawMaterials?: PercentageRawMaterial[]; // Array au lieu de Set
  productionCost?: number;
  recommendedSellingPrice?: number;
  profitMargin?: number;
  productionCostHistory?: ProductionCost[]; // Array pour la liste historique
}

export interface PercentageRawMaterial {
  id?: number; // Optionnel si pas de clé primaire
  percentage: number;
  rawMaterial: RawMaterial; // Supposons un modèle RawMaterial
}

export interface ProductionCost {
  id?: number;
  cost: number;
  date: Date;
  product: Product; // Relation bidirectionnelle
}


@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';
  private productsSubject = new BehaviorSubject<Product[]>([]); // Stocke la liste des produits
  products$ = this.productsSubject.asObservable(); // Observable pour souscription

  constructor(private http: HttpClient) { }

  // Récupère tous les produits et met à jour le BehaviorSubject
  loadProducts(): void {
    this.http.get<Product[]>(this.apiUrl).subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  
  // Retourne l'Observable du BehaviorSubject
  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  // Ajoute un produit et met à jour la liste après ajout
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(() => this.loadProducts()) // Recharge la liste après ajout
    );
  }

  // Supprime un produit et met à jour la liste après suppression
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadProducts()) // Recharge la liste après suppression
    );
  }

  // Met à jour un produit et recharge la liste
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap(() => this.loadProducts()) // Recharge la liste après mise à jour
    );
  }

  // Vérifie si un oroduit existe déjà en appelant l'API
  productExists(reference: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists?reference=${reference}`);
  }


}
