import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataMockService, Product } from '../../../../core/services/data-mock.service';
import { Observable, map } from 'rxjs';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-pos-checkout',
  templateUrl: './pos-checkout.html',
  styleUrls: ['./pos-checkout.scss']
})
export class PosCheckoutComponent implements OnInit {
  products$: Observable<Product[]>;
  categories = ['الكل', 'إلكترونيات', 'مستلزمات', 'قرطاسية', 'أخرى'];
  selectedCategory = 'الكل';
  searchTerm = '';
  
  cart: CartItem[] = [];
  
  discount = 0;
  taxRate = 0.15; // 15% VAT
  
  constructor(private dataService: DataMockService) {
    this.products$ = this.dataService.getProducts();
  }

  ngOnInit(): void {}

  getFilteredProducts(products: Product[]) {
    return products.filter(p => 
      (this.selectedCategory === 'الكل' || p.category === this.selectedCategory) &&
      (p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || p.sku.includes(this.searchTerm))
    );
  }

  addToCart(product: Product) {
    const existing = this.cart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  updateQuantity(index: number, delta: number) {
    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      this.removeFromCart(index);
    }
  }

  getSubtotal() {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getTax() {
    return this.getSubtotal() * this.taxRate;
  }

  getTotal() {
    return this.getSubtotal() + this.getTax() - this.discount;
  }

  clearCart() {
    this.cart = [];
  }

  onCheckout() {
    if (this.cart.length === 0) return;
    alert(`تم إتمام العملية بنجاح! الإجمالي: ${this.getTotal()} $`);
    this.clearCart();
  }
}
