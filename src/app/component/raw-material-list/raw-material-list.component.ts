import { Component } from '@angular/core';
import { RawMaterial, RawMaterialsService } from '../../service/rawMaterials/raw-materials.service';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    // S'abonner au Subject pour recevoir les mises à jour de la liste des matières premières
    this.rawMaterialsService.getMaterialsSubject().subscribe((data) => {
      this.materials = data;
    });

    // Récupérer la liste initiale des matières premières
    this.rawMaterialsService.getMaterials().subscribe();
  }
}
