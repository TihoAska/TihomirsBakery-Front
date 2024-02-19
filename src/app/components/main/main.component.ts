import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApexDataLabels, ApexFill, ApexLegend, ApexMarkers, ApexOptions, ApexPlotOptions, ApexTooltip, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { interval, take } from 'rxjs';
import { FooterService } from '../../services/footer.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  @ViewChild('protein', { static: false }) proteinElement!: ElementRef;
  @ViewChild('fats', { static: false }) fatsElement!: ElementRef;
  @ViewChild('carbs', { static: false }) carbsElement!: ElementRef;

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

  chartSeries : ApexNonAxisChartSeries = [this.macros[0].value, this.macros[1].value, this.macros[2].value];
  chartDetails : ApexChart = { type : 'pie', }
  legendOptions: ApexLegend = { show: false }
  fill : ApexFill = { colors: ['darkorange', 'greenyellow', 'lightblue'] }
  tooltip : ApexTooltip = { enabled: false }

  constructor(public footerService : FooterService) {
  }

  ngOnInit(){
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
