import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataMockService, LedgerAccount } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-ledger-list',
  templateUrl: './ledger-list.component.html',
  styleUrls: ['./ledger-list.component.scss']
})
export class LedgerListComponent implements OnInit {
  accounts$: Observable<LedgerAccount[]> | undefined;
  
  constructor(private dataService: DataMockService) {}

  ngOnInit(): void {
    this.accounts$ = this.dataService.getAccounts();
  }

  getAccountTypeLabel(type: string): string {
    const labels: any = {
      'asset': 'أصول',
      'liability': 'خصوم',
      'equity': 'حقوق ملكية',
      'income': 'إيرادات',
      'expense': 'مصروفات'
    };
    return labels[type] || type;
  }
}
