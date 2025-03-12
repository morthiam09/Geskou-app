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
  private apiUrl = 'http://localhost:8080/api/products'; // URL de l'API Spring Boot
  private productsSubject = new BehaviorSubject<Product[]>([]); // Initialisation d'un BehaviorSubject

  constructor(private http: HttpClient) { }

  // Récupère tous les ptoduits depuis l'API et met à jour le `BehaviorSubject`
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(product => this.productsSubject.next(product)) // Met à jour le Subject
    );
  }

  // Retourne l'Observable du Subject pour que les composants puissent se souscrire
  getProductsSubject(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  // Ajoute un nouveau produit en envoyant une requête POST à l'API
  addProduct(newProduct : Product): Observable<Product> {
    console.log("🟢 Envoi du produit à l'API:", JSON.stringify(newProduct, null, 2));
    return this.http.post<Product>(this.apiUrl, newProduct).pipe(
      tap(() => {
        // Après ajout, on récupère à nouveau les données et on met à jour le Subject
        this.getProducts().subscribe();
      })
    );
  }

  // Vérifie si un oroduit existe déjà en appelant l'API
  productExists(reference: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists?reference=${reference}`);
  }


}
