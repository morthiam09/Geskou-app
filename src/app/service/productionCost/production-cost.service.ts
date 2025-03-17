import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProductionCostDetail {
  category: string;  // 🔹 Exemple: "Matières premières"
  parameterName: string;  // 🔹 Exemple: "Quantité utilisée"
  value: number;  // 🔹 Valeur saisie
  categoryTotalCost: number; // 🔹 Coût total pour la catégorie
}

export interface ProductionCost {
  totalCost: number;
  unitCost: number;
  suggestedSellingPrice: number;
  marginPercentage: number;
  errorMargin: number;
  totalUnitsProduced: number;
  calculationDate: Date; // Add this property
  details: ProductionCostDetail[]; // Add this property
}

export interface ProductionCostRequest {
  productionCost: ProductionCost;
  details: ProductionCostDetail[];
}

@Injectable({ providedIn: 'root' })
export class ProductionCostService {
  private apiUrl = 'http://localhost:8080/api/production-costs';

  constructor(private http: HttpClient) {}

  saveProductionCost(productId: number, data: ProductionCostRequest): Observable<ProductionCost> {
      console.log("Objet Cout de production envoyé : ", data);
    return this.http.post<ProductionCost>(`${this.apiUrl}/${productId}`, data);
  }

  getHistoryByProduct(productId: number): Observable<ProductionCost[]> {
    return this.http.get<ProductionCost[]>(`${this.apiUrl}/${productId}`);
  }
}