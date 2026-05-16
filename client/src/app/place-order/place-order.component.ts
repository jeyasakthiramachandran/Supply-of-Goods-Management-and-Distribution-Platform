import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  // ✅ CHANGE NAME (IMPORTANT)
  itemForm!: FormGroup;

  products: any[] = [];
  selectedProductId: any = null;

  successMsg = '';
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {

    // ✅ FORM NAME FIXED
    this.itemForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')]],
      status: ['', Validators.required]
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.httpService.getProductsByWholesaler().subscribe({
      next: (res: any) => {
        this.products = res || [];
        this.errorMsg = '';
      },
      error: () => {
        this.errorMsg = 'Failed to load products';
      }
    });
  }

  selectProduct(productId: any): void {
    this.selectedProductId = productId;
    this.successMsg = 'Product selected ✅';
    this.errorMsg = '';
  }

  // ✅ METHOD NAME FIXED
  onSubmit(): void {

    this.successMsg = '';
    this.errorMsg = '';

    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      this.errorMsg = 'Enter valid quantity';
      return;
    }

    if (!this.selectedProductId) {
      this.errorMsg = 'Select product first';
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.httpService.placeOrder(
      this.itemForm.value,
      this.selectedProductId,
      userId
    ).subscribe({
      next: () => {
        this.successMsg = 'Order placed successfully ✅';
        this.selectedProductId = null;

        this.itemForm.reset();   // ✅ RESET FORM
      },
      error: () => {
        this.errorMsg = 'Failed to place order';
      }
    });
  }
}
