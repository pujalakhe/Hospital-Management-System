import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar-service';

describe('SnackbarService', () => {
  let service: SnackbarService;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [SnackbarService, { provide: MatSnackBar, useValue: spy }],
    });

    service = TestBed.inject(SnackbarService);
    snackbarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open success snackbar', () => {
    service.success('Success message', 2500);
    expect(snackbarSpy.open).toHaveBeenCalledWith(
      'Success message',
      'Close',
      jasmine.objectContaining({
        panelClass: ['snackbar-success'],
        duration: 2500,
      })
    );
  });

  it('should open error snackbar', () => {
    service.error('Error message', 2500);
    expect(snackbarSpy.open).toHaveBeenCalledWith(
      'Error message',
      'Close',
      jasmine.objectContaining({
        panelClass: ['snackbar-error'],
        duration: 3000,
      })
    );
  });

  it('should open warning snackbar', () => {
    service.warning('Warning message', 2500);
    expect(snackbarSpy.open).toHaveBeenCalledWith(
      'Warning message',
      'Close',
      jasmine.objectContaining({
        panelClass: ['snackbar-warning'],
        duration: 2000,
      })
    );
  });

  it('should open info snackbar', () => {
    service.info('Info message');
    expect(snackbarSpy.open).toHaveBeenCalledWith(
      'Info message',
      'Close',
      jasmine.objectContaining({
        panelClass: ['snackbar-info'],
        duration: jasmine.any(Number),
      })
    );
  });
});
