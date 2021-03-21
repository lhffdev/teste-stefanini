import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Jogo } from '../interfaces/jogo';
import { JogosService } from '../services/jogos.service';

@Component({
  selector: 'app-lista-jogos',
  templateUrl: './lista-jogos.component.html',
  styleUrls: ['./lista-jogos.component.scss']
})
export class ListaJogosComponent implements OnInit {

  jogos: Jogo[] = [];
  procurar: string;
  page: number = 1;
  pararCarregamentoJogos: boolean = false;
  exibirLoader: boolean = true;
  exibirBotaoDeCarregamento: boolean = false;

  @ViewChild('selectOrdenar')
  selectOrdenar: ElementRef;

  constructor(
    private jogosService: JogosService
  ) { }

  ngOnInit() {
    this.carregarJogos();
  }

  carregarJogos() {
    if (!this.pararCarregamentoJogos) {
      this.exibirLoader = true;

      this.jogosService.buscarJogos(this.page).subscribe(jogos => {
        if (!jogos.length) {
          this.pararCarregamentoJogos = true;
          this.exibirLoader = false;
          this.exibirBotaoDeCarregamento = false;
          return;
        }

        this.jogos = [...this.jogos, ...jogos || []]
        this.page += 1;

        this.ordernarJogos(this.selectOrdenar.nativeElement.value);

        this.exibirLoader = false;
        this.exibirBotaoDeCarregamento = true;
      });
    }
  }

  get listaJogos(): Jogo[] {
    if (!this.procurar) return this.jogos;

    return this.jogos.filter(jogo => jogo.title.toUpperCase().includes(this.procurar.toUpperCase()));
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
