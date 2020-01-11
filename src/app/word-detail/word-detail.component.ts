import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { WordService } from '../word.service';
import { Word } from '../word';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {
  @Input() word: Word;

  constructor(
    private route: ActivatedRoute,
    private wordService: WordService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getWord();
  }

  getWord(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Requesting word with ID: ' + id);
    this.wordService.getWord(id).subscribe(word => this.word = word);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log('Updating word: ' + this.word.name);
    this.wordService.updateWord(this.word).subscribe(() => this.goBack());
  }

}
