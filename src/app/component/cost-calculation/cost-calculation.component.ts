import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cost-calculation',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CommonModule, NgFor],
  templateUrl: './cost-calculation.component.html',
  styleUrl: './cost-calculation.component.css'
})
export class CostCalculationComponent {
  productId!: number; // ID du produit sélectionné
  step = 0; // Étape actuelle
  costForm: FormGroup;
  totalCost = 0; // Coût total de production
  unitCost = 0; // Coût unitaire
  suggestedPrice = 0; // Prix de vente suggéré

  costCategories = [
    { name: 'Matières premières', selected: false },
    { name: 'Main-d\'œuvre', selected: false },
    { name: 'Packaging', selected: false },
    { name: 'Publicité', selected: false },
    { name: 'Énergie', selected: false },
    { name: 'Amortissement', selected: false },
    { name: 'Frais indirects', selected: false }
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.costForm = this.fb.group({
      costs: this.fb.array([]),
      profitMargin: ['', [Validators.required, Validators.min(0)]],
      errorMargin: ['', [Validators.min(0)]],
      totalUnits: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get costsArray(): FormArray {
    return this.costForm.get('costs') as FormArray;
  }

  // Sélectionne/désélectionne une catégorie et ajoute/retire son champ de saisie
  toggleCategory(category: any) {
    category.selected = !category.selected;
    if (category.selected) {
      this.costsArray.push(this.fb.group({
        name: category.name,
        value: ['', [Validators.required, Validators.min(0)]]
      }));
    } else {
      const index = this.costsArray.controls.findIndex(c => c.value.name === category.name);
      this.costsArray.removeAt(index);
    }
  }

  // Passe à l’étape suivante
  nextStep() {
    this.step++;
  }

  // Revient à l’étape précédente
  previousStep() {
    this.step--;
  }

  // Calcule les coûts
  calculateCost() {
    const values = this.costForm.value;
    this.totalCost = values.costs.reduce((sum: number, cost: any) => sum + parseFloat(cost.value), 0);
    this.unitCost = this.totalCost / values.totalUnits;
    this.suggestedPrice = this.unitCost * (1 + values.profitMargin / 100);
    this.step++;
  }
}
