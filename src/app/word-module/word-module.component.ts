import { Component, OnInit, Input } from '@angular/core';
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
      ]),
      transition('* => right', [
        style({ opacity: 1, backgroundColor: 'green'}),
        animate('1s', style({opacity: 0}))
      ]),
      transition('* => wrong', [
        style({ opacity: 1, backgroundColor: 'red' }),
        animate('1s', style({ opacity: 0 }))
      ]),
    ]),
  ]
})
export class WordModuleComponent implements OnInit {

  @Input() word: Word;
  @Input() rightAnswer: Word;

  // Animations
  animationState = 'default';

  constructor() { }

  ngOnInit() {
  }

  // Check if we clicked on the answer
  checkAnswer(word: Word): void {
    console.log('Right answer: ' + this.rightAnswer.name);
    if (this.rightAnswer.id === this.word.id) {
      this.animationState = 'right';
      console.log('Chosen answer: ' + this.word.name);
    } else {
      this.animationState = 'wrong';
      console.log('Chosen answer: ' + this.word.name);
    }
  }

}
