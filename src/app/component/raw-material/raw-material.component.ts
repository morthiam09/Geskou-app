import { Component } from '@angular/core';

export interface RawMaterial {
  id: number;
  name: string;
  unitPrice: number;
  unit: string;
}

@Component({
  selector: 'app-raw-material',
  standalone: true,
  imports: [],
  templateUrl: './raw-material.component.html',
  styleUrl: './raw-material.component.css'
})
export class RawMaterialComponent {
  id: number;
  name: string;
  materials: RawMaterial[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.materials = [];
  }
}

