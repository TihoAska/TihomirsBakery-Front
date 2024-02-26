import { Component } from '@angular/core';
import { FooterService } from '../../services/footer.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, tap } from 'rxjs';
import { HelperService } from '../../services/helper.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApexNonAxisChartSeries } from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';
import { MealService } from '../../services/meal.service';

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

  mealForm : FormGroup;
  workoutForm : FormGroup;
  chartSeries : ApexNonAxisChartSeries;

  protein : number = 0;
  fats : number = 0; 
  carbs : number = 0;

  searchQuery : string = '';
  searchResults : any[] = [];

  isQueryClicked = false;

  constructor(
    public footerService : FooterService, 
    public helperService : HelperService,
    private formBuilder : FormBuilder,
    private router : Router,
    private http : HttpClient,
    private mealService : MealService) 
  {
    this.mealForm = this.formBuilder.group({
      name: new FormControl(''),
      protein: new FormControl(0),
      fats: new FormControl(0),
      carbs: new FormControl(0),
      calories: new FormControl(0)
    });

    this.workoutForm = this.formBuilder.group({
      name: new FormControl(''),
      timeElapsed: new FormControl(0),
      totalCalories: new FormControl(0)
    });

    this.chartSeries = [
      0.01, 
      0.01,
      0.01
    ];
  }

  ngOnInit(){
    this.subscribeToFormChanges();
  }

  subscribeToFormChanges() {
    this.mealForm.valueChanges.subscribe(formValues => {
      this.protein = Number.isNaN(parseFloat(formValues.protein)) || parseFloat(formValues.protein) == null || parseFloat(formValues.protein) == 0 ? 0.01 : parseFloat(formValues.protein);
      this.fats = Number.isNaN(parseFloat(formValues.fats)) || parseFloat(formValues.fats) == null || parseFloat(formValues.fats) == 0 ? 0.01 : parseFloat(formValues.fats);
      this.carbs = Number.isNaN(parseFloat(formValues.carbs)) || parseFloat(formValues.carbs) == null || parseFloat(formValues.carbs) == 0 ? 0.01 : parseFloat(formValues.carbs);

      if(this.protein != 0.01 && this.fats == 0.01 && this.carbs == 0.01){
        this.chartSeries = [this.protein, 0, 0];
      } else if(this.protein == 0.01 && this.fats != 0.01 && this.carbs == 0.01){
        this.chartSeries = [0, this.fats, 0];
      } else if(this.protein == 0.01 && this.fats == 0.01 && this.carbs != 0.01){
        this.chartSeries = [0, 0, this.carbs];
      } else{
        this.chartSeries = [this.protein, this.fats, this.carbs];
      }

      console.log("Protein: " + this.protein + " fats: " + this.fats + " carbs:" + this.carbs);
    });
  }

  checkValue(event : any){
    if(event.target.value < 0){
      event.target.value = 0;
    }
  }

  changeWindow(event : any){
    this.helperService.windowChoice.next(event);
    if(event == 'addMeal'){
      this.router.navigate(['add', 'meal']) 
    } else{
      this.router.navigate(['add', 'workout']) 
    }
  }

  closeWindow(){
    this.footerService.isPlusClicked.next(false);
    this.helperService.windowChoice.next('add');
    this.router.navigate([''])
  }

  navigateToAddMeal(){
    this.router.navigate(['add', 'meal']);
  }

  goBack(){
    this.helperService.windowChoice.next('add');
    this.router.navigate(['add'])
  }

  search() {
    if (!this.mealService.allMeals.value) {
      return;
    }

    this.searchResults = this.mealService.allMeals.value.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  fillForm(meal : any){
    this.mealForm.patchValue({
      name: meal.name,
      protein: meal.proteins,
      fats: meal.fats,
      carbs: meal.carbs,
      calories: meal.calories
    });

    this.isQueryClicked = true;
  }

  closeQuery(){
    this.isQueryClicked = false;
  }

  addMeal(){
    this.mealService.mealFormValues.next({
      proteins: this.mealForm.get('protein')?.value,
      fats: this.mealForm.get('fats')?.value,
      carbs: this.mealForm.get('carbs')?.value,
      calories: this.mealForm.get('calories')?.value
    });

    this.mealService.totalValues.pipe(
      tap((values: any) => {
        values.protein += this.mealForm.get('protein')?.value;
        values.fats += this.mealForm.get('fats')?.value;
        values.carbs += this.mealForm.get('carbs')?.value;
        values.calories += this.mealForm.get('calories')?.value;
      })
    ).subscribe(() => {
      console.log(this.mealService.totalValues.value);
    });
  }
}
