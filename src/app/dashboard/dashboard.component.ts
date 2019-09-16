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
  private privateWords: Word[];
  chosenWord: Word;
  attemptedToAnswer = false;
  private privateAnsweredRight: boolean;

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
      this.privateWords = this.words;
    } else {
      if (!this.privateAnsweredRight) {
        console.log('Answered wrong. Try again.');
      } else {
        console.log('Answered right!');
        if (this.privateWords.length > 1) {
          console.log('Removing ' + this.chosenWord.name.toLowerCase() +
            ' from the list of words to learn');
          this.privateWords = this.privateWords.filter(obj => obj !== this.chosenWord);
        } else {
          console.log('All words have been learnt. Starting with new words.');
          // !!! REPLACE BELOW WITH PROPER REQUEST FOR NEW WORDS !!!
          this.privateWords = this.words;
          this.attemptedToAnswer = false;
        }
      }
    }
    if (!this.attemptedToAnswer || this.privateAnsweredRight) {
      console.log('Words to learn: ' + this.privateWords.length);
      this.chosenWord = this.privateWords[Math.floor(Math.random() * this.privateWords.length)];
    }
  }

  onAnswered(answeredRight: boolean) {
    this.attemptedToAnswer = true;
    if (answeredRight) {
      this.privateAnsweredRight = true;
    } else {
      this.privateAnsweredRight = false;
    }
    /*this.ngOnInit();*/
  }

  onChildAnimationDone(animationDone: boolean) {
    console.log('Parent triggered on child animation event');
    this.ngOnInit();
  }
}
