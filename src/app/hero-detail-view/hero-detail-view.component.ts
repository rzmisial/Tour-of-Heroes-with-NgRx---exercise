import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Hero } from '../hero';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hero-detail-view',
  templateUrl: './hero-detail-view.component.html',
  styleUrls: ['./hero-detail-view.component.styl']
})
export class HeroDetailViewComponent implements OnInit {

  @Output() heroChange: EventEmitter<Hero> = new EventEmitter();

  heroForm = this.fb.group({
    id: '',
    name: ''
  });

  _hero: Hero;
  @Input()
  set hero(h: Hero){
    if (h) {
      this._hero = h;
      this.heroForm.patchValue(h);
    }
  }

  get hero(): Hero {
    return this._hero;
  }

  save(){
    this.hero = this.heroForm.value;
    this.heroChange.emit(this._hero);
  }

  goBack(): void {
    this.location.back();
  }

  constructor(
    private fb: FormBuilder,
    private location: Location) { }

  ngOnInit() {
  }

}
