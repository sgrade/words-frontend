import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { WordService } from '../word.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  words: Word[] = [];
  private _words: Word[];
  chosenWord: Word;
  attemptedToAnswer = false;
  private _answeredRight: boolean;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.getWords();
  }

  getWords(): void {
    this.wordService.getWords().subscribe(words => {
      this.words = this.shuffle(words.slice(0, 3));
      this.chooseWord();
      console.log('Please find: ' + this.chosenWord.name);
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
    if (!this.attemptedToAnswer) {
      this._words = this.words;
    } else {
      if (!this._answeredRight) {
        console.log('Answered wrong. Try again.');
      } else {
        console.log('Answered right!');
        if (this._words.length > 1) {
          console.log('Removing ' + this.chosenWord.name.toLowerCase() +
            ' from the list of words to learn');
          this._words = this._words.filter(obj => obj !== this.chosenWord);
        } else {
          console.log('All words have been learnt. Starting with new words.');
          // !!! REPLACE BELOW WITH PROPER REQUEST FOR NEW WORDS !!!
          this._words = this.words;
          this.attemptedToAnswer = false;
        }
      }
    }
    if (!this.attemptedToAnswer || this._answeredRight) {
      console.log('Words to learn: ' + this._words.length);
      this.chosenWord = this._words[Math.floor(Math.random() * this._words.length)];
    }
  }

  onAnswered(answeredRight: boolean) {
    this.attemptedToAnswer = true;
    if (answeredRight) {
      this._answeredRight = true;
    } else {
      this._answeredRight = false;
    }
    this.ngOnInit();
  }

}
