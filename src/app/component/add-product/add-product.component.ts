import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { RawMaterialsService, RawMaterial } from '../../service/rawMaterials/raw-materials.service'; // Import du service
import { NgIf, NgFor } from '@angular/common';
import { Product, ProductService } from '../../service/products/product.service';
import { Router } from '@angular/router';


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
    private productService: ProductService,
    private rawMaterialsService: RawMaterialsService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      reference: ['', Validators.required],  // Nom du produit
      name: [''],
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
    const formValues = this.productForm.value;

     // Vérifie que l'objet produit est correctement formaté
     const newProduct: Product = {
      reference: formValues.reference,
      name: formValues.name,
      percentageRawMaterials: formValues.materials.map((mat: any) => ({
        materialId: parseInt(mat.materialId, 10),
        percentage: mat.percentage
      }))
    };

    console.log("🟢 Produit prêt à être envoyé:", newProduct); // 🔍 Debug Angular

    this.productService.addProduct(newProduct).subscribe(
      (response) => {
        console.log("✅ Produit ajouté:", response);
        this.router.navigate(['/manage-products']);
      },
      (error) => {
        console.error("❌ Erreur lors de l’ajout du produit:", error);
      }
    );

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
