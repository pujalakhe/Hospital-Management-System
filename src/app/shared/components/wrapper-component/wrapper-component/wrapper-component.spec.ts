import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WrapperComponent } from './wrapper-component';
import { MaterialModule } from '../../../angular-material.module';
import { HeaderComponent } from '../../header-component/header-component';
import { SidebarComponent } from '../../dynamic-sidebar/sidebar-component';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, CommonModule],
      declarations: [WrapperComponent, HeaderComponent, SidebarComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
