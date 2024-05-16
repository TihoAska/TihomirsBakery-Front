import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchIdeasComponent } from './lunch-ideas.component';

describe('LunchIdeasComponent', () => {
  let component: LunchIdeasComponent;
  let fixture: ComponentFixture<LunchIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LunchIdeasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LunchIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
