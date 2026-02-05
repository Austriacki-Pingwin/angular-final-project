import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { type Skill } from '../../../../models/blocks.model';
import { ProfileService } from '../../../../services/profile.service';
import { ProfileBlockComponent } from '../../profile-block/profile-block.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ProfileBlockComponent,
    AsyncPipe,
  ],
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
})
export class SkillsFormComponent {
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
        ...this.form.getRawValue(),
      })
      .subscribe({
        error: (err) => {
          console.error('Create skill block failed', err);
        },
      });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
