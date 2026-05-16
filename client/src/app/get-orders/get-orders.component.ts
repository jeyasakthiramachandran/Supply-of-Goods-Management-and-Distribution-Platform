import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-get-orders',
  templateUrl: './get-orders.component.html',
  styleUrls: ['./get-orders.component.scss']
})
export class GetOrdersComponent implements OnInit {

  orders: any[] = [];
  successMsg = '';
  errorMsg = '';

  statuses: string[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.httpService.getOrderByWholesalers(userId).subscribe({
      next: (res: any) => {
        this.orders = (res || []).map((o: any) => ({
          ...o,
          selectedStatus: o.status || ''
        }));
        this.errorMsg = '';
      },
      error: () => {
        this.errorMsg = 'Failed to load orders';
      }
    });
  }

  processOrder(order: any): void {

    if (!order.selectedStatus) {
      this.errorMsg = 'Select status first';
      return;
    }

    this.httpService.updateOrderStatus(order.id, order.selectedStatus).subscribe({
      next: () => {
        this.successMsg = `Order #${order.id} updated ✅`;
        this.errorMsg = '';
        this.loadOrders();
      },
      error: () => {
        this.errorMsg = 'Failed to update';
        this.successMsg = '';
      }
    });
  }
}