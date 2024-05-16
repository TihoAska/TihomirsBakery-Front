import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackIdeasComponent } from './snack-ideas.component';

describe('SnackIdeasComponent', () => {
  let component: SnackIdeasComponent;
  let fixture: ComponentFixture<SnackIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackIdeasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
