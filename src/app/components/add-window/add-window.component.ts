import { Component } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { HelperService } from '../../services/helper.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-window',
  templateUrl: './add-window.component.html',
  styleUrl: './add-window.component.scss',
  animations: [
    trigger(
      'showWindow', [
        state(
          'show',
          style({
            opacity: 1
          })
        ),
        state(
          'hide',
          style({
            opacity: 0
          })
        ),
        transition('show <=> hide', animate('200ms ease-in-out')),
      ],
    ),
  ]
})
export class AddWindowComponent {

  quickAddForm : FormGroup;

  constructor(
    public footerService : FooterService, 
    public helperService : HelperService,
    private formBuilder : FormBuilder,
    private router : Router) 
  {
    this.quickAddForm = this.formBuilder.group({
      protein: new FormControl,
      fats: new FormControl,
      carbs: new FormControl,
      calories: new FormControl
    })
  }

  ngOnInit(){
    
  }

  checkValue(event : any){
    if(event.target.value < 0){
      event.target.value = 0;
    }
  }

  changeWindow(event : any){
    this.helperService.windowChoice.next(event);
  }

  closeWindow(){
    this.footerService.isPlusClicked.next(false);
    this.helperService.windowChoice.next('add');
    this.router.navigate([''])
  }
}
