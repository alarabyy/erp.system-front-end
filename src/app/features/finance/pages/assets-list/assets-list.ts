import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface Asset {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  status: 'active' | 'maintenance' | 'depreciated' | 'new';
  statusLabel: string;
}

interface Category {
  name: string;
  count: number;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-assets-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assets-list.html',
  styleUrls: ['./assets-list.scss'],
})
export class AssetsList implements OnInit {
  // Re-build trigger comment
  
  mockAssets: Asset[] = [
    {
      id: '1', code: 'A-1025', name: 'لابتوب ديل بريسيزن M7500', description: 'محطة عمل متنقلة لموديل الرندر - قسم التصميم',
      category: 'أجهزة تكنولوجيا المعلومات', purchaseDate: '2024-05-12', purchasePrice: 2200, currentValue: 1850.50,
      status: 'active', statusLabel: 'نشط ويعمل'
    },
    {
      id: '2', code: 'A-2144', name: 'شاشة سامسونج QLED 65', description: 'شاشة عرض ذكية لغرفة الاجتماعات الرئيسية',
      category: 'أثاث وتجهيزات مكتبية', purchaseDate: '2025-01-20', purchasePrice: 1200, currentValue: 1100,
      status: 'active', statusLabel: 'نشط ويعمل'
    },
    {
      id: '3', code: 'A-9541', name: 'مولد سيمنز العملاق 450KVA', description: 'مولد طاقة احتياطي احتياطي للمبنى الرئيسي',
      category: 'آلات ومعدات فنية', purchaseDate: '2022-11-05', purchasePrice: 85000, currentValue: 68420.75,
      status: 'maintenance', statusLabel: 'في الصيانة'
    },
    {
      id: '4', code: 'A-1100', name: 'أثاث مكتبي - طاولة مفاوضات', description: 'طاولة خشبية فاخرة تتسع لـ 12 شخص',
      category: 'أثاث وتجهيزات مكتبية', purchaseDate: '2023-08-15', purchasePrice: 3500, currentValue: 2400.25,
      status: 'active', statusLabel: 'نشط ويعمل'
    },
    {
      id: '5', code: 'A-7744', name: 'طابعة زيروكس الصناعية C9070', description: 'طابعة ليزر ملونة للمطبوعات الدعائية',
      category: 'أجهزة تكنولوجيا المعلومات', purchaseDate: '2021-04-10', purchasePrice: 18000, currentValue: 4200.50,
      status: 'depreciated', statusLabel: 'مهلك دفترياً'
    },
    {
      id: '6', code: 'A-3355', name: 'سيرفر إتش-بي برو-ليانت DL380', description: 'خادم تخزين البيانات السحابية الداخلية',
      category: 'أجهزة تكنولوجيا المعلومات', purchaseDate: '2025-03-01', purchasePrice: 12500, currentValue: 12500,
      status: 'new', statusLabel: 'جديد قيد التركيب'
    }
  ];

  assetCategories: Category[] = [
    { name: 'أجهزة تكنولوجيا المعلومات', count: 42, percent: 32, color: '#0062ff' },
    { name: 'آلات ومعدات فنية', count: 18, percent: 14, color: '#a855f7' },
    { name: 'أثاث وتجهيزات مكتبية', count: 56, percent: 44, color: '#10b981' },
    { name: 'وسائل نقل وهياكل', count: 12, percent: 10, color: '#f59e0b' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
