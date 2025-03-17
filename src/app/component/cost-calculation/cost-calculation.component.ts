import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CostCalculationService } from '../../service/costCalculation/cost-calculation.service';

@Component({
  selector: 'app-cost-calculation',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './cost-calculation.component.html',
  styleUrl: './cost-calculation.component.css'
})
export class CostCalculationComponent {
  step = 0; // Étape actuelle
  totalCost = 0;
  unitCost = 0;
  suggestedPrice = 0;
  productId: number = 0; // Add this property
  categoryCosts: { [key: string]: number } = {}; // Add this property
  errorMessage = ''; // Add this property for error messages
  isLoading = false; // Add this property for loading state
  
  // Liste des catégories de coût avec leurs paramètres en français
  costCategories = [
    { name: 'Matières premières', fields: ['quantité (kg)', 'prix unitaire (€)', 'transport (€)', 'pertes (€)'] },
    { name: 'Main-d\'œuvre', fields: ['heures', 'taux horaire (€)', 'charges sociales (€)'] },
    { name: 'Packaging', fields: ['cout Matériaux (€)', 'cout Confection (€)', 'volume Emballage'] },
    { name: 'Publicité', fields: ['cout campagne (€)', 'cout créatif (€)', 'cout média (€)'] },
    { name: 'Énergie', fields: ['consommation energie (KWH)', 'prix KWh (€)', 'couts fixes (€)'] },
    { name: 'Amortissement', fields: ['valeur acquisition (€)', 'durée vie (année)', 'valeur résiduelle (€)'] },
    { name: 'Frais indirects', fields: ['loyer (€)', 'entretien (€)', 'assurances (€)', 'services publics (€)', 'administration (€)'] }
  ];

  costForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private costCalculationService: CostCalculationService
  ) {
    this.costForm = this.fb.group({});
    this.initializeCategoryFields();
  }

  // Initialisation des champs dynamiques
  initializeCategoryFields() {
    this.costCategories.forEach(category => {
      category.fields.forEach(field => {
        const sanitizedField = this.sanitizeFieldName(field);
        this.costForm.addControl(sanitizedField, this.fb.control(0, Validators.min(0))); 
      });
    });
  
    // Champs finaux pour le calcul
    this.costForm.addControl('margeBeneficiaire', this.fb.control('', [Validators.required, Validators.min(0)]));
    this.costForm.addControl('margeErreur', this.fb.control('', [Validators.min(0)]));
    this.costForm.addControl('totalUnitesProduites', this.fb.control('', [Validators.required, Validators.min(1)]));
  }
  
  // Fonction pour nettoyer les noms de champs
  sanitizeFieldName(field: string): string {
    return field.replace(/[^a-zA-Z0-9]/g, '_'); // Remplace les caractères spéciaux par '_'
  }
  
  // Passe à l'étape suivante
  nextStep() {
    if (this.step < this.costCategories.length) {
      this.step++;
    }
  }

  // Revient à l'étape précédente
  previousStep() {
    if (this.step > 0) {
      this.step--;
    }
  }

  // Passe une étape sans remplir
  skipStep() {
    this.nextStep();
  }

  getTitleCase(field: string): string {
    return field.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  // Effectuer le calcul du coût total
  calculateCost() {
    const formValues = this.costForm.value;
    
    const requestData = {
      productId: this.productId,
      categories: this.costCategories.map(category => ({
        name: category.name,
        parameters: category.fields.reduce((acc, field) => {
          acc[field] = formValues[this.sanitizeFieldName(field)] || 0;
          return acc;
        }, {} as { [key: string]: number })
      })),
      margeBeneficiaire: formValues.margeBeneficiaire,
      margeErreur: formValues.margeErreur,
      totalUnitesProduites: formValues.totalUnitesProduites
    };

    this.isLoading = true;
    this.costCalculationService.sendCostCalculation(requestData).subscribe({
      next: (response) => {
        this.totalCost = response.totalCost;
        this.unitCost = response.unitCost;
        this.suggestedPrice = response.suggestedPrice;
        this.categoryCosts = response.categoryCosts;
        this.step = this.costCategories.length + 1;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du calcul:', error);
        this.errorMessage = 'Erreur lors du calcul. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }
}