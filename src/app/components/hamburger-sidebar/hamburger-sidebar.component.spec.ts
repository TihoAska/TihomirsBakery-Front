import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerSidebarComponent } from './hamburger-sidebar.component';

describe('HamburgerSidebarComponent', () => {
  let component: HamburgerSidebarComponent;
  let fixture: ComponentFixture<HamburgerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburgerSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HamburgerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
