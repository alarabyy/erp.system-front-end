import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-pos-settings',
  templateUrl: './pos-settings.html',
  styleUrls: ['./pos-settings.scss']
})
export class PosSettingsComponent implements OnInit {
  settings = {
    receiptHeader: 'شركة لوكس للحلول المتكاملة',
    receiptFooter: 'شكراً لزيارتكم! يرجى الاحتفاظ بالفاتورة للاسترجاع',
    taxId: '300012345600003',
    printerType: 'thermal',
    autoPrint: true,
    allowDiscounts: true
  };

  ngOnInit(): void {}
}
