import { Component } from '@angular/core';
import { RawMaterial } from '../../service/rawMaterials/raw-materials.service';
import { HttpClient } from '@angular/common/http';

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

