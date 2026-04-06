import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomList } from './bom-list';

describe('BomList', () => {
  let component: BomList;
  let fixture: ComponentFixture<BomList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BomList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BomList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
