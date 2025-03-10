import { Component } from '@angular/core';
import { RawMaterialsService } from '../../service/rawMaterials/raw-materials.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-raw-material',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-raw-material.component.html',
  styleUrl: './add-raw-material.component.css'
})
export class AddRawMaterialComponent {
  materialName = '';
  materialUnit = '';
  materialUnitPrice = 0;
  errorMessage = '';

  constructor(
    private rawMaterialsService: RawMaterialsService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.rawMaterialsService.materialExists(this.materialName)) {
      this.errorMessage = 'Cette matière existe déjà';
      return;
    }
    this.rawMaterialsService.addMaterial(this.materialName, this.materialUnit, this.materialUnitPrice);
    this.router.navigate(['/manage-products']);
  }
}