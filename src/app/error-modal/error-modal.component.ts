import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent {
  @Input() errorMessage!: string;
  @Output() closeModal = new EventEmitter<void>();

  public close(): void {
    this.closeModal.emit();
  }
}
