import { Component } from '@angular/core';
import { MaterialsService } from '../../service/materials/materials.service';
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
  errorMessage = '';

  constructor(
    private materialsService: MaterialsService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.materialsService.materialExists(this.materialName)) {
      this.errorMessage = 'Cette matière existe déjà';
      return;
    }

    this.materialsService.addMaterial(this.materialName, this.materialUnit);
    this.router.navigate(['/manage-products']);
  }
}