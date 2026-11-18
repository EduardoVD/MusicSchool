import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ContentService } from "../../core/services/content";
import { Content } from "../../core/models/content";

@Component({
  imports: [RouterLink],
  selector: "app-contents",
  templateUrl: "./contents.html",
  styleUrl: "./contents.css",
})

export class Contents {
    private ContentService = inject(ContentService);
  private router = inject(Router);

  contents = signal<Content[]>([]);
  loading = signal(true);
  errorMessage = "";
  sucessMessage = "";

    ngOnInit(): void {
    this.loadContents();
  }

  loadContents(): void {
    this.loading.set(true);
    this.errorMessage = "";
    this.ContentService.getAll().subscribe({
      next: (response) => {
        this.contents.set(response);
        this.loading.set(false);
      },
      error: (error) => {
      this.errorMessage = "Erro ao carregar conteúdos: " + error.message;
      this.loading.set(false);
      }
    })
  }
}

