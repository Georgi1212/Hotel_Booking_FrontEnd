import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RoomService} from "../services/room-service";

@Component({
  selector: 'app-add-photos-room',
  templateUrl: './add-photos-room.component.html',
  styleUrl: './add-photos-room.component.css'
})
export class AddPhotosRoomComponent {
  selectedFiles?: FileList;
  previews: string[] = [];

  errorMessage: string = '';

  infoMessage: string = '';
  isInfoMessage: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddPhotosRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {roomId: number, hotelId: number},
    private roomService: RoomService
  ) {}

  onFilesSelected(event: any) {
    this.selectedFiles = event.target.files;
    this.previews = [];

    if(this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;

      for(let i = 0; i < numberOfFiles; ++i){
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        }

        reader.readAsDataURL(this.selectedFiles[i]);

      }
    }
  }

  onUpload() {
    if(!this.selectedFiles){
      return;
    }

    this.roomService.addPhotosToRoom(this.data.hotelId, this.data.roomId, Array.from(this.selectedFiles))
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
