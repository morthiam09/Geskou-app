import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { CtaComponent } from '../cta/cta.component';
import { ResultsComponent } from '../results/results.component';
import { FeaturesComponent } from '../features/features.component';

@Component({
  selector: 'app-layout',
  standalone:true,
  imports: [
    HeroComponent,
    CtaComponent,
    ResultsComponent,
    FeaturesComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
