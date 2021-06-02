import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'powerUp'
})
export class PowerUpPipe implements PipeTransform {

  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }

  /**En las propiedades del pipe lo puedes declarar como impuro
   * 
   * While an impure pipe can be useful, be careful using one. A long-running impure pipe could dramatically slow down your application.
   * 
      * <div *ngFor="let hero of (heroes | flyingHeroesImpure)">
          {{hero.name}}
        </div>
   */

}
