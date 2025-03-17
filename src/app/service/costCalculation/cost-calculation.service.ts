import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface CostCalculationRequest {
  productId: number;
  categories: { name: string; parameters: { [key: string]: number } }[];
  margeBeneficiaire: number;
  margeErreur: number;
  totalUnitesProduites: number;
}

export interface CostCalculationResponse {
  totalCost: number;
  unitCost: number;
  suggestedPrice: number;
  categoryCosts: { [key: string]: number }; // Stocke le coût par catégorie
}

@Injectable({
  providedIn: 'root'
})
export class CostCalculationService {
  private apiUrl = 'http://localhost:8080/api/production-costs'; // URL du backend

  constructor(private http: HttpClient) {}

  // Envoie les données au backend
  sendCostCalculation(data: CostCalculationRequest): Observable<CostCalculationResponse> {
    console.log("Données envoyées au serveur:", data);
    return this.http.post<CostCalculationResponse>(this.apiUrl, data)
      .pipe(
        map(response => {
          console.log("Réponse reçue du serveur:", response);
          console.log("Coût total:", response.totalCost);
          console.log("Coût unitaire:", response.unitCost);
          console.log("Prix suggéré:", response.suggestedPrice);
          console.log("Coûts par catégorie:", response.categoryCosts);
          return response;
        }),
        catchError(error => {
          console.error('Erreur lors de l\'envoi des données:', error);
          return throwError(() => error);
        })
      );
  }
}
