import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ContentService } from "../../core/services/content";

@Component({
  selector: "app-content-management",
  imports: [ReactiveFormsModule],
  templateUrl: "./content-management.html",
  styleUrl: "./content-management.css",
})
export class ContentManagement implements OnInit {
  private fb = inject(FormBuilder);
  private contentService = inject(ContentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  successMessage = "";
  errorMessage = ""; 

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    type: ['', [Validators.required, Validators.minLength(15)]],
    mark: ['', [Validators.required]],
    assetNumber: ['', [Validators.required]],
    stateConservation: ['', [Validators.required]],
    acquisitionDate: ['', [Validators.required]],
    loanAvailable: [true],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get("id");
    if (id) {
      this.editingId = id;
      this.loadContent(id);
    }
  }

  loadContent(id: string): void {
    this.loadingData = true;
    this.contentService.getById(id).subscribe({
      next: (content) => {
        this.form.patchValue({
          name: content.name,
          type: content.type,
          mark: content.mark,
          assetNumber: content.assetNumber,
          stateConservation: content.stateConservation,
          acquisitionDate: content.acquisitionDate,
          loanAvailable: true
        })
        this.loadingData = false
      },
      error: (error) => {
        this.errorMessage = "Erro ao carregar conteúdo: " + error.message;
        this.loadingData = false
      }
    })
  }

  submit(): void {
    this.successMessage = "";
    this.errorMessage = "";
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    const formValue = this.form.getRawValue();
    const contentData = {
      name: formValue.name,
      type: formValue.type,
      mark: formValue.mark,
      assetNumber: formValue.assetNumber,
      stateConservation: formValue.stateConservation,
      acquisitionDate: formValue.acquisitionDate,
      loanAvailable: true
    }
    if (this.editingId !== null) {
      this.contentService.update(this.editingId, contentData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = "Conteúdo atualizado com sucesso!";
          setTimeout(() => {
            this.router.navigate(["/admin"]);
          }, 1000)
        },
        error: () => {
          this.loading = false;
          this.errorMessage = "Erro ao atualizar conteúdo."
        },
      });
      return
    }
    this.contentService.create(contentData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = "Conteúdo criado com sucesso!";
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(["/admin"]);
          }, 1000)
        },
        error: () => {
          this.loading = false;
          this.errorMessage = "Erro ao criar conteúdo."
        },
      });
  }
}
