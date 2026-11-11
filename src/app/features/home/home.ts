import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { map } from "rxjs";
import { ContentService } from "../../core/services/content";

@Component({
  selector: "app-home",
  imports: [RouterLink, AsyncPipe],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  // Ajustando o nome do parâmetro para 'contents':
  readonly conteudosDestaque$;
  constructor(contentsService: ContentService) {
    this.conteudosDestaque$ = contentsService
      .getAll()
      .pipe(map((contents) => contents.slice(0, 10)));
  }
  moverCarrossel(trilho: HTMLElement, direcao: number): void {
    trilho.scrollBy({ left: direcao * 340, behavior: "smooth" });
  }
}
