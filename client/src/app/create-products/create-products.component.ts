


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {

  itemForm!: FormGroup;
  products: any[] = [];
  filtered: any[] = [];

  searchTerm = '';
  successMsg = '';
  errorMsg = '';
  editingId: any = null;

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      stockQuantity: ['', [Validators.required, Validators.min(1),Validators.pattern('^[0-9]+$')]],
      manufacturerId: [localStorage.getItem('userId')] // ✅ FIXED NAME
    });

    this.loadProducts();
  }

  // Load products
  loadProducts(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.httpService.getProductsByManufacturer(id).subscribe({
        next: (res: any) => {
          this.products = res;
          this.applyFilter();
        },
        error: () => this.errorMsg = 'Failed to load products'
      });
    }
  }

  //  Filter products
  applyFilter(): void {
    const t = this.searchTerm.toLowerCase();
    this.filtered = this.products.filter(p =>
      p.name?.toLowerCase().includes(t) ||
      p.description?.toLowerCase().includes(t)
    );
  }

  //  Edit product
  editProduct(p: any): void {
    this.editingId = p.id;

    this.itemForm.patchValue({
      name: p.name,
      description: p.description,
      price: p.price,
      stockQuantity: p.stockQuantity,
      manufacturerId: p.manufacturerId
    });
  }

  //  Cancel edit
  cancelEdit(): void {
    this.editingId = null;
    this.itemForm.reset({
      manufacturerId: localStorage.getItem('userId')
    });
  }

  //  Submit form
  onSubmit(): void {
    if (this.itemForm.invalid) return;

    if (this.editingId) {
      // Update product
      this.httpService.updateProduct(this.itemForm.value, this.editingId)
        .subscribe({
          next: () => {
            this.successMsg = 'Product updated ✅';
            this.cancelEdit();
            this.loadProducts();
          },
          error: () => this.errorMsg = 'Update failed '
        });

    } else {
      // Create product
      this.httpService.createProduct(this.itemForm.value)
        .subscribe({
          next: () => {
            this.successMsg = 'Product created ';
            this.itemForm.reset({
              manufacturerId: localStorage.getItem('userId')
            });
            this.loadProducts();
          },
          error: () => this.errorMsg = 'Creation failed '
        });
    }
  }
}