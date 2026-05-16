import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit {

  itemForm!: FormGroup;
  inventories: any[] = [];
  products: any[] = [];

  editingId: any = null;

  constructor(private fb: FormBuilder, private httpService: HttpService) {}

  ngOnInit(): void {

    //  Fields
    this.itemForm = this.fb.group({
      wholesalerId: [localStorage.getItem('userId') || ''], // set programmatically
      stockQuantity: ['', Validators.required],             // required
      productId: ['', Validators.required]                  // required
    });

    this.loadProducts();      // ✅ Behaviour
    this.loadInventories();   // ✅ Behaviour
  }

  //Load products
  loadProducts(): void {
    this.httpService.getProductsByWholesaler().subscribe((res: any) => {
      this.products = res;
    });
  }

  // Load inventories
  loadInventories(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.httpService.getInventoryByWholesalers(id).subscribe((res: any) => {
        this.inventories = res;
      });
    }
  }

  // Edit inventory
  editInventory(inv: any): void {
    this.editingId = inv.id;
    this.itemForm.patchValue({
      stockQuantity: inv.stockQuantity,
      productId: inv.product?.id
    });
  }

  //Add / Update
  onSubmit(): void {
    if (this.itemForm.invalid) return;

    if (this.editingId) {
      // update
      this.httpService.updateInventory(
        this.itemForm.value.stockQuantity,
        this.editingId
      ).subscribe(() => {
        this.loadInventories();
        this.editingId = null;
      });

    } else {
      // add
      const details = {
        wholesalerId: this.itemForm.value.wholesalerId,
        stockQuantity: this.itemForm.value.stockQuantity
      };

      this.httpService.addInventory(
        details,
        this.itemForm.value.productId
      ).subscribe(() => {
        this.loadInventories();
      });
    }

    this.itemForm.reset({
      wholesalerId: localStorage.getItem('userId')
    });
  }
}
