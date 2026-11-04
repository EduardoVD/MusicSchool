import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-content-management",
  imports: [RouterLink],
  templateUrl: "./content-management.html",
  styleUrl: "./content-management.css",
})
export class ContentManagement {}

export { ContentManagement as ManutencaoConteudo };
