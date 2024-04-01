import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenEssentialsComponent } from './kitchen-essentials.component';

describe('KitchenEssentialsComponent', () => {
  let component: KitchenEssentialsComponent;
  let fixture: ComponentFixture<KitchenEssentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KitchenEssentialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KitchenEssentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
