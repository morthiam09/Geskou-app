import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface RawMaterial {
  id: number;
  name: string;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class MaterialsService {
  private rawMaterials: RawMaterial[] = [
    { id: 1, name: 'Sucre', unit: 'Kg' },
    { id: 2, name: 'Farine', unit: 'Kg' },
    { id: 3, name: 'Eau', unit: 'L' } // Correction : ID 3 au lieu de 2
  ];

  private materialsSubject = new BehaviorSubject<RawMaterial[]>(this.rawMaterials);

  constructor() {}


  // Retourne la liste des matières premières en tant qu'Observable.
  getMaterials(): Observable<RawMaterial[]> {
    return this.materialsSubject.asObservable();
  }

  // Ajoute une nouvelle matière première et met à jour l'observable.
  addMaterial(name: string, unit: string): void {
    const newMaterial: RawMaterial = {
      id: this.generateUniqueId(),
      name,
      unit
    };
    
    this.rawMaterials = [...this.rawMaterials, newMaterial];
    this.materialsSubject.next(this.rawMaterials); // Mise à jour de l'observable
  }

  
  // Vérifie si une matière première existe déjà (insensible à la casse).
  materialExists(name: string): boolean {
    return this.rawMaterials.some(m => m.name.toLowerCase() === name.toLowerCase());
  }

  // Génère un ID unique basé sur le plus grand ID existant.
  private generateUniqueId(): number {
    return this.rawMaterials.length > 0 
      ? Math.max(...this.rawMaterials.map(m => m.id)) + 1 
      : 1;
  }
}
