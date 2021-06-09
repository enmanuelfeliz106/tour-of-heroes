import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Hero} from 'src/app/interfaces/hero';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {

  hero: Hero;
  selectedHero: Hero;
  heroesFromMarvel;

  location;

  factor: number = 1;

  // slideOpts = {
  //   on: {
  //     beforeInit() {
  //       const swiper = this;
  //       swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
  //       swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
  //       const overwriteParams = {
  //         slidesPerView: 1,
  //         slidesPerColumn: 1,
  //         slidesPerGroup: 1,
  //         watchSlidesProgress: true,
  //         spaceBetween: 0,
  //         virtualTranslate: true,
  //       };
  //       swiper.params = Object.assign(swiper.params, overwriteParams);
  //       swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
  //     },
  //     setTranslate() {
  //       const swiper = this;
  //       const { $, slides, rtlTranslate: rtl } = swiper;
  //       for (let i = 0; i < slides.length; i += 1) {
  //         const $slideEl = slides.eq(i);
  //         let progress = $slideEl[0].progress;
  //         if (swiper.params.flipEffect.limitRotation) {
  //           progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
  //         }
  //         const offset$$1 = $slideEl[0].swiperSlideOffset;
  //         const rotate = -180 * progress;
  //         let rotateY = rotate;
  //         let rotateX = 0;
  //         let tx = -offset$$1;
  //         let ty = 0;
  //         if (!swiper.isHorizontal()) {
  //           ty = tx;
  //           tx = 0;
  //           rotateX = -rotateY;
  //           rotateY = 0;
  //         } else if (rtl) {
  //           rotateY = -rotateY;
  //         }
  
  //          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;
  
  //          if (swiper.params.flipEffect.slideShadows) {
  //           // Set shadows
  //           let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
  //           let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
  //           if (shadowBefore.length === 0) {
  //             shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
  //             $slideEl.append(shadowBefore);
  //           }
  //           if (shadowAfter.length === 0) {
  //             shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
  //             $slideEl.append(shadowAfter);
  //           }
  //           if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
  //           if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
  //         }
  //         $slideEl
  //           .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  //       }
  //     },
  //     setTransition(duration) {
  //       const swiper = this;
  //       const { slides, activeIndex, $wrapperEl } = swiper;
  //       slides
  //         .transition(duration)
  //         .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
  //         .transition(duration);
  //       if (swiper.params.virtualTranslate && duration !== 0) {
  //         let eventTriggered = false;
  //         // eslint-disable-next-line
  //         slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
  //           if (eventTriggered) return;
  //           if (!swiper || swiper.destroyed) return;
  
  //           eventTriggered = true;
  //           swiper.animating = false;
  //           const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
  //           for (let i = 0; i < triggerEvents.length; i += 1) {
  //             $wrapperEl.trigger(triggerEvents[i]);
  //           }
  //         });
  //       }
  //     }
  //   }
  // };

  constructor(private locationObj: Location, private modalCtrl: ModalController) { 
    this.location = locationObj;
  }

  ngOnInit() {
    this.hero = {
      id: 1234567,
      name: 'Superman'
    };

    this.loadHeroes().then(res => this.heroesFromMarvel = res.data.results);
  }

  async editHero(hero){
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      cssClass: 'modal-edit-hero',
      componentProps: {
        "hero": hero
      }
    });

    modal.onDidDismiss().then(hero => {

      this.hero = hero.data;
    });

    return await modal.present();
  }


  deleteHero(heroIndex: number){
    this.heroesFromMarvel.splice(heroIndex, 1);
  }


  selectHero(hero: Hero){
   this.selectedHero = hero;
    
  }


  async loadHeroes(){

    const headers: Headers = new Headers({
      'Content-Type': 'application/json'
    });

    const request = await fetch('https://gateway.marvel.com:443/v1/public/characters?limit=99&ts=1&apikey=7c66a9dad9d08a326a98dd95924785f4&hash=132f71163b67f60f9063317b076a66fe', {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    });

    return request.json();

  }

  showMessage(message){
    alert(message);
  }

}
