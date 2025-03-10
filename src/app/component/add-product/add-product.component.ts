import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RawMaterialsService, RawMaterial } from '../../service/rawMaterials/raw-materials.service'; // Import du service
import { NgIf, NgFor } from '@angular/common';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent {
  productForm: FormGroup;
  materials: RawMaterial[] = []; // Liste des matières premières

  constructor(
    private fb: FormBuilder,
    private rawMaterialsService: RawMaterialsService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],  // Nom du produit
      materials: this.fb.array([
        this.createMaterialGroup()
      ], this.validateTotalPercentage)
       // Liste des matières premières
    });

    // Récupérer la liste des matières premières depuis le service
    this.rawMaterialsService.getMaterials().subscribe((materials: RawMaterial[]) => {
      this.materials = materials;
    });
  }

  get materialsArray(): FormArray {
    return this.productForm.get('materials') as FormArray;
  }

  // Ajoute une nouvelle ligne de matière première dans le formulaire.
  addMaterial(): void {
    const materialGroup = this.fb.group({
      materialId: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  
    this.materialsArray.push(materialGroup);
    this.materialsArray.updateValueAndValidity(); // Force la mise à jour de la validation
  }
  
  removeMaterial(index: number): void {
    this.materialsArray.removeAt(index);
    this.materialsArray.updateValueAndValidity(); // Force la mise à jour après suppression
  }  

  // Validation : Vérifie que le total des pourcentages est bien égal à 100 %.
  validateTotalPercentage(control: AbstractControl) {
    const total = (control as FormArray).value.reduce((sum: number, current: any) => sum + (+current.percentage || 0), 0);
    return total === 100 ? null : { totalInvalid: true };
  }

// Soumission du formulaire.
 onSubmit(): void {
  if (this.productForm.valid) {
    console.log('Produit créé:', this.productForm.value);
  } else {
    console.log('Formulaire invalide', this.productForm.errors);
  }
}

  // Calcule le total des pourcentages sélectionnés.
  getTotalPercentage(): number {
    return this.materialsArray.controls.reduce((total, control) => {
      return total + (control.get('percentage')?.value || 0);
    }, 0);
  }

  private createMaterialGroup(): FormGroup {
    return this.fb.group({
      materialId: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }
  
}
