import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() heroName: string;
  @Input() heroId: number;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss({
      name: this.heroName,
      id: this.heroId

    });
  }

  clearInput(){
    this.heroName = '';
  }

}
