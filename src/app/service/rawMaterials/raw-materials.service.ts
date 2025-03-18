import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface RawMaterial {
  id: number;
  name: string;
  unitPrice: number;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class RawMaterialsService {
  private apiUrl = 'http://localhost:8080/api/raw-materials'; // URL de l'API Spring Boot
  private materialsSubject = new BehaviorSubject<RawMaterial[]>([]); // Initialisation d'un BehaviorSubject


  constructor(private http: HttpClient) {}

  // Récupère toutes les matières premières depuis l'API
  getMaterials(): Observable<RawMaterial[]> {
    return  this.http.get<RawMaterial[]>(this.apiUrl).pipe(
      tap(materials => this.materialsSubject.next(materials)) // Met à jour le Subject
    );
  }

  
  // Retourne l'Observable du Subject pour que les composants puissent se souscrire
  getMaterialsSubject(): Observable<RawMaterial[]> {
    return this.materialsSubject.asObservable();
  }

  // Ajoute une nouvelle matière première en envoyant une requête POST à l'API
  addMaterial(name: string, unit: string, unitPrice: number): Observable<RawMaterial> {
    const newMaterial: Partial<RawMaterial> = { name, unit, unitPrice };
    return this.http.post<RawMaterial>(this.apiUrl, newMaterial).pipe(
      tap(() => {
        // Après ajout, on récupère à nouveau les données et on met à jour le Subject
        this.getMaterials().subscribe();
      })
    );
  }
  
  // Vérifie si une matière première existe déjà en appelant l'API
  materialExists(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists?name=${name}`);
  }
}