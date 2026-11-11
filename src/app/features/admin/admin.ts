import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { ContentService } from "../../core/services/content";
import { Content } from "../../core/models/content";

@Component({
  selector: "app-admin",
  imports: [RouterLink],
  templateUrl: "./admin.html",
  styleUrl: "./admin.css",
})
export class Admin {
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

  edit(id: string): void {
    this.router.navigate(["/admin/form"], {
      queryParams: {id},
    })
  }

  remove(id:string): void {
    const confirmDelete = confirm("Está certo isso Ariel?");
    if (!confirmDelete) {
      return
    }

    this.ContentService.delete(id).subscribe({
      next: () => {
        this.sucessMessage = "Conteúdo removido com sucesso!"
        this.loadContents();
        setTimeout(() => {
          this.sucessMessage = "";
        }, 2000);
      },
      error: () => {
        this.errorMessage = "Erro ao remover conteúdo."
      }
    })
  }
}
