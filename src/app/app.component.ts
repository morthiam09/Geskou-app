import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './component/hero/hero.component';
import { FeaturesComponent } from './component/features/features.component';
import { ResultsComponent } from './component/results/results.component';
import { CtaComponent } from './component/cta/cta.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
            HeroComponent, 
            FeaturesComponent, 
            ResultsComponent,
            CtaComponent,
            FooterComponent,
            NavbarComponent
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Geskou-frontend';
}
