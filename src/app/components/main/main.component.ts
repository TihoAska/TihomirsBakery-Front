import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApexDataLabels, ApexFill, ApexLegend, ApexMarkers, ApexOptions, ApexPlotOptions, ApexTooltip, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import { interval, take } from 'rxjs';
import { FooterService } from '../../services/footer.service';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';

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

  meals = [
    { name: "breakfast", macros: [{ name: "protein", value: 0}, { name: "fats", value: 0}, { name: "carbs", value: 0}, { name: "calories", value: 0}]},
    { name: "lunch", macros: [{ name: "protein", value: 0}, { name: "fats", value: 0}, { name: "carbs", value: 0}, { name: "calories", value: 0}]},
    { name: "snack", macros: [{ name: "protein", value: 0}, { name: "fats", value: 0}, { name: "carbs", value: 0}, { name: "calories", value: 0}]},
    { name: "dinner", macros: [{ name: "protein", value: 0}, { name: "fats", value: 0}, { name: "carbs", value: 0}, { name: "calories", value: 0}]},
  ]

  constructor(
    public footerService : FooterService, 
    public helperService : HelperService, 
    private router : Router) {
  }

  ngOnInit(){
    this.router.navigate([''])
  }
}
