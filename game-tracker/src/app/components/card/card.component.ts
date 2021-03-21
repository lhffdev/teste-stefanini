import { Component, Input } from '@angular/core';
import { Jogo } from 'src/app/interfaces/jogo';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  jogo: Jogo;

  labelPorcentagem(): string {
    return parseFloat(this.jogo.salePrice) == 0 ? 'GRÁTIS' : `- ${this.jogo.discountPercentage} %`;
  }
}
