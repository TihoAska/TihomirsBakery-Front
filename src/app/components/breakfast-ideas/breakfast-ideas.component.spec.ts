import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakfastIdeasComponent } from './breakfast-ideas.component';

describe('BreakfastIdeasComponent', () => {
  let component: BreakfastIdeasComponent;
  let fixture: ComponentFixture<BreakfastIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakfastIdeasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BreakfastIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
