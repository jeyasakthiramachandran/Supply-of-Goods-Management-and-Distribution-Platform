import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consumer-get-orders',
  templateUrl: './consumer-get-orders.component.html',
  styleUrls: ['./consumer-get-orders.component.scss'],
  providers: [DatePipe]
})
export class ConsumerGetOrdersComponent implements OnInit {

  itemForm!: FormGroup;
  orders: any[] = [];
  filtered: any[] = [];

  searchTerm = '';
  filterStatus = '';

  successMsg = '';
  errorMsg = '';

  showFeedbackFor: any = null;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private datePipe: DatePipe
  ) {}

  // ✅ INIT
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');

    this.itemForm = this.fb.group({
      orderId: [''],
      userId: [userId],
      content: ['', [Validators.required]],
      timestamp: [this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSS')]
    });

    this.loadOrders();
  }

  // ✅ LOAD ORDERS
  loadOrders(): void {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.httpService.getOrderConsumer(userId).subscribe({
        next: (res: any) => {
          this.orders = res;
          this.applyFilter();
        },
        error: () => {
          this.errorMsg = 'Failed to load orders';
        }
      });
    }
  }

  // ✅ FILTER
  applyFilter(): void {
    let list = [...this.orders];

    if (this.searchTerm) {
      const t = this.searchTerm.toLowerCase();
      list = list.filter(o =>
        o.product?.name?.toLowerCase().includes(t)
      );
    }

    if (this.filterStatus) {
      list = list.filter(o => o.status === this.filterStatus);
    }

    this.filtered = list;
  }

  // ✅ OPEN FEEDBACK FORM
  openFeedback(order: any): void {
  this.showFeedbackFor = order;

  const userId = localStorage.getItem('userId');

  this.itemForm.patchValue({
    orderId: order.id,              // ✅ IMPORTANT
    userId: Number(userId),         // ✅ FIX
    content: '',
    timestamp: this.datePipe.transform(
      new Date(),
      'yyyy-MM-ddTHH:mm:ss.SSS'
    )
  });

  console.log("Opened feedback for:", order.id); // ✅ DEBUG
}

  // ✅ SUBMIT FEEDBACK
  onSubmit(): void {
  if (this.itemForm.invalid) {
    this.errorMsg = 'Please enter feedback';
    return;
  }

  const orderId = Number(this.itemForm.value.orderId);   // ✅ FIX
  const userId = Number(this.itemForm.value.userId);
  console.log("userId: ",userId);
       // ✅ FIX
  const content = this.itemForm.value.content;

  const timestamp = this.datePipe.transform(
    new Date(),
    'yyyy-MM-ddTHH:mm:ss.SSS'
  );

  console.log("Sending:", orderId, userId, content); // ✅ DEBUG

  this.httpService.addConsumerFeedBack(orderId, userId, {
    content,
    timestamp,
  }).subscribe({
    next: () => {
      this.successMsg = 'Feedback submitted successfully ✅';
      this.errorMsg = '';

      this.showFeedbackFor = null;

      this.itemForm.patchValue({
        content: ''
      });

      setTimeout(() => this.successMsg = '', 3000);
    },
    error: (err) => {
      console.error("Feedback Error:", err);   // ✅ IMPORTANT
      this.errorMsg = 'Failed to submit feedback ❌';
      this.successMsg = '';
    }
  });
}
}
