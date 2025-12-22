import {
  inject,
  Component,
  Inject,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";
import {
  MatDialogModule,
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
// FormBuilder,
// FormGroup,
// Validators,
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
// import { Router } from "@angular/router";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarConfig } from "@angular/material/snack-bar";
import { SA_FILER_MENU } from "../config/filers";
import { MatCardModule } from "@angular/material/card";
import { RouterLink } from "@angular/router";
// MatSnackBar,
// MatSnackBarHorizontalPosition,
// MatSnackBarVerticalPosition,
// import {
//   catchError,
//   debounceTime,
//   distinctUntilChanged,
//   Subject,
//   tap,
// } from "rxjs";
// import { DynamicTableComponent } from '../../dynamic-table/dynamic-table.component';
@Component({
  standalone: true,
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
  imports: [
    MatCardModule,
    RouterLink,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSelectModule,
  ],
})
export class ModalComponent implements OnInit {
  modalHeader: string = "";
  callType: string = "";
  filerRoutes: any[] = [];
  config = new MatSnackBarConfig();
  readonly dialog = inject(MatDialog);
  sub_menu_list = SA_FILER_MENU;

  constructor(
    // private fb: FormBuilder,
    // private router: Router,
    // private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.modalHeader = data.modalHeader ? data.modalHeader : "";
    this.callType = data.type ? data.type : "";
    console.log(this.modalHeader, "modalHeader");
    console.log(this.callType, "callType");
  }

  ngOnInit() {
    console.log("inside dialog");
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
