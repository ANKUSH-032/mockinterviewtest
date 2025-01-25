import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss']
})
export class QuestionDisplayComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  questions: any[] = [];
  currentQuestion: any = null;
  questionIndex: number = 0;
  intervalSubscription: Subscription | null = null;
  videoStream: MediaStream | null = null;
  isMediaReady: boolean = false;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['questions']) {
      this.questions = navigation.extras.state['questions'];
    }
  }

  ngOnInit(): void {
    if (this.questions.length > 0) {
      this.setupMediaAccess();
    } else {
      console.error('No questions found!');
    }
  }

  async setupMediaAccess(): Promise<void> {
    try {
      // Request access to the camera
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false // You can set this to `true` if microphone access is required
      });
      this.isMediaReady = true;
      // Bind the video stream to the video element
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.videoStream;
      }
      this.startQuestionTimer();
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Camera access is required to proceed.');
    }
  }

  startQuestionTimer(): void {
    this.setCurrentQuestion();
    this.intervalSubscription = interval(60000).subscribe(() => {
      this.questionIndex++;
      if (this.questionIndex < this.questions.length) {
        this.setCurrentQuestion();
      } else {
        this.stopQuestionTimer();
      }
    });
  }

  setCurrentQuestion(): void {
    this.currentQuestion = this.questions[this.questionIndex];
  }

  stopQuestionTimer(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  ngOnDestroy(): void {
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
    }
    this.stopQuestionTimer();
  }
}
