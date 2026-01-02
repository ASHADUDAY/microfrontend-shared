import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserAuthService } from '../service/userAuth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'navbar-primary-nav',
  templateUrl: './primary-nav.component.html',
  styleUrls: ['./primary-nav.component.css'],
})
export class PrimaryNavComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public translate: TranslateService,
    public router: Router,
    public authService: UserAuthService
  ) {
    this.matIconRegistry.addSvgIcon(
      'export',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/export.svg'
      )
    );
    translate.addLangs(['english', 'spanish']);
    translate.setDefaultLang('english');
    const browserLang = localStorage.getItem('lang') || 'english';
    translate.use(
      browserLang.match(/english|spanish/) ? browserLang : 'english'
    );
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log(event, '<------------ event');

        if (event.url === 'dashboard') {
          this.showDashboard = true;
        } else {
          this.showDashboard = false;
        }
      }
    });
  }
  lang = 'english';
  showDashboard: boolean = false;
  btnSelected: boolean = true;
  sidebarOpen: boolean = false;
  navItems: any[] = [
    {
      displayName: 'Prefiler',
      displayEsName: 'Prefiler',
      iconName: 'export',
      openCardFlag: 0,
      route: 'dashboard',
      // route: 'prefiler-ui/dashboard',
      children: [
        {
          displayName: 'AMS',
          displayEsName: 'prefiler-ui',
          iconName: 'prefiler_items',
          route: '/ams-prefiler/filer-details',
        },
        {
          displayName: 'AFR',
          displayEsName: 'prefiler-ui',
          iconName: 'prefiler_items',
          route: '/afr-prefiler/filer-details',
        },
        {
          displayName: 'AES',
          displayEsName: 'prefiler-ui',
          iconName: 'prefiler_items',
          route: '/aes-prefiler/filer-details',
        },
        {
          displayName: 'ACI',
          displayEsName: 'prefiler-ui',
          iconName: 'prefiler_items',
          route: '/aci-prefiler/filer-details',
        },
        {
          displayName: 'ICS2',
          displayEsName: 'ics2',
          iconName: 'prefiler_items',
          route: '/pre-ics2/filer-details',
        },
        {
          displayName: 'ICS',
          displayEsName: 'ics',
          iconName: 'prefiler_items',
          route: '/ics/filer-details',
        },
      ],
    },
  ];

  officeList = [] as any;
  office;
  // office :any;
  ngOnInit() {
    // if(!localStorage.getItem('DepFlag')){
    //   localStorage.setItem('DepFlag', 'E');
    // }
    this.lang = localStorage.getItem('lang');
    let profile = document.querySelector('.profile');
    let menu = document.querySelector('.menu');
    profile.addEventListener('click', function () {
      menu.classList.toggle('active');
    });
    //  console.log(this.lang);
    document.querySelectorAll('.dropdown-btn').forEach((v) => {
      v.classList.remove('activeMenu');
      v.addEventListener('click', function () {
        console.log(v);
        let activeClass = document.querySelectorAll('.activeMenu');
        console.log(activeClass.length);
        if (activeClass.length) {
          activeClass.forEach((e) => {
            e.classList.remove('activeMenu');
          });
        }
        v.classList.toggle('activeMenu');
        var dropdownContent = this.nextElementSibling;
        var inner = v.querySelector('.mat-icon');
        if (dropdownContent.style.display === 'block') {
          dropdownContent.style.display = 'none';
          inner.innerHTML = 'keyboard_arrow_right';
        } else {
          dropdownContent.style.display = 'block';
          inner.innerHTML = 'keyboard_arrow_down';
        }
      });
    });
    // office List start

    // const authData = JSON.parse( sessionStorage.getItem('permission') || '');
    const authDataStr = sessionStorage.getItem('permission') || '';
    const authData = authDataStr ? JSON.parse(authDataStr) : {};
    this.officeList = authData.userOfficeList;

    this.office = JSON.parse(sessionStorage.getItem('officeId') || '88');
  }
  changeOffices() {
    sessionStorage.setItem('officeId', this.office);
    let data = this.officeList.find((e) => e.office_id == this.office);
    if (data) {
      sessionStorage.setItem('legalEntityId', data.le_id);
    }
    location.reload();
  }
  openCard(e, index) {
    console.log(e);
    console.log(index);
    // console.log(this.navItems[index].openCardFlag);
    console.log('openCard primary-nav btnSelected before', this.btnSelected);
    this.navItems[index].openCardFlag = this.navItems[index].openCardFlag
      ? false
      : true;
    this.btnSelected = index !== null ? true : false;
    console.log('openCard primary-nav btnSelected after', this.btnSelected);
    console.log(this.navItems[index].openCardFlag);
  }

  selectPrefiler(event) {
    console.log(event);
    console.log('before', this.btnSelected);
    this.btnSelected = true;
    console.log('after', this.btnSelected);
  }

  openNav() {
    let v = document.querySelector('.main-header');
    v.classList.toggle('openSidebar');
    this.sidebarOpen = !this.sidebarOpen;
    this.btnSelected = true;
    console.log('open sidebaropen', this.sidebarOpen);
    this.dispatchEventToMFE(this.sidebarOpen);
  }

  dispatchEventToMFE(sidebarOpen: boolean) {
    console.log('shared sidebaropen', sidebarOpen);

    const event = new CustomEvent('sidebarToggle', {
      detail: { isOpen: sidebarOpen },
    });
    console.log('event', event);
    window.dispatchEvent(event);
  }
  closeNav() {
    document.getElementById('mySidebar').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
    // this.sidebarOpen = false;
    // console.log("closed sidebaropen", this.sidebarOpen);
    // this.dispatchEventToMFE(this.sidebarOpen);
  }
  addLocale(e) {
    console.log(e);
    localStorage.setItem('lang', e);
    this.lang = e;
    this.authService.getLang(this.lang);
    location.reload();
  }
  logout() {
    localStorage.removeItem('JWToken');
    localStorage.removeItem('session');
    localStorage.removeItem('lang');
    this.router.navigateByUrl('/login');
  }

  handleSelectedBtn(status: boolean) {
    // console.log('Received from child:', status);
    this.btnSelected = status ? !status : status;
    // console.log('this.btnSelected:', this.btnSelected);
    // Use this value however needed
  }
}
