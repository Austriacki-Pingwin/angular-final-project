import { Component, inject } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { BlockPageComponent } from '../block-page.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { type Skill } from '../../../models/blocks.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-skills-block',
  imports: [
    ReactiveFormsModule,
    BlockPageComponent,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './skills-block.component.html',
  styleUrl: './skills-block.component.scss',
})
export class SkillsBlockComponent {
  private profileService = inject(ProfileService);

  public skills$ = this.profileService.getBlocks<Skill>('skills');

  public form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public save(): void {
    if (this.form.invalid) return;

    this.profileService
      .createBlock('skills', {
        id: crypto.randomUUID(),
        title: this.form.value.title,
      })
      .subscribe({
        next: () => {
          this.form.reset();
        },
      });

    this.form.reset();
  }
}
