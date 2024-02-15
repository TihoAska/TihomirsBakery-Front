import { Component, HostListener } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import {
  trigger,
  state,
  style,
  animate, 
  transition
} from '@angular/animations'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger(
      'showSidebar', [
        state(
          'show',
          style({
            width: '300px',
            zIndex: 1,
          })
        ),
        state(
          'hide',
          style({
            width: '100px',
            zIndex: 1,
          })
        ),
        transition('show <=> hide', animate('300ms ease-in-out')),
      ],
    ),
    trigger(
      'showName', [
        state(
          'show',
          style({
            opacity: 1,
            zIndex: 1,
          })
        ),
        state(
          'hide',
          style({
            opacity: 0,
            zIndex: 1,
          })
        ),
        transition('show <=> hide', animate('300ms ease-in-out')),
      ],
    )
  ]
})
export class SidebarComponent {
  @HostListener('mouseenter')
  onMouseEnter() {
    this.showSidebar = true;
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    this.showSidebar = false;
  }
  
  showSidebar = false;

  items = [
    { icon: '../../../assets/bread-orange.png', name: 'BAGELS' },
    { icon: '../../../assets/sandwich-orange.png', name: 'SANDWICHES' },
    { icon: '../../../assets/croissant.png', name: 'DESSERTS' },
    { icon: '../../../assets/pancakes-orange.png', name: 'PANCAKES' },
    { icon: '../../../assets/coffee-cup-orange.png', name: 'HOT BEVERAGE' },
    { icon: '../../../assets/bubble-tea-orange.png', name: 'ICE COFFEE' },
  ];

  constructor(private headerService : HeaderService){
  }

  ngOnInit(){
    this.headerService.$isHamburgerClicked.subscribe((clicked) => {
      this.showSidebar = clicked;
    })
  }
}
