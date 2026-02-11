import { Component, computed, inject, input, type OnInit } from '@angular/core';
import { ProfileBlockItemComponent } from './profile-block-item/profile-block-item.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { ProfileService } from '../../../services/profile.service';
import type { ProfileBlockItem, ProfileBlockType } from '../../../models/collections.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteItemComponent } from '../../shared/dialog/delete-item/delete-item.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { take, type Observable } from 'rxjs';
import type { Type } from '@angular/core';
import { PersonalFormComponent } from '../profile-form/personal-form/personal-form.component';
import { AboutFormComponent } from '../profile-form/about-form/about-form.component';
import { EducationFormComponent } from '../profile-form/education-form/education-form.component';
import { ExperienceFormComponent } from '../profile-form/experience-form/experience-form.component';
import { SkillsFormComponent } from '../profile-form/skills-form/skills-form.component';
import { LinkFormComponent } from '../profile-form/link-form/link-form.component';
import { LanguageFormComponent } from '../profile-form/language-form/language-form.component';

const PROFILE_BLOCK_COMPONENTS: Record<ProfileBlockType, Type<unknown>> = {
  personal: PersonalFormComponent,
  skills: SkillsFormComponent,
  education: EducationFormComponent,
  experience: ExperienceFormComponent,
  about: AboutFormComponent,
  links: LinkFormComponent,
  languages: LanguageFormComponent,
};

@Component({
  selector: 'app-profile-block',
  imports: [ProfileBlockItemComponent, MatIconButton, AsyncPipe, MatIcon, AsyncPipe, MatButton],
  templateUrl: './profile-block.component.html',
  styleUrl: './profile-block.component.scss',
})
export class ProfileBlockComponent implements OnInit {
  private profileService = inject(ProfileService);
  public blockType = input.required<ProfileBlockType>();
  public blockData$!: Observable<ProfileBlockItem[]>;
  public formComponent = computed(() => PROFILE_BLOCK_COMPONENTS[this.blockType()]);
  public ngOnInit(): void {
    this.blockData$ = this.profileService.getBlocks<ProfileBlockItem>(this.blockType());
  }

  private dialog = inject(MatDialog);

  public removeItem(itemId: string): void {
    const ref = this.dialog.open(DialogComponent, {
      data: {
        component: DeleteItemComponent,
        inputs: {
          itemId: itemId,
          blockType: this.blockType(),
        },
      },
    });
    ref.afterClosed().subscribe();
  }

  public editItem(itemId: string): void {
    this.profileService
      .getBlock<ProfileBlockItem>(this.blockType(), itemId)
      .pipe(take(1))
      .subscribe((item) => {
        const ref = this.dialog.open(DialogComponent, {
          data: {
            component: this.formComponent(),
            inputs: {
              item,
            },
          },
        });

        ref.afterClosed().subscribe((value?: ProfileBlockItem) => {
          if (!value) return;

          this.profileService.updateBlock(this.blockType(), itemId, value).subscribe();
        });
      });
  }

  public addItem(): void {
    const ref = this.dialog.open(DialogComponent, {
      data: {
        component: this.formComponent(),
        inputs: {},
      },
    });

    ref.afterClosed().subscribe((value: ProfileBlockItem) => {
      if (value === undefined) return;
      this.profileService.createBlock(this.blockType(), value).subscribe();
    });
  }
}
