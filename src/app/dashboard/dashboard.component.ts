import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { WordService } from '../word.service';
import { trigger, transition, state, animate, style, AnimationEvent  } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    // animation triggers go here
    trigger('rightWrong', [
      // ...
      state('undefined', style({
      })),
      state('right', style({
        backgroundColor: 'green'
      })),
      state('wrong', style({
        backgroundColor: 'red'
      })),
      transition('right => wrong', [
        animate('1s')
      ]),
      transition('wrong => right', [
        animate('0.5s')
      ]),
      transition('* => wrong', [
        animate('1s')
      ]),
      transition('* => right', [
        animate('0.5s')
      ]),
      transition('right <=> wrong', [
        animate('0.5s')
      ]),
      transition('* => right', [
        animate('1s',
          style({ opacity: '*' }),
        ),
      ]),
      transition('* => *', [
        animate('1s')
      ]),
    ]),
  ]
})
export class DashboardComponent implements OnInit {

  // Animations
  isRight = undefined;

  words: Word[] = [];
  chosenWord: Word;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.getWords();
  }

  getWords(): void {
    this.wordService.getWords().subscribe(words => {
      this.words = this.shuffle(words.slice(0, 3));
      // Shuffle elements

      this.chooseWord();
    });
  }

  shuffle(array): Word[] {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      const temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // The answer
  chooseWord(): void {
    this.chosenWord = this.words[Math.floor(Math.random() * this.words.length)];
    console.log('Please find: ' + this.chosenWord.name);
  }

  // Check if we clicked on the answer
  checkWord(word: Word): void {
    if (!this.chosenWord) {
      this.chooseWord();
    }
    console.log('Clicked on: ' + word.name);
    if (this.chosenWord.id === word.id) {
      this.isRight = true;
      console.log('Right answer!');
    } else {
      this.isRight = false;
    }
  }
}
