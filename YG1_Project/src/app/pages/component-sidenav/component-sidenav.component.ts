import { Component, OnInit, ViewChild, NgZone, Input, NgModule } from '@angular/core';
import { MatSidenav, MatSidenavModule, MatIconModule, MatFormFieldModule, MatInputModule, MatTreeModule, MatListModule, MatTreeFlattener, MatTreeFlatDataSource, MatButtonModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { Observable, combineLatest } from 'rxjs';
import { Params, ActivatedRoute, RouterModule, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { map } from 'rxjs/operators';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ComponentHeaderModule } from '../component-header/component-header.component';
import { FlatTreeControl } from '@angular/cdk/tree';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClientModule } from '@angular/common/http';
import { Nav } from 'src/app/model/item,';
import { SearchService } from 'src/app/service/search.service';
import { FormControl, ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { SharedTranslateModule } from 'src/app/shared/translater/translater';

const SMALL_WIDTH_BREAKPOINT = 768;

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './component-sidenav.component.html',
  styleUrls: ['./component-sidenav.component.scss']
})
export class ComponentSidenav implements OnInit {
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('sidenavright', { static: false }) sidenavright: MatSidenav;
  params: Observable<Params>;
  isScreenSmall: Observable<boolean>;


  constructor(
    private _route: ActivatedRoute,
    zone: NgZone,
    breakpoints: BreakpointObserver) {
    this.isScreenSmall = breakpoints.observe(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)
      .pipe(map(breakpoint => breakpoint.matches));

  }

  ngOnInit() {
    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => route.params),
      Object.assign);
  }
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-component-nav',
  templateUrl: './component-nav.component.html',
  styleUrls: ['./component-nav.component.scss'],
})

export class ComponentNav implements OnInit {
  private TREE_DATA: Nav[];

  private _transformer = (node: Nav, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
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

  constructor(private httpClientService: HttpClientService) {

  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
    this.httpClientService.getNav().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response: Nav[]) {

    this.TREE_DATA = response;
    this.dataSource.data = this.TREE_DATA;
  }

}

@Component({
  selector: 'app-component-nav-right',
  templateUrl: './component-nav-right.component.html',
  styleUrls: ['./component-nav-right.component.scss']
})

export class ComponentNavRight implements OnInit {
  pipe: DatePipe;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });


  constructor(private router: Router, private searchService: SearchService) { }

  dateClick(event: Event) {
    this.searchService.dateBtn(event);
  }

  ngOnInit() {
    this.filterForm.get('fromDate').valueChanges.subscribe((orderFromDateValue) => {
      this.searchService.filter(orderFromDateValue);
    });
    this.filterForm.get('toDate').valueChanges.subscribe((orderToDateValue) => {
      this.searchService.filter2(orderToDateValue);
    });
  }
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
    MatNativeDateModule
  ],
  exports: [ComponentSidenav],
  declarations: [ComponentSidenav, ComponentNav, ComponentNavRight],
  providers: [HttpClientService, SearchService],
})
export class ComponentSidenavModule { }