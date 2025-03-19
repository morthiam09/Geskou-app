import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public storageService: StorageService, private router: Router) { }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.storageService.logout();
    this.router.navigate(['/login']);
  }
}