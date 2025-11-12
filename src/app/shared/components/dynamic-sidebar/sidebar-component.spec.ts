import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar-component';
import { Router } from '@angular/router';
import { ROUTER_PATHS } from '../../../core/constants/router-path.constant';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isMobile to true and close sidebar when screen width <= 768', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    (component as any).checkScreenSize();
    expect(component.isMobile).toBeTrue();
    expect(component.isSidebarOpen).toBeFalse();
  });

  it('should set isMobile to false and open sidebar when screen width > 768', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1200);
    (component as any).checkScreenSize();
    expect(component.isMobile).toBeFalse();
    expect(component.isSidebarOpen).toBeTrue();
  });

  it('should toggle sidebar state', () => {
    const initial = component.isSidebarOpen;
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBe(!initial);
  });

  it('should navigate to login on logout', () => {
    component.onLogout();
    expect(mockRouter.navigate).toHaveBeenCalledWith([ROUTER_PATHS.LOGIN]);
  });

  it('should update screen size when window is resized (HostListener)', () => {
    spyOn(component as any, 'checkScreenSize');
    window.dispatchEvent(new Event('resize'));
    expect((component as any).checkScreenSize).toHaveBeenCalled();
  });
});
