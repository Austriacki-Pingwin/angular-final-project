import type { OnInit } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-skills-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './skills-form.component.html',
  styleUrl: './skills-form.component.scss',
})
export class SkillsFormComponent implements OnInit {
  @Input({ required: true })
  public data!: string[];

  @Output()
  public skillsChange = new EventEmitter<string[]>();

  public form!: FormGroup;
  public skills!: FormArray<FormControl<string>>;

  public ngOnInit(): void {
    this.skills = new FormArray<FormControl<string>>(
      this.data.map((skill) => new FormControl(skill, { nonNullable: true })),
    );

    this.form = new FormGroup({
      skills: this.skills,
    });

    this.form.valueChanges.subscribe((value) => {
      this.skillsChange.emit(value.skills);
    });
  }

  public addSkill(): void {
    this.skills.push(new FormControl('', { nonNullable: true }));
  }

  public removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
}
