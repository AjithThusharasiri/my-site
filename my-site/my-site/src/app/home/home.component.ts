import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  getCurrentTime(): string {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString(); // Adjust format as needed
  }
}
