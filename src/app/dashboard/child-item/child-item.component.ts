import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-child-item',
  templateUrl: './child-item.component.html',
  styleUrls: ['./child-item.component.css']
})
export class ChildItemComponent implements OnInit {
  @Input() items: any[];
@Input() lang:any;
@Input() btnSelected:any = true;
@Output() selectedBtn = new EventEmitter<boolean>();
selectedSubmenuIndex: number | null = null;

  @ViewChild('childMenu') public childMenu;
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, public router: Router) { 
    console.log('constructor' , this.btnSelected);
    this.matIconRegistry.addSvgIcon(
    'prefiler_items',
    this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/prefiler_items.svg')
  );
  }

  ngOnChanges() {
    console.log('ngOnChanges', this.btnSelected); 
    console.log('selectedSubmenuIndex in ngOnChanges', this.selectedSubmenuIndex); 
    // this.selectedSubmenuIndex = null; // Reset the selected submenu index when items change
    this.selectedBtn.emit(this.selectedSubmenuIndex !== null ? true : false);

  }
  ngOnInit() {    
  }
  openCard(e,index){
    
    console.log(e);
    console.log(index);
    console.log(this.items[index].openCardFlag);
    if(this.items[index].openCardFlag){
      this.items[index].openCardFlag =0;
    }
    else{
      this.items[index].openCardFlag = 1;
    }
  }

  emitSelected(index: number) {
    console.log(index);
    
    this.selectedSubmenuIndex = index;
    this.selectedBtn.emit(this.selectedSubmenuIndex !== null ? true : false);
  }
}
