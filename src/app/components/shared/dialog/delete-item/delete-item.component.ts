import { Component, inject, input, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { type ProfileBlockType } from '../../../../models/collections.model';
import { ProfileService } from '../../../../services/profile.service';
import { CvService } from '../../../../services/cv.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-dashboard',
  imports: [MatButton],
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
  //public cvId = this.activatedRoute.snapshot.paramMap.get('cvId') ?? '';
  public deleteItem(): void {
    this.dialogRef.close({ saved: true });
    this.cvService.deleteBlockFromCv(this.blockType(), this.itemId(), this.cvId()).subscribe();
    this.profileService.deleteBlock(this.blockType(), this.itemId()).subscribe();
  }
}
