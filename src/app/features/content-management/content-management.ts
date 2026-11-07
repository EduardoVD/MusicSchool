import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ContentService } from "../../core/services/content";

@Component({
  selector: "app-content-management",
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./content-management.html",
  styleUrl: "./content-management.css",
})
export class ContentManagement {
  private fb =inject(FormBuilder);
  private contentService = inject(ContentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingId: string | null = null;
  loading = false;
  loadingData = false;
  succesMessage = "";
  errorMessage = ""; 

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    type: ['', [Validators.required, Validators.minLength(15)]],
    mark: ['', [Validators.required]],
    assetNumber: ['', [Validators.required]],
    stateConservation: ['', [Validators.required]],
    acquisitionDate: ['', [Validators.required]],
    loanAvailable: ['', [Validators.required]],
  });

  ngOninit(): void {
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
          loanAvailable: content.loanAvailable
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
    this.succesMessage = "";
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
      loanAvailable: formValue.loanAvailable
    }
    if (this.editingId !== null) {
      
    }
  }
}
