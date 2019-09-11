import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { WordService } from '../word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.css']
})
export class WordsComponent implements OnInit {

  words: Word[];

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.getWords();
  }

  getWords(): void {
    this.wordService.getWords()
      .subscribe(words => this.words = words);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.wordService.addWord({ name } as Word)
      .subscribe(word => {
        this.words.push(word);
      });
  }

  delete(word: Word): void {
    this.words = this.words.filter(h => h !== word);
    this.wordService.deleteWord(word).subscribe();
  }

}
