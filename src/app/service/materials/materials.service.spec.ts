import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface RawMaterial {
  id: number;
  name: string;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class MaterialsService {
  private materials$ = new BehaviorSubject<RawMaterial[]>([
    { id: 1, name: 'Farine', unit: 'kg' },
    { id: 2, name: 'Sucre', unit: 'kg' }
  ]);

  getMaterials() {
    return this.materials$.asObservable();
  }

  addMaterial(material: Omit<RawMaterial, 'id'>) {
    const newMaterial = {
      id: Date.now(),
      ...material
    };
    this.materials$.next([...this.materials$.value, newMaterial]);
  }
}