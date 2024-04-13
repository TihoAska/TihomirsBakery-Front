import { Injectable, Renderer2 } from '@angular/core';
import { ApexChart, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexTooltip } from 'ng-apexcharts';
import { BehaviorSubject, interval, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  isDimmedBackgroundClicked : BehaviorSubject<boolean> = new BehaviorSubject(false);
  windowChoice : BehaviorSubject<string> = new BehaviorSubject("add");
  scrollTo : BehaviorSubject<string> = new BehaviorSubject("");

  macros = [
    { name: "protein", value: 220, animatedValue: 0 },
    { name: "fats", value: 82, animatedValue: 0 },
    { name: "carbs", value: 255, animatedValue: 0 },
    { name: "calories", value: 2555, animatedValue: 0}
  ]

  meals = [
    { name: "breakfast", macros: [{ name: "protein", value: 0}, { name: "fats", value: 0}, { name: "carbs", value: 0}, { name: "calories", value: 0}]},
    { name: "lunch", macros: [{ name: "protein", value: 0}, { name: "fats", value: 0}, { name: "carbs", value: 0}, { name: "calories", value: 0}]},
    { name: "snack", macros: [{ name: "protein", value: 0}, { name: "fats", value: 0}, { name: "carbs", value: 0}, { name: "calories", value: 0}]},
    { name: "dinner", macros: [{ name: "protein", value: 0}, { name: "fats", value: 0}, { name: "carbs", value: 0}, { name: "calories", value: 0}]},
  ]
  
  chartOptions : ChartOptions = {
    chartSeries : [this.macros[0].value, this.macros[1].value, this.macros[2].value],
    chartDetails : { type : 'donut', },
    legendOptions : { show: false },
    fill : { colors: ['darkorange', 'greenyellow', 'lightblue'] },
    tooltip : { enabled: false }
  }

  constructor() { 
    this.animateMacroValues();
  }

  animateMacroValues() {
    this.macros.forEach(macro => {
      const duration = macro.value > 100 ? 20 : 200; // Adjust duration for larger values
      const step = Math.ceil(macro.value / (macro.value > 100 ? 100 : 10)); // Adjust step size for larger values
      let currentValue = 0;
  
      interval(duration).pipe(
        take(Math.ceil(macro.value / step) + 1)
      ).subscribe(() => {
        currentValue += step;
        macro.animatedValue = Math.min(currentValue, macro.value); // Ensure animated value doesn't exceed target value
      });
    });
  }
}

export interface ChartOptions {
  chartSeries : ApexNonAxisChartSeries,
  chartDetails : ApexChart,
  legendOptions: ApexLegend,
  fill : ApexFill,
  tooltip : ApexTooltip
}
