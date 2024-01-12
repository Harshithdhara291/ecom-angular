import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>, private router:Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  logout(){
      localStorage.removeItem("token");
      this.onNoClick()
      this.router.navigate(['/login']); 
      
  }

}
