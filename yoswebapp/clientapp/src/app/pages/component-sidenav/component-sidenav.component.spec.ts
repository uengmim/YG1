import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSidenavModule } from './component-sidenav.component';

describe('ComponentSidenavComponent', () => {
  let component: ComponentSidenavModule;
  let fixture: ComponentFixture<ComponentSidenavModule>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentSidenavModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSidenavModule);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
