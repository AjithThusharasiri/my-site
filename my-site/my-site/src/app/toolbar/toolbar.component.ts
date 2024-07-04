import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../service/theme.service';
import { Subscription } from 'rxjs';
import { EducationComponent } from '../education/education.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  
})
export class ToolbarComponent implements OnInit, OnDestroy {
  private intervalId: number | undefined;
  private themeSubscription: Subscription | undefined;
  isDarkMode: boolean = false;
  currentDate: string = '';
  currentDay: string = '';

  constructor(private themeService: ThemeService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateClock();
    this.intervalId = window.setInterval(() => this.updateClock(), 1000);

    this.themeSubscription = this.themeService.darkMode$.subscribe(
      (isDarkMode) => {
        this.isDarkMode = isDarkMode;
      }
    );

    // Initialize current date and day
    this.updateCurrentDateTime();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  private updateClock(): void {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDeg = (seconds / 60) * 360;
    const secondHand = document.getElementById('second');
    if (secondHand) {
      secondHand.style.transform = `rotate(${secondsDeg}deg)`;
    }

    const minutes = now.getMinutes();
    const minutesDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
    const minuteHand = document.getElementById('minute');
    if (minuteHand) {
      minuteHand.style.transform = `rotate(${minutesDeg}deg)`;
    }

    const hours = now.getHours();
    const hoursDeg = (hours / 12) * 360 + (minutes / 60) * 30;
    const hourHand = document.getElementById('hour');
    if (hourHand) {
      hourHand.style.transform = `rotate(${hoursDeg}deg)`;
    }
  }

  getCurrentTime(): string {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString(); // Adjust format as needed
  }

  updateCurrentDateTime(): void {
    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    const month: number = currentDate.getMonth() + 1; // getMonth() returns 0-based index
    const day: number = currentDate.getDate();
    const hours: number = currentDate.getHours();
    const minutes: number = currentDate.getMinutes();
  
    // Calculate angles for hands
    const hourAngle: number = (hours % 12) * 30 + minutes * 0.5;
    const minuteAngle: number = minutes * 6;
  
    // Get references to hand elements
    const hourHand: HTMLElement | null = document.getElementById('hour');
    const minuteHand: HTMLElement | null = document.getElementById('minute');
  
    // Update hand styles using angle calculations
    if (hourHand && minuteHand) {
      hourHand.style.transform = `rotate(${hourAngle}deg) translateX(-50%) translateY(-100%)`;
      minuteHand.style.transform = `rotate(${minuteAngle}deg) translateX(-50%) translateY(-100%)`;
    } else {
      console.error("Failed to find hour or minute hand elements");
    }
  
    this.currentDate = `${year}-${this.formatTwoDigits(month)}-${this.formatTwoDigits(day)}`;
    this.currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  }
  

  private formatTwoDigits(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.themeService.toggleDarkMode(isDarkMode);
  }

  panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  panelOpenState5 = false;
  panelOpenState6 = false;

  openDialog() {
    this.dialog.open(EducationComponent, {
    });
  }
}
