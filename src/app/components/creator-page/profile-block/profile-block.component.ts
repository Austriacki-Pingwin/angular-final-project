import { Component, computed, inject, input, model, type OnInit } from '@angular/core';
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

import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { CvService } from '../../../services/cv.service';
import { ActivatedRoute } from '@angular/router';
import { AboutFormComponent } from '../profile-tabs/about-form/about-form.component';
import { EducationFormComponent } from '../profile-tabs/education-form/education-form.component';
import { ExperienceFormComponent } from '../profile-tabs/experience-form/experience-form.component';
import { LanguageFormComponent } from '../profile-tabs/language-form/language-form.component';
import { LinkFormComponent } from '../profile-tabs/link-form/link-form.component';
import { PersonalFormComponent } from '../profile-tabs/personal-form/personal-form.component';
import { PhotoFormComponent } from '../profile-tabs/photo-form/photo-form.component';
import { SkillsFormComponent } from '../profile-tabs/skills-form/skills-form.component';
import { TranslatePipe } from '@ngx-translate/core';

const PROFILE_BLOCK_COMPONENTS: Record<ProfileBlockType, Type<unknown>> = {
  photo: PhotoFormComponent,
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
  imports: [
    ProfileBlockItemComponent,
    MatIconButton,
    MatIcon,
    AsyncPipe,
    MatButton,
    MatSlideToggle,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './profile-block.component.html',
  styleUrl: './profile-block.component.scss',
})
export class ProfileBlockComponent implements OnInit {
  private profileService = inject(ProfileService);
  private cvService = inject(CvService);
  public blockType = input.required<ProfileBlockType>();
  public blockData$!: Observable<ProfileBlockItem[]>;
  public formComponent = computed(() => PROFILE_BLOCK_COMPONENTS[this.blockType()]);
  private activatedRoute = inject(ActivatedRoute);
  public cvId = this.activatedRoute.snapshot.paramMap.get('cvId') ?? '';

  public readonly checked = model(false);

  public ngOnInit(): void {
    this.blockData$ = this.cvService.getBlockDataForProfile(this.blockType(), this.cvId);
  }

  private dialog = inject(MatDialog);

  public onToggle(itemId: string, isChecked: boolean): void {
    if (isChecked) {
      this.cvService.addBlockToCv(this.blockType(), itemId, this.cvId).subscribe();
    } else {
      this.cvService.deleteBlockFromCv(this.blockType(), itemId, this.cvId).subscribe();
    }
  }

  public removeItem(itemId: string): void {
    const ref = this.dialog.open(DialogComponent, {
      data: {
        component: DeleteItemComponent,
        inputs: {
          itemId: itemId,
          cvId: this.cvId,
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
