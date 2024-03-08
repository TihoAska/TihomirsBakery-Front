import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetWorkoutComponent } from './street-workout.component';

describe('StreetWorkoutComponent', () => {
  let component: StreetWorkoutComponent;
  let fixture: ComponentFixture<StreetWorkoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreetWorkoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreetWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
