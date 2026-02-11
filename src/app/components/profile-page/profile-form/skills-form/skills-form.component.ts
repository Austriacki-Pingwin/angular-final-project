import { Component, input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { type Skill } from '../../../../models/blocks.model';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { type Observable } from 'rxjs';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
})
export class SkillsFormComponent {
  //public skills$ = this.profileService.getBlocks<Skill>('skills');
  // @Input() initialValue?: AboutFormData;
  public submit = input.required<(value: Skill) => Observable<Skill>>();

  // @Input({ required: true })
  // submit!: (value: AboutFormData) => Observable<unknown>;

  public form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public save(): void {
    if (this.form.invalid) return;

    this.submit()({
      id: crypto.randomUUID(),
      ...this.form.getRawValue(),
    }).subscribe();
    // this.profileService
    //   .createBlock('skills', {
    //     id: crypto.randomUUID(),
    //     ...this.form.getRawValue(),
    //   })
    //   .subscribe({
    //     error: (err) => {
    //       console.error('Create skill block failed', err);
    //     },
    //   });
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
