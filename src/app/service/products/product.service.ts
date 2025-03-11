import { Injectable } from '@angular/core';
import { RawMaterial } from '../rawMaterials/raw-materials.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface Product {
  id?: number;
  reference: string;
  name?: string;
  percetageRawMaterials?: PercentageRawMaterial[]; // Array au lieu de Set
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

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products : Product[] = [
    {
      id: 1,
      reference: "PROD-001",
      name: "Jus de pomme",
      percetageRawMaterials: [
        {
          percentage: 70,
          rawMaterial: {
            id: 1,
            name: "Matière Première X",
            unit: "kg",
            unitPrice: 5.99
          }
        }
      ],
      productionCost: 100.5,
      recommendedSellingPrice: 150.0,
      profitMargin: 0.2,
      productionCostHistory: [
        {
          cost: 95.0,
          date: new Date(),
          product: {reference: "PROD-001"} // Référence légère
        }
      ]
    }
  ];

  private ProductsSubject = new BehaviorSubject<Product[]>(this.products);
  constructor() { }

   // Retourne la liste des matières premières en tant qu'Observable.
    getProducts(): Observable<Product[]> {
      return this.ProductsSubject.asObservable();
    }

}
