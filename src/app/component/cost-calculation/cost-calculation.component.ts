import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cost-calculation',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './cost-calculation.component.html',
  styleUrl: './cost-calculation.component.css'
})
export class CostCalculationComponent {
  step = 0; // Étape actuelle
  totalCost = 0;
  unitCost = 0;
  suggestedPrice = 0;
  
  // Liste des catégories de coût avec leurs paramètres en français
  costCategories = [
    { name: 'Matières premières', fields: ['quantité (kg)', 'prix unitaire (€)', 'transport (€)', 'pertes (€)'] },
    { name: 'Main-d\'œuvre', fields: ['heures', 'taux horaire (€)', 'charges sociales (€)'] },
    { name: 'Packaging', fields: ['cout Matériaux (€)', 'cout Confection (€)', 'volume Emballage'] },
    { name: 'Publicité', fields: ['cout campagne (€)', 'cout créatif (€)', 'cout média (€)'] },
    { name: 'Énergie', fields: ['consommation energie (KWH)', 'prix KWH (€)', 'couts fixes (€)'] },
    { name: 'Amortissement', fields: ['valeur acquisition (€)', 'durée vie (année)', 'valeur résiduelle (€)'] },
    { name: 'Frais indirects', fields: ['loyer (€)', 'entretien (€)', 'assurances (€)', 'services publics (€)', 'administration (€)'] }
  ];

  costForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    this.costForm.addControl('totalUnites', this.fb.control('', [Validators.required, Validators.min(1)]));
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
    let totalCost = 0;
    const values = this.costForm.value;
  
    console.log("🟢 Début du calcul...");
  
    this.costCategories.forEach(category => {
      switch (category.name) {
        case 'Matières premières':
          totalCost += (values[this.sanitizeFieldName('quantité (kg)')] * values[this.sanitizeFieldName('prix unitaire (€)')]) 
                        + values[this.sanitizeFieldName('transport (€)')] + values[this.sanitizeFieldName('pertes (€)')];
          break;
        case 'Main-d\'œuvre':
          totalCost += (values[this.sanitizeFieldName('heures')] * values[this.sanitizeFieldName('taux horaire (€)')]) 
                        + values[this.sanitizeFieldName('charges sociales (€)')];
          break;
        case 'Packaging':
          totalCost += (values[this.sanitizeFieldName('cout Matériaux (€)')] + values[this.sanitizeFieldName('cout Confection (€)')]) 
                        * values[this.sanitizeFieldName('volume Emballage')];
          break;
        case 'Publicité':
          totalCost += values[this.sanitizeFieldName('cout campagne (€)')] + values[this.sanitizeFieldName('cout créatif (€)')] 
                        + values[this.sanitizeFieldName('cout média (€)')];
          break;
        case 'Énergie':
          totalCost += (values[this.sanitizeFieldName('consommation energie (KWH)')] * values[this.sanitizeFieldName('prix unitaire (€)')]) 
                        + values[this.sanitizeFieldName('couts fixes (€)')];
          break;
        case 'Amortissement':
          totalCost += (values[this.sanitizeFieldName('valeur acquisition (€)')] - values[this.sanitizeFieldName('valeur résiduelle (€)')]) 
                        / values[this.sanitizeFieldName('durée vie (année)')];
          break;
        case 'Frais indirects':
          totalCost += values[this.sanitizeFieldName('loyer (€)')] + values[this.sanitizeFieldName('entretien (€)')] 
                        + values[this.sanitizeFieldName('assurances (€)')] + values[this.sanitizeFieldName('services publics (€)')] 
                        + values[this.sanitizeFieldName('administration (€)')];
          break;
      }
    });
  
    if (values.totalUnites > 0) {
      this.unitCost = totalCost / values.totalUnites;
      this.suggestedPrice = this.unitCost * (1 + values.margeBeneficiaire / 100);
    } else {
      console.error("⚠️ Erreur : Le nombre total d'unités doit être supérieur à 0 !");
      return;
    }
  
    this.totalCost = totalCost;
  
    console.log("✅ Coût total : ", this.totalCost);
    console.log("✅ Coût unitaire : ", this.unitCost);
    console.log("✅ Prix recommandé : ", this.suggestedPrice);
  
    setTimeout(() => {
      this.step = this.costCategories.length + 1;
      console.log("✅ Étape après calcul : ", this.step);
    });
  }
  
  
}
