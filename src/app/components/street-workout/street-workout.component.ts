import { Component } from '@angular/core';

@Component({
  selector: 'app-street-workout',
  templateUrl: './street-workout.component.html',
  styleUrl: './street-workout.component.scss'
})
export class StreetWorkoutComponent {

  images = [
    { path: '../../../assets/images/street-workout/pullup-bar-cartoonish.png', name: 'PULLUP-BAR' },
  ]

  videos = [
    { path: '../../../assets/videos/street-workout/Pullups.mp4', name: 'PULLUPS' },
    { path: '../../../assets/videos/street-workout/Inverted-rows.mp4', name: 'INVERTED-ROWS' },
    { path: '../../../assets/videos/street-workout/Pullups-close-grip.mp4', name: 'PULLUPS-NARROW' },
    { path: '../../../assets/videos/street-workout/Pullups-alternate-grip.mp4', name: 'PULLUPS-ALTERNATE' },
    { path: '../../../assets/videos/street-workout/Chinups.mp4', name: 'CHINUPS' },
    { path: '../../../assets/videos/street-workout/Chinups-close-grip.mp4', name: 'CHINUPS-NARROW' },
    { path: '../../../assets/videos/street-workout/Neutral-pullups-narrow-grip.mp4', name: 'NEUTRAL-PULLUPS-NARROW-GRIP' },
    { path: '../../../assets/videos/street-workout/Neutral-pullups-wide-grip.mp4', name: 'NEUTRAL-PULLUPS-WIDE-GRIP' },
    { path: '../../../assets/videos/street-workout/Dips.mp4', name: 'DIPS' },
    { path: '../../../assets/videos/street-workout/Dips-straight-bar.mp4', name: 'STRAIGHT-BAR-DIPS' },
    { path: '../../../assets/videos/street-workout/Skull-crushers.mp4', name: 'SKULL-CRUSHERS' },
    { path: '../../../assets/videos/street-workout/Muscle-up.mp4', name: 'MUSCLE-UP' },
  ]

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
