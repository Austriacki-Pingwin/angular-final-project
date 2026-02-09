import { Component, inject, input, signal } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { type ProfileBlockType } from '../../../../models/collections.model';
import { ProfileService } from '../../../../services/profile.service';

@Component({
  selector: 'app-delete-dashboard',
  imports: [MatButton],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.scss',
})
export class DeleteItemComponent {
  public blockType = input.required<ProfileBlockType>();
  public itemId = input.required<string>();
  private profileService = inject(ProfileService);
  private dialogRef = inject(MatDialogRef);
  private router = inject(Router);
  public infoMessage = signal('');
  public hide = signal(true);
  public loading = signal(false);
  public deleteItem(): void {
    this.profileService.deleteBlock(this.blockType(), this.itemId()).subscribe({
      next: () => {
        this.dialogRef.close({ saved: true });
        //his.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Delete item failed', err);
      },
    });
  }
}
