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
    trigger('openClose', [
      // ...
      state('open', style({
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        backgroundColor: 'green'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
      transition('* => closed', [
        animate('1s')
      ]),
      transition('* => open', [
        animate('0.5s')
      ]),
      transition('open <=> closed', [
        animate('0.5s')
      ]),
      transition('* => open', [
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
  isOpen = true;

  words: Word[] = [];
  chosenWord: Word;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.getWords();
  }

  getWords(): void {
    this.wordService.getWords().subscribe(words => {
      this.words = words.slice(0, 3);
      this.chooseWord();
    });
  }

  // Animations
  toggle() {
    this.isOpen = !this.isOpen;
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
      console.log('Right answer!');
    }
  }
}
