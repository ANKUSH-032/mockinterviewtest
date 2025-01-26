import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss'],
})
export class QuestionDisplayComponent implements OnInit, OnDestroy {
  @ViewChild('video', { static: false })
  videoElement!: ElementRef<HTMLVideoElement>;

  questions: any[] = [];
  currentQuestion: any = null;
  questionIndex: number = 0;
  intervalSubscription: Subscription | null = null;
  videoStream: MediaStream | null = null;
  isMediaReady: boolean = false;
  recognition: any; // Speech recognition instance
  transcription: string = ''; // Store spoken text
  timeLeft: number = 60; // Initial countdown time (in seconds)
  countdownInterval: Subscription | null = null;
  answers: { questionId: string; answer: string }[] = [];
  isSubmitVisible: boolean = false;
  redirectTimeout: any;
  constructor(private router: Router, private toastr: ToastrService) {
    const navigation = this.router.getCurrentNavigation();
    if (
      navigation &&
      navigation.extras.state &&
      navigation.extras.state['questions']
    ) {
      this.questions = navigation.extras.state['questions'];
    }
  }

  ngOnInit(): void {
    if (this.questions.length > 0) {
      this.setupMediaAccess();
      this.initializeSpeechRecognition();
    } else if (this.questions.length === 0) {
      this.handleNoQuestions(); // Handle the case where no questions are available
    } else {
      console.error('No questions found!');
    }
  }

  async setupMediaAccess(): Promise<void> {
    try {
      // Request access to the camera
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true, // You can set this to `true` if microphone access is required
      });
      this.isMediaReady = true;
      // Bind the video stream to the video element
      if (this.videoElement && this.videoElement.nativeElement) {
        this.videoElement.nativeElement.srcObject = this.videoStream;
      }
      this.startQuestionTimer();
    } catch (error) {
      console.error('Error accessing media devices:', error);
      this.toastr.error('Camera access is required to proceed.');
    }
  }

  // startSpeechRecognition(): void {
  //   const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  //   if (!SpeechRecognition) {
  //     alert('Speech Recognition is not supported in this browser.');
  //     return;
  //   }

  //   this.recognition = new SpeechRecognition();
  //   this.recognition.lang = 'en-US';
  //   this.recognition.continuous = true; // Continuous recognition
  //   this.recognition.interimResults = true; // Get real-time results

  //   this.recognition.onresult = (event: SpeechRecognitionEvent) => {
  //     let interimTranscription = '';
  //     for (let i = event.resultIndex; i < event.results.length; i++) {
  //       const transcript = event.results[i][0].transcript;
  //       if (event.results[i].isFinal) {
  //         this.transcription += transcript + ' '; // Add final result to transcription
  //       } else {
  //         interimTranscription += transcript; // Collect interim result
  //       }
  //     }

  //     // Display the transcription below the question
  //     const displayText = this.transcription + interimTranscription;
  //     const transcriptionElement = document.getElementById('transcription');
  //     if (transcriptionElement) {
  //       transcriptionElement.innerText = displayText.trim();
  //     }
  //   };

  //   this.recognition.onerror = (event: any) => {
  //     console.error('Speech recognition error:', event.error);
  //     if (event.error === 'no-speech' || event.error === 'audio-capture') {
  //       console.warn('No speech detected. Restarting recognition...');
  //       this.recognition.stop();
  //       this.recognition.start(); // Gracefully restart
  //     }
  //   };

  //   this.recognition.onend = () => {
  //     console.warn('Speech recognition ended. Restarting...');
  //     this.recognition.start(); // Restart on end
  //   };

  //   this.recognition.start(); // Start recognition
  // }

  initializeSpeechRecognition(): void {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.toastr.error('Speech Recognition is not supported in this browser.');
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true; // Enable continuous recognition
    this.recognition.interimResults = true; // Enable interim results

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscription = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.transcription += transcript + ' '; // Append final result
        } else {
          interimTranscription += transcript; // Collect interim result
        }
      }

      // Display the transcription below the question
      const displayText = this.transcription + interimTranscription;
      const transcriptionElement = document.getElementById('transcription');
      // if (transcriptionElement) {
      //   transcriptionElement.innerText = displayText.trim();
      // }
      if (transcriptionElement) {
        transcriptionElement.innerText = (
          this.transcription + interimTranscription
        ).trim();
      }
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'no-speech' || event.error === 'audio-capture') {
        console.warn(
          'No speech detected or microphone issue. Restarting recognition...'
        );
        this.restartSpeechRecognition();
      }
    };

    this.recognition.onend = () => {
      console.warn('Speech recognition ended unexpectedly. Restarting...');
      this.restartSpeechRecognition();
    };

    this.recognition.start(); // Start recognition
  }

  restartSpeechRecognition(): void {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition.start();
    }
  }
  handleNoQuestions(): void {
    this.toastr.warning(
      'No questions available. Redirecting to upload page in 1 minute.'
    );

    this.redirectTimeout = setTimeout(() => {
      this.toastr.error(
        'Please upload your questions in the correct Excel format.',
        'No Questions Found'
      );
      this.router.navigate(['/file-import']); // Redirect to the file upload page
    }, 30000); // Redirect after 1 minute
  }

  startQuestionTimer(): void {
    this.setCurrentQuestion();
    this.resetCountdown();
    this.intervalSubscription = interval(60000).subscribe(() => {
      this.saveAnswer();
      this.questionIndex++;
      if (this.questionIndex < this.questions.length) {
        this.setCurrentQuestion();
        this.resetCountdown();
        this.restartSpeechRecognition();
      } else {
        this.stopQuestionTimer();
        this.isSubmitVisible = true; // Show the submit button
      }
    });
  }

  setCurrentQuestion(): void {
    this.currentQuestion = this.questions[this.questionIndex];
    this.transcription = '';
  }
  saveAnswer(): void {
    if (this.currentQuestion) {
      this.answers.push({
        questionId: this.currentQuestion.id,
        answer: this.transcription.trim(),
      });
    }
  }
  stopQuestionTimer(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
    if (this.countdownInterval) {
      this.countdownInterval.unsubscribe();
      this.countdownInterval = null;
    }
  }
  resetCountdown(): void {
    if (this.countdownInterval) {
      this.countdownInterval.unsubscribe(); // Clear any previous interval
    }

    this.timeLeft = 60; // Reset the countdown time
    this.countdownInterval = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--; // Decrement the timer
      }
    });
  }
  // ngOnDestroy(): void {
  //   if (this.videoStream) {
  //     this.videoStream.getTracks().forEach((track) => track.stop());
  //   }
  //   this.stopQuestionTimer();
  // }

  submitAnswers(): void {
    // Add any remaining transcription as the final answer for the last question
    this.saveAnswer();

    // Call your API to submit the answers
    console.log('Submitting answers:', this.answers);

    // Example: Mock API call
    setTimeout(() => {
      this.toastr.success('Answers submitted successfully!');
      this.router.navigate(['/success']); // Navigate to a success page after submission
    }, 1000);
  }
  nextQuestion(): void {
    if (this.questionIndex < this.questions.length - 1) {
      this.questionIndex++;
      this.setCurrentQuestion();
      this.resetCountdown();
      this.restartSpeechRecognition();
    } else {
      this.restartSpeechRecognition();
      // Handle completion of all questions
    }
  }

  ngOnDestroy(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
    if (this.videoStream) {
      this.videoStream.getTracks().forEach((track) => track.stop());
    }
    if (this.countdownInterval) {
      this.countdownInterval.unsubscribe();
    }
    this.stopQuestionTimer();
  }
}
