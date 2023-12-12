import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-email',
  //standalone: true,
  //imports: [CommonModule],
  templateUrl: './info-email.component.html',
  styleUrl: './info-email.component.css'
})
export class InfoEmailComponent {
  @Input() infoMessage!: string;
  @Output() closeModal = new EventEmitter<void>();

  public close(): void {
    this.closeModal.emit();
  }
}
