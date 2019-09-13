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
  chosenWord: Word;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.getWords();
  }

  getWords(): void {
    this.wordService.getWords().subscribe(words => {
      this.words = this.shuffle(words.slice(0, 3));
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

}
