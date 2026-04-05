import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataMockService, AIInsight } from '../../../../core/services/data-mock.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true, imports: [CommonModule, RouterModule, FormsModule],
  selector: 'app-ai-page',
  template: `
    <div class="erp-page animate-fade-in">
      <header class="page-header">
        <div><h1>🧠 لوحة الذكاء الاصطناعي</h1><p class="sub">رؤى ذكية، تحليلات تنبؤية، ومساعد ERP الذكي</p></div>
        <span style="background:#eff6ff;color:#0062ff;padding:.5rem 1.25rem;border-radius:20px;font-size:.82rem;font-weight:700">🤖 AI Beta</span>
      </header>

      <!-- AI Insights -->
      <div>
        <h3 style="font-size:1rem;font-weight:800;margin-bottom:1rem">💡 رؤى ذكية (Auto-detected)</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem">
          <div *ngFor="let insight of insights$ | async" class="luxe-card" style="padding:1.5rem;border-right:4px solid" [style.borderColor]="insight.type==='warning'?'#f43f5e':insight.type==='opportunity'?'#16a34a':insight.type==='trend'?'#0062ff':'#f59e0b'">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.75rem">
              <div style="font-size:1.5rem">{{ insight.type==='warning'?'⚠️':insight.type==='opportunity'?'🎯':insight.type==='trend'?'📈':'🔍' }}</div>
              <div style="display:flex;gap:.5rem">
                <span style="padding:.2rem .6rem;border-radius:8px;font-size:.7rem;font-weight:700" [style.background]="insight.severity==='high'?'#fff1f2':insight.severity==='medium'?'#fffbeb':'#f0fdf4'" [style.color]="insight.severity==='high'?'#f43f5e':insight.severity==='medium'?'#d97706':'#16a34a'">{{ insight.severity==='high'?'عالي':insight.severity==='medium'?'متوسط':'منخفض' }}</span>
                <span style="font-size:.72rem;color:var(--color-text-muted)">{{ insight.time }}</span>
              </div>
            </div>
            <h3 style="font-size:.9rem;font-weight:800;margin-bottom:.5rem">{{ insight.title }}</h3>
            <p style="font-size:.8rem;color:var(--color-text-muted);line-height:1.7;font-weight:500">{{ insight.description }}</p>
            <div style="margin-top:1rem;display:flex;gap:.5rem">
              <button class="btn-luxe btn-ghost" style="font-size:.75rem;padding:.5rem .9rem">👁️ عرض التفاصيل</button>
              <button class="btn-luxe btn-primary" style="font-size:.75rem;padding:.5rem .9rem">⚡ اتخاذ إجراء</button>
            </div>
          </div>
        </div>
      </div>

      <!-- AI Chat Assistant -->
      <div class="luxe-card" style="padding:1.75rem">
        <div class="form-card-title" style="margin-bottom:1.5rem">🗨️ مساعد ERP الذكي</div>
        <div style="background:#f8fafc;border-radius:16px;padding:1.5rem;min-height:300px;margin-bottom:1rem;max-height:400px;overflow-y:auto" id="chat-box">
          <div *ngFor="let msg of chatMessages" style="margin-bottom:1rem" [style.textAlign]="msg.role==='user'?'left':'right'">
            <div style="display:inline-block;max-width:75%;padding:0.875rem 1.25rem;border-radius:16px;font-size:.88rem;line-height:1.7;font-weight:500" [style.background]="msg.role==='user'?'white':'#eff6ff'" [style.color]="msg.role==='user'?'#0f172a':'#1e40af'">
              <strong style="display:block;font-size:.72rem;margin-bottom:.3rem;opacity:.7">{{ msg.role === 'user' ? '👤 أنت' : '🤖 المساعد الذكي' }}</strong>
              {{ msg.content }}
            </div>
          </div>
        </div>
        <div style="display:flex;gap:.75rem">
          <input class="erp-input" [(ngModel)]="chatInput" placeholder="اسأل المساعد الذكي عن النظام..." (keyup.enter)="sendMessage()" style="flex:1">
          <button class="btn-luxe btn-primary" (click)="sendMessage()">إرسال ↩</button>
        </div>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem">
          <button *ngFor="let q of quickQuestions" class="btn-luxe btn-ghost" style="font-size:.75rem;padding:.4rem .8rem" (click)="askQuestion(q)">{{ q }}</button>
        </div>
      </div>
    </div>
  `
})
export class AiPageComponent {
  insights$: Observable<AIInsight[]>;
  chatInput = '';
  quickQuestions = ['ما هي أفضل المنتجات مبيعاً؟', 'ما هو اتجاه الإيرادات؟', 'هل هناك مخزون بحاجة لإعادة طلب؟', 'من هم أفضل العملاء؟'];
  chatMessages = [
    { role: 'assistant', content: 'مرحباً! أنا مساعد كوانتم ERP الذكي 🤖 يمكنني تحليل بيانات نظامك والإجابة على أسئلتك. كيف أستطيع مساعدتك اليوم؟' }
  ];
  constructor(private data: DataMockService) { this.insights$ = this.data.getAIInsights(); }

  sendMessage() {
    if (!this.chatInput.trim()) return;
    this.chatMessages.push({ role: 'user', content: this.chatInput });
    const q = this.chatInput; this.chatInput = '';
    setTimeout(() => {
      const responses: any = {
        'مبيع': 'بناءً على بيانات النظام، أفضل المنتجات مبيعاً هذا الشهر هي: آيفون 15 برو (340 وحدة)، ماك بوك برو M3 (280 وحدة)، آيباد برو OLED (195 وحدة). 📊',
        'إيراد': 'الإيرادات في اتجاه تصاعدي بمعدل نمو 12.4%! أعلى مبيعات كانت في شهر ديسمبر وأبريل. أنصح بزيادة مخزون المنتجات عالية الطلب. 📈',
        'مخزون': 'يوجد 3 منتجات بحاجة فورية لإعادة طلب: سماعات إيربودز ماكس (0 قطعة)، ماوس ماجيك 3 (0 قطعة)، شاشة استوديو (8 قطع فقط). ⚠️',
        'عميل': 'أفضل 3 عملاء هم: شركة تك نيكسوس ($45,600)، شركة المستقبل الرقمي ($22,800)، مؤسسة الرقم الذكي ($12,400). 🏆',
      };
      const key = Object.keys(responses).find(k => q.includes(k));
      this.chatMessages.push({ role: 'assistant', content: key ? responses[key] : `شكراً لسؤالك! بناءً على تحليل بيانات "${q}"، أوصي بمراجعة تقارير النظام للحصول على رؤية أعمق. هل تريد أن أوجهك لصفحة التحليلات؟ 📊` });
    }, 800);
  }

  askQuestion(q: string) { this.chatInput = q; this.sendMessage(); }
}
