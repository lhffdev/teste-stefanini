import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Jogo } from '../interfaces/jogo';
import { MOCK_LISTA_JOGOS } from '../mock-lista-jogos/mock-lista-jogos';

@Injectable({
  providedIn: 'root'
})
export class JogosService {

  constructor() { }

  get jogos(): Observable<Jogo[]> {
    return of(MOCK_LISTA_JOGOS);
  }
}
