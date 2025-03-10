import { Component } from '@angular/core';
import { RawMaterial, RawMaterialsService } from '../../service/rawMaterials/raw-materials.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-raw-material-list',
  imports: [NgFor],
  templateUrl: './raw-material-list.component.html',
  styleUrl: './raw-material-list.component.css'
})
export class RawMaterialListComponent {
  materials: RawMaterial[] = [];

  constructor(private rawMaterialsService: RawMaterialsService) {}

  ngOnInit(): void {
    this.rawMaterialsService.getMaterials().subscribe((data) => {
      this.materials = data;
    });
  }
}
