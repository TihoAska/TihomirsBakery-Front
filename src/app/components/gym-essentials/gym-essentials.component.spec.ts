import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymEssentialsComponent } from './gym-essentials.component';

describe('GymEssentialsComponent', () => {
  let component: GymEssentialsComponent;
  let fixture: ComponentFixture<GymEssentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GymEssentialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymEssentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
