import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.scss']
})
export class GetOrdersComponent implements OnInit {

  itemForm!: FormGroup;

  // Orders list
  placedOrders: any[] = [];
  receivedOrders: any[] = [];

  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      orderId: [''],
      status: ['']
    });

    this.loadOrders();
  }

  // ✅ Load Orders using your existing service methods
  loadOrders(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // Wholesaler placed orders
    this.httpService.getOrderByWholesalers(userId).subscribe({
      next: (res: any) => {
        this.placedOrders = res;
      },
      error: () => {
        this.errorMsg = 'Failed to load placed orders';
      }
    });

    // Consumer orders received
    this.httpService.getOrderConsumer(userId).subscribe({
      next: (res: any) => {
        // ✅ important for dropdown binding
        this.receivedOrders = res.map((o: any) => ({
          ...o,
          selectedStatus: ''
        }));
      },
      error: () => {
        this.errorMsg = 'Failed to load received orders';
      }
    });
  }

  // ✅ Update status (Process Orders button)
  processOrder(order: any): void {
    if (!order.selectedStatus) return;

    this.httpService.updateOrderStatus(order.id, order.selectedStatus).subscribe({
      next: () => {
        this.successMsg = `Order #${order.id} updated to ${order.selectedStatus}`;
        this.errorMsg = '';
        this.loadOrders(); // reload list
      },
      error: () => {
        this.errorMsg = 'Failed to update order status';
        this.successMsg = '';
      }
    });
  }

}
