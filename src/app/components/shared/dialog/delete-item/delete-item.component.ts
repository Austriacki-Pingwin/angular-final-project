import { Component, inject, input, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import type { CV, ProfileBlockType } from '../../../../models/collections.model';
import { ProfileService } from '../../../../services/profile.service';
import { CvService } from '../../../../services/cv.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-dashboard',
  imports: [MatButton, TranslatePipe],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.scss',
})
export class DeleteItemComponent {
  public blockType = input.required<ProfileBlockType>();
  public itemId = input.required<string>();
  public cvId = input.required<string>();
  private profileService = inject(ProfileService);
  private cvService = inject(CvService);
  private dialogRef = inject(MatDialogRef);
  public infoMessage = signal('');
  public hide = signal(true);
  public loading = signal(false);
  public activatedRoute = inject(ActivatedRoute);
  public deleteItem(): void {
    this.dialogRef.close({ saved: true });
    this.profileService
      .getBlocks<CV>('cvs')
      .pipe(take(1))
      .subscribe((cvs) => {
        cvs.map((cv) => {
          const cvId = cv.id;
          this.cvService.deleteBlockFromCv(this.blockType(), this.itemId(), cvId).subscribe();
        });
      });
    this.profileService.deleteBlock(this.blockType(), this.itemId()).subscribe();
  }
}
