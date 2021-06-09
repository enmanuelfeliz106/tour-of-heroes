import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from 'src/app/interfaces/hero';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss'],
})
export class HeroDetailsComponent implements OnInit {

  @Input() selectedHero;

  @Output() message: EventEmitter<string> = new EventEmitter();

  buttonTitle = 'Do Something';

  constructor() { }

  ngOnInit() {}

  doSomething(){
    alert("Let's do it!");
  }

}
