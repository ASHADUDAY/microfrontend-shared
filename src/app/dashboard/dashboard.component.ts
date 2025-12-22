import { Component, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from "../modal/modal.component";
import { FILERS_LIST } from "../config/filers";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  filersList = [] as any;
  sidebarOpen: boolean = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.filersList = FILERS_LIST;
    window.addEventListener("sidebarToggle", (event: any) => {
      console.log(event);

      const isSidebarOpen = event.detail.isOpen;
      this.sidebarOpen = isSidebarOpen;
      // Apply layout change
      this.updateLayoutBasedOnSidebar(isSidebarOpen);
    });
  }

  handleFilerClick(filer: any): void {
    console.log(filer);
    if (filer.hasModal) {
      this.openDialog();
    }
  }
  openDialog(): void {
    console.log("dialog called");

    const dialogRef = this.dialog.open(ModalComponent, {
      position: { top: "-40%", left: "45%" },
      panelClass: "custom-dialog-container",
      data: {
        modalHeader: "Select a Service",
        type: "SA-Filer",
        filerRoutes: [
          {
            title: "Transnet",
            icon: "Transnet",
            route: "/sa-prefiler/transnet",
          },
          {
            title: "ShipShape",
            icon: "ShipShape",
            route: "/sa-prefiler/filer-details",
          },
        ],
      },
    });
    console.log(dialogRef);

    // this.dialog.open(ModalComponent, {
    //   width: "400px", // Set an appropriate size
    //   data: {
    //     title: "Select a Service",
    //     message: "Please select a service to submit your EDI documents to:",
    //     transnetRoute: "/sa-prefiler/Transnet",
    //     shipShapeRoute: "/sa-prefiler/filer-details",
    //   },
    // });
  }

  updateLayoutBasedOnSidebar(isSidebarOpen: any) {
    const exampleContainers = document.getElementsByClassName("main-container");
    const innerWidth = window.innerWidth;

    if (isSidebarOpen && innerWidth > 767) {
      for (let i = 0; i < exampleContainers.length; i++) {
        (exampleContainers[i] as HTMLElement).style.marginLeft = "250px";
      }
    } else {
      for (let i = 0; i < exampleContainers.length; i++) {
        (exampleContainers[i] as HTMLElement).style.marginLeft = "0px";
      }
    }
  }
}
