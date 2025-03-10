import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { RawMaterialListComponent } from '../raw-material-list/raw-material-list.component';

@Component({
  selector: 'app-listes-products-and-rm',
  imports: [ProductListComponent, RawMaterialListComponent],
  templateUrl: './listesprodandrm.component.html',
  styleUrl: './listesprodandrm.component.css'
})
export class ListesProductAndRmComponent {

}
