import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-consumer-place-order',
  templateUrl: './consumer-place-order.component.html',
  styleUrls: ['./consumer-place-order.component.scss']
})
export class ConsumerPlaceOrderComponent implements OnInit {

  itemForm!: FormGroup;
  products: any[] = [];
  selectedProductId: any;

  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {

    // ✅ Form with required fields
    this.itemForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
      status: ['PENDING', Validators.required] // ✅ required field
    });

    this.loadProducts();
  }

  // ✅ Load all products
  loadProducts(): void {
    this.httpService.getProductsByConsumers().subscribe({
      next: (res: any) => {
        this.products = res;
      },
      error: () => {
        this.errorMsg = 'Failed to load products';
      }
    });
  }

  // ✅ Select product
  selectProduct(id: any): void {
    this.selectedProductId = id;
  }

  // ✅ Place order
  onSubmit(): void {
    if (this.itemForm.invalid || !this.selectedProductId) {
      this.errorMsg = 'Please select product and enter quantity';
      return;
    }

    const userId = localStorage.getItem('userId');

    this.httpService.consumerPlaceOrder(
      this.itemForm.value,
      this.selectedProductId,
      userId
    ).subscribe({
      next: () => {
        this.successMsg = ' Order placed successfully';
        this.itemForm.reset({ status: 'PENDING' });
      },
      error: () => {
        this.errorMsg = ' Order failed';
      }
    });
  }
}
