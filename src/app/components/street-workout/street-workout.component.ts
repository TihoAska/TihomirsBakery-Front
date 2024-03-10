import { Component } from '@angular/core';

@Component({
  selector: 'app-street-workout',
  templateUrl: './street-workout.component.html',
  styleUrl: './street-workout.component.scss'
})
export class StreetWorkoutComponent {

  images = [
    { path: '../../../assets/pullup-bar-edited.jpg', name: 'PULLUP-BAR' },
  ]

  videos = [
    { path: '../../../assets/videos/Pullups.mp4', name: 'PULLUPS' },
    // { path: '../../../assets/videos/Pullups-wide-grip.mp4', name: 'PULLUPS-WIDE' },
    { path: '../../../assets/videos/Inverted-rows.mp4', name: 'INVERTED-ROWS' },
    { path: '../../../assets/videos/Pullups-close-grip.mp4', name: 'PULLUPS-NARROW' },
    { path: '../../../assets/videos/Pullups-alternate-grip.mp4', name: 'PULLUPS-ALTERNATE' },
    { path: '../../../assets/videos/Chinups.mp4', name: 'CHINUPS' },
    { path: '../../../assets/videos/Chinups-close-grip.mp4', name: 'CHINUPS-NARROW' },
    { path: '../../../assets/videos/Neutral-pullups-narrow-grip.mp4', name: 'NEUTRAL-PULLUPS-NARROW-GRIP' },
    { path: '../../../assets/videos/Neutral-pullups-wide-grip.mp4', name: 'NEUTRAL-PULLUPS-WIDE-GRIP' },
    { path: '../../../assets/videos/Dips.mp4', name: 'DIPS' },
    { path: '../../../assets/videos/Dips-straight-bar.mp4', name: 'STRAIGHT-BAR-DIPS' },
    { path: '../../../assets/videos/Skull-crushers.mp4', name: 'SKULL-CRUSHERS' },
    { path: '../../../assets/videos/Muscle-up.mp4', name: 'MUSCLE-UP' },
  ]

  ngOnInit(){
    window.scrollTo(0,0);
  }
}
