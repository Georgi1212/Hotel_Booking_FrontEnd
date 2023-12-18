import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog-delete',
  templateUrl: './confirm-dialog-delete.component.html',
  styleUrl: './confirm-dialog-delete.component.css'
})
export class ConfirmDialogDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);

    setTimeout(() => {
      location.reload();
    }, 1000);
  }

  onClose(): void {
    this.dialogRef.close(false);

  }

}
