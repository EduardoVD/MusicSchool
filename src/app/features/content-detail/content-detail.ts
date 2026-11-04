import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { map, switchMap } from "rxjs";
import { ContentService } from "../../core/services/content";

@Component({
  selector: "app-content-detail",
  imports: [AsyncPipe, CurrencyPipe, RouterLink],
  templateUrl: "./content-detail.html",
  styleUrl: "./content-detail.css",
})
export class ContentDetail {
  readonly conteudo$;

  constructor(route: ActivatedRoute, conteudosService: ContentService) {
    this.conteudo$ = route.paramMap.pipe(
      map((parametros) => Number(parametros.get("id"))),
      switchMap((id) => conteudosService.buscarPorId(id)),
    );
  }
}

export { ContentDetail as DetalheConteudo };
