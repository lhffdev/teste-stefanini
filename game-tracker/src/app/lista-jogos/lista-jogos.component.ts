import { Component, OnInit } from '@angular/core';
import { Jogo } from '../interfaces/jogo';
import { JogosService } from '../services/jogos.service';

@Component({
  selector: 'app-lista-jogos',
  templateUrl: './lista-jogos.component.html',
  styleUrls: ['./lista-jogos.component.scss']
})
export class ListaJogosComponent implements OnInit {

  jogos: Jogo[];
  procurar: string;

  constructor(
    private jogosService: JogosService
  ) { }

  ngOnInit() {
    this.jogosService.jogos.subscribe(jogos => {
      this.jogos = jogos.map(jogo => {
        return {...jogo, discountPercentage: this.calcularPorcentagemDesconto(jogo)}
      });
    });

    this.ordernarJogos('porcentagem-de-desconto');
  }

  get listaJogos(): Jogo[] {
    if (!this.procurar) return this.jogos;

    return this.jogos.filter(jogo => jogo.title.toUpperCase().includes(this.procurar.toUpperCase()));
  }

  calcularPorcentagemDesconto(jogo: Jogo): number {
    return Math.round(100 - parseFloat(jogo.salePrice) * 100 / parseFloat(jogo.normalPrice));
  }

  ordernarJogos(tipoDeOrdenacao: string) {
    this.jogos.sort((jogo1, jogo2) => {
      switch (tipoDeOrdenacao) {
        case 'porcentagem-de-desconto':
          if (jogo1.discountPercentage > jogo2.discountPercentage) return -1;
          if (jogo1.discountPercentage < jogo2.discountPercentage) return 1;
          return 0;
        case 'maior-preco':
          if (parseFloat(jogo1.salePrice) > parseFloat(jogo2.salePrice)) return -1;
          if (parseFloat(jogo1.salePrice) < parseFloat(jogo2.salePrice)) return 1;
          return 0;
        case 'menor-preco':
          if (parseFloat(jogo1.salePrice) < parseFloat(jogo2.salePrice)) return -1;
          if (parseFloat(jogo1.salePrice) > parseFloat(jogo2.salePrice)) return 1;
          return 0;
        case 'titulo':
          if (jogo1.title < jogo2.title) return -1;
          if (jogo1.title > jogo2.title) return 1;
          return 0;
        default:
          return 0;
      }
    });
  }
}
