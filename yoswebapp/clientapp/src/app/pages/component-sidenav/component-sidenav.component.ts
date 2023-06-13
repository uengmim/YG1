import { Component, OnInit, ViewChild, Input, NgModule } from '@angular/core';
import { MatSidenav, MatSidenavModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTreeModule, MatListModule, MatTreeFlattener, MatTreeFlatDataSource, MatButtonModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { Params, RouterModule, Router, NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { map, filter, takeUntil } from 'rxjs/operators';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ComponentHeaderModule } from '../component-header/component-header.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { Nav } from 'src/app/model/Nav';
import { SearchService } from 'src/app/service/search.service';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';
import { DateAdapter } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'util';
import value from '*.json';


const SMALL_WIDTH_BREAKPOINT = 1380;

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './component-sidenav.component.html',
  styleUrls: ['./component-sidenav.component.scss']
})
export class ComponentSidenav implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('sidenavright', { static: false }) sidenavright: MatSidenav;
  isScreenSmall: Observable<boolean>;
  constructor(
    private router: Router,
    private searchService: SearchService,
    private breakpoints: BreakpointObserver) {
    this.isScreenSmall2();
  }

  /**
   * 모바일 화면에서
   * sideNav가 열려있을 시 
   * 버튼을 누르면 닫힘
   */
  isScreenSmall2() {
    this.isScreenSmall = this.breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));
    return this.isScreenSmall
  }
  isScreenSmall3() {
    return window.matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`).matches;
  }
  ngOnInit() {
    //닫힘 이벤트 처리
    this.router.events.subscribe(() => {
      if (this.isScreenSmall2() && this.isScreenSmall3()) {
        this.sidenav.close();
        this.sidenavright.close();
      }
    });

  }
}

interface ExampleFlatNode {
  expandable: boolean;
  key: string;
  name: string;
  level: number;
}
@Component({
  selector: 'app-component-nav',
  templateUrl: './component-nav.component.html',
  styleUrls: ['./component-nav.component.scss'],
})

export class ComponentNav implements OnInit {
  usrco: string;
  language: string;
  tree1: string;
  tree2: string;
  private TREE_DATA: Nav[];

   isMatchedVersion:boolean;
  private _transformer = (node: Nav, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      key: node.key,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  @Input() params: Observable<Params>;
  expansions: { [key: string]: boolean } = {};

  constructor(private httpClientService: HttpClientService, private searchService: SearchService,
    private router: Router,
    private translateService: TranslateService) { }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    this.usrco = sessionStorage.getItem('company');
    this.language = sessionStorage.getItem('language');   
    this.httpClientService.getMatchVersion().subscribe(
      result =>{
        this.isMatchedVersion = result;
        if(result){
          this.httpClientService.getNav(this.usrco, this.language.toUpperCase()).subscribe(
            response => this.handleSuccessfulResponse(response),
            error => this.translateService.get('serverErrorMsg').subscribe(value => {
              alert(value);
            })
          );
        }else{
          // alert("서버가 업데이트 되었습니다. 다시 로그인 해 주시기 바랍니다.");
          this.translateService.get('versionUp').subscribe(value => {
            alert(value);
            localStorage.clear();
            sessionStorage.clear();
            //this.router.navigate(['.']);
            window.location.reload();
          })
        }
      },
        error => this.translateService.get('serverErrorMsg').subscribe(value => {
        alert(value);
      })
    );
      // this.httpClientService.getNav(this.usrco, this.language.toUpperCase()).subscribe(
      //   response => this.handleSuccessfulResponse(response),
      //   error => this.translateService.get('serverErrorMsg').subscribe(value => {
      //     alert(value);
      //   })
      // );
  }
  handleSuccessfulResponse(response: Nav[]) {
    if (response.length > 0) {
      this.TREE_DATA = response;
      this.dataSource.data = this.TREE_DATA;
    } else {
      this.translateService.get('askMasterMsg').subscribe(
        value => {
          alert(value);
        }
      )
    }
  }
  /**
   * 최하위 카테고리 선택 시 호출
   * @param tree 
   * @param treename 
   */
  getTree(tree: ExampleFlatNode, tree3N: string, tree3: string) {

    tree3N =  tree3N.replace(/\//gi,"-");
    this.getParent(tree)
    this.searchService.sendCategory({ 'tree1': this.tree1, 'tree2': this.tree2, 'tree3': tree3 });
    sessionStorage.setItem('tree1', this.tree1)
    sessionStorage.setItem('tree2', this.tree2)
    sessionStorage.setItem('tree3', tree3)
    sessionStorage.setItem('tree3N', this.tree1+this.tree2+tree3N)
    this.router.navigate(['product/'+this.tree1+this.tree2+tree3N])
  }

  /**
  * 선택된 카테고리 트리 값
  * @param node 
  */
  getParent(node: ExampleFlatNode) {
    const { treeControl } = this;
    const currentLevel = treeControl.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }
    const startIndex = treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = treeControl.dataNodes[i];

      if (currentLevel == 2) {
        if (treeControl.getLevel(currentNode) < currentLevel) {
          this.tree2 = currentNode.key;
          return this.getParent(currentNode)
        }
      }
      else if (currentLevel == 1) {
        if (treeControl.getLevel(currentNode) < currentLevel) {
          this.tree1 = currentNode.key;
          return;
        }
      }
    }
  }


}

@Component({
  selector: 'app-component-nav-right',
  templateUrl: './component-nav-right.component.html',
  styleUrls: ['./component-nav-right.component.scss']
})

export class ComponentNavRight implements OnInit {
  language = sessionStorage.getItem('language');
  auth = sessionStorage.getItem('authority');
  // pipe: DatePipe;
  // currentDate: Date = new Date();
  // endDate: Date = new Date()
  // fromDate: Date;
  // toDate: Date;


  // filterForm = new FormGroup({
  //   fromDate: new FormControl(),
  //   toDate: new FormControl(),
  // });

  
  public destroyed = new Subject<any>();
  
  constructor(private router: Router,
    private httpClientService: HttpClientService,
    private searchService: SearchService,
    // private dateAdapter: DateAdapter<Date>,
    private translateService: TranslateService) {
    // this.endDate.setDate(this.currentDate.getDate() - 7);
    // this.filterForm.get('toDate').setValue(this.currentDate);
    // this.filterForm.get('fromDate').setValue(this.endDate);

    // this.dateAdapter.setLocale(this.language)

  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  ngOnInit() { }
}

@NgModule({
  imports: [
    SharedTranslateModule,
    HttpClientModule,
    MatButtonModule,
    MatSidenavModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    ComponentHeaderModule,
    BrowserAnimationsModule,
    MatIconModule,
    CdkAccordionModule,
    MatFormFieldModule,
    MatInputModule,
    MatTreeModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [ComponentSidenav],
  declarations: [ComponentSidenav, ComponentNav, ComponentNavRight],
  providers: [HttpClientService, SearchService],
})
export class ComponentSidenavModule { }