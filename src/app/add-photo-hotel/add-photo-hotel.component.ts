import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HotelService} from "../services/hotel-service";

@Component({
  selector: 'app-add-photo-hotel',
  templateUrl: './add-photo-hotel.component.html',
  styleUrl: './add-photo-hotel.component.css'
})
export class AddPhotoHotelComponent {
  selectedFile?: File;
  preview: string = '';

  errorMessage: string = '';

  infoMessage: string = '';
  isInfoMessage: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddPhotoHotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {hotelId: number},
    private hotelService: HotelService
  ) {}

  onFilesSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.preview = '';

    if(this.selectedFile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.preview = e.target.result;
        }

        reader.readAsDataURL(this.selectedFile);
    }
  }

  onUpload() {
    if(!this.selectedFile){
      return;
    }

    this.hotelService.addImageToHotel(this.data.hotelId, this.selectedFile)
      .subscribe({
        next: (value) => {
          this.showInfo(value.message);

          setTimeout(() => {
            location.reload();
          }, 2000);
        },
        error: () => {
          this.errorMessage = 'An error occurred during adding the room';
        }
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  public showInfo(message:string): void {
    this.isInfoMessage = true;
    this.infoMessage = message;
  }

  public closeModal(): void {
    this.isInfoMessage = false;
    this.infoMessage = '';
  }

}
