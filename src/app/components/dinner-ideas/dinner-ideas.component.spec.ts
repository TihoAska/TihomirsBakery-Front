import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinnerIdeasComponent } from './dinner-ideas.component';

describe('DinnerIdeasComponent', () => {
  let component: DinnerIdeasComponent;
  let fixture: ComponentFixture<DinnerIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DinnerIdeasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DinnerIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
