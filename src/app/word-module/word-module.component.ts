import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, state, animate, style, AnimationEvent } from '@angular/animations';

import { Word } from '../word';

@Component({
  selector: 'app-word-module',
  templateUrl: './word-module.component.html',
  styleUrls: ['./word-module.component.css'],
  animations: [
    // animation triggers go here
    trigger('rightWrong', [
      // ...
      state('default', style({
      })),
      state('right', style({
      })),
      state('wrong', style({
      })),
      transition('* => default', [
        style({ opacity: 0.5, backgroundColor: '*' })
      ]),
      transition('* => right', [
        style({ opacity: 0.5, backgroundColor: 'green'}),
        animate('2s', style({opacity: 1}))
      ]),
      transition('* => wrong', [
        style({ opacity: 0.5, backgroundColor: 'red' }),
        animate('2s', style({ opacity: 1 }))
      ]),
    ]),
  ]
})
export class WordModuleComponent implements OnInit {

  @Input() word: Word;
  @Input() rightAnswer: Word;
  @Output() answered = new EventEmitter<boolean>();
  @Output() answerAnimationDone = new EventEmitter<boolean>();

  answeredRight: boolean;
  animationDone: boolean;

  // Animations
  animationState = 'default';

  constructor() { }

  ngOnInit() {
    // console.log(this.animationState);
  }

  // Check if we clicked on the answer
  checkAnswer(word: Word): void {
    console.log('Chosen answer: ' + this.word.name);
    if (this.rightAnswer.id === this.word.id) {
      this.animationState = 'right';
      this.answeredRight = true;
    } else {
      this.animationState = 'wrong';
      this.answeredRight = false;
    }
    this.answered.emit(this.answeredRight);
  }

  onAnswerAnimationDone(event: AnimationEvent) {
    this.animationDone = true;
    if (event.toState !== 'default') {
      this.answerAnimationDone.emit(this.animationDone);
    }
    this.animationState = 'default';
  }
}
