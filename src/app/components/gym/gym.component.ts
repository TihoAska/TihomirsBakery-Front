import { Component } from '@angular/core';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.scss'
})
export class GymComponent {
  images = [
    { path: '../../../assets/images/street-workout/pullup-bar-cartoonish.png', name: 'PULLUP-BAR' },
  ]

  videos = [
    { path: '../../../assets/videos/gym/flat-bench-press.mp4', name: 'FLAT-BENCH' },
    { path: '../../../assets/videos/gym/incline-bench-press.mp4', name: 'INCLINE-BENCH' },
    { path: '../../../assets/videos/gym/overhead-press.mp4', name: 'OVERHEAD-PRESS' },
    { path: '../../../assets/videos/gym/shoulder-flies.mp4', name: 'SHOULDER-FLIES' },
    { path: '../../../assets/videos/gym/weighted-dips.mp4', name: 'CHINUPS' },
    { path: '../../../assets/videos/gym/incline-chest-flies.mp4', name: 'CHINUPS-NARROW' },
    { path: '../../../assets/videos/gym/bent-over-rows.mp4', name: 'NEUTRAL-PULLUPS-NARROW-GRIP' },
    { path: '../../../assets/videos/gym/one-arm-bent-over-row.mp4', name: 'NEUTRAL-PULLUPS-WIDE-GRIP' },
    { path: '../../../assets/videos/gym/biceps-curls.mp4', name: 'DIPS' },
    { path: '../../../assets/videos/gym/squats.mp4', name: 'STRAIGHT-BAR-DIPS' },
    { path: '../../../assets/videos/gym/split-squat.mp4', name: 'SKULL-CRUSHERS' },
    { path: '../../../assets/videos/gym/romanian-deadlift.mp4', name: 'MUSCLE-UP' },
    { path: '../../../assets/videos/gym/conventional-deadlift.mp4', name: 'MUSCLE-UP' },
  ]

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
