import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Jogo } from '../interfaces/jogo';
@Injectable({
  providedIn: 'root'
})
export class JogosService {

  url: string = 'https://www.cheapshark.com/api/1.0/deals';

  constructor(
    private httpClient: HttpClient
  ) { }

  buscarJogos(page: number): Observable<Jogo[]> {
    let params = new HttpParams();
    params = params.append('pageNumber', page.toString());
    params = params.append('pageSize', '12');
    params = params.append('storeID', '1');
    params = params.append('onSale', '1');
    params = params.append('AAA', '1');

    return this.httpClient.get<Jogo[]>(this.url, {params})
      .pipe(
        map(jogos => {
          return this.formatarJogos(jogos);
        })
      );
  }

  formatarJogos(jogos): Jogo[] {
    return jogos.map(jogo => {
      return {
        title: jogo.title,
        salePrice: jogo.salePrice,
        normalPrice: jogo.normalPrice,
        thumb: this.pathThumb(jogo.steamAppID),
        discountPercentage: this.calcularPorcentagemDesconto(jogo)
      }
    })
  }

  pathThumb(steamAppID): string {
    return `https://cdn.akamai.steamstatic.com/steam/apps/${steamAppID}/header.jpg`;
  }

  calcularPorcentagemDesconto(jogo: Jogo): number {
    return Math.round(100 - parseFloat(jogo.salePrice) * 100 / parseFloat(jogo.normalPrice));
  }
}
