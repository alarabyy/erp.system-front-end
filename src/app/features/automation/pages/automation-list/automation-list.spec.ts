import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationList } from './automation-list';

describe('AutomationList', () => {
  let component: AutomationList;
  let fixture: ComponentFixture<AutomationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
