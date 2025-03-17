import { DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductionCost, ProductionCostService } from '../../service/productionCost/production-cost.service';

@Component({
  selector: 'app-production-cost',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './production-cost.component.html',
  styleUrl: './production-cost.component.css'
})
export class ProductionCostComponent implements OnInit {
  costs: ProductionCost[] = [];

  constructor(private productionCostService: ProductionCostService) {}

  ngOnInit(): void {
    const productId = 1; // Replace with the actual product ID
    this.productionCostService.getHistoryByProduct(productId).subscribe((data: ProductionCost[]) => {
      this.costs = data;
    });
  }
}