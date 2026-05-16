import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  orderForm!: FormGroup;

  products: any[] = [];
  selectedProductId: any;

  successMsg = '';
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      quantity: ['', Validators.required],
      status: ['Start', Validators.required]
    });

    this.loadProducts();
  }

  // ✅ Load all products (from manufacturer)
  loadProducts(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.httpService.getProductsByManufacturer(userId).subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: () => {
        this.errorMsg = 'Failed to load products';
      }
    });
  }

  // ✅ Store selected productId (Add for Order button)
  selectProduct(productId: any): void {
    this.selectedProductId = productId;
    this.successMsg = 'Product selected for order';
  }

  // ✅ Place order
  placeOrder(): void {
    if (this.orderForm.invalid || !this.selectedProductId) {
      this.errorMsg = 'Please fill form and select product';
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const orderData = this.orderForm.value;

    this.httpService.placeOrder(
      orderData,
      this.selectedProductId,
      userId
    ).subscribe({
      next: () => {
        this.successMsg = 'Order placed successfully';
        this.errorMsg = '';
        this.orderForm.reset({ status: 'Start' });
      },
      error: () => {
        this.errorMsg = 'Failed to place order';
        this.successMsg = '';
      }
    });
  }

}