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
    if (!this.attemptedToAnswer) {
      this.wordService.getWords().subscribe(words => {
        this.words = this.shuffle(words);
        this.chooseWord();
      });
    } else {
      this.shuffle(this.words);
      this.chooseWord();
    }
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
    }
    if (!this.attemptedToAnswer || this.privateAnsweredRight) {
      console.log('Words to learn: ' + this.privateWords.length);
      this.chosenWord = this.privateWords[Math.floor(Math.random() * this.privateWords.length)];
    }
    console.log('Please find: ' + this.chosenWord.name);
  }

  // FINALIZE
  putLearnedWord(word: Word): void {
    this.wordService.putLearnedWord(word)
      .subscribe();
  }

  onAnswered(answeredRight: boolean) {
    this.attemptedToAnswer = true;

    if (answeredRight) {
      console.log('Answered right!');
      this.privateAnsweredRight = true;

      this.putLearnedWord(this.chosenWord);

      if (this.privateWords.length > 1) {
        console.log('Removing ' + this.chosenWord.name.toLowerCase() +
          ' from the list of words to learn');
        this.privateWords = this.privateWords.filter(obj => obj !== this.chosenWord);
      } else {
        console.log('All words have been learnt. Starting with new words.');
        // !!! REPLACE BELOW WITH PROPER REQUEST FOR NEW WORDS !!!
        this.privateWords = [];
        this.attemptedToAnswer = false;
      }

    } else {
      console.log('Answered wrong. Try again.');
      this.privateAnsweredRight = false;
    }
  }

  onChildAnimationDone(animationDone: boolean) {
    console.log('Parent triggered on child animation event');
    this.ngOnInit();
  }
}
