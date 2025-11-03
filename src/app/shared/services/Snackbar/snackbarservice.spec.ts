import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbarservice';
import {
  SNACKBAR_ACTION,
  SNACKBAR_DURATION,
  SNACKBAR_POSITION,
  SNACKBAR_TYPE,
} from '../../constants/snackbar.constants';

describe('SnackbarService', () => {
  describe('SnackbarService', () => {
    let service: SnackbarService;
    let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
      beforeEach(() => {
        TestBed.configureTestingModule({});
        const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

        TestBed.configureTestingModule({
          providers: [SnackbarService, { provide: MatSnackBar, useValue: spy }],
        });

        service = TestBed.inject(SnackbarService);
        service = TestBed.inject(SnackbarService);
        snackBarSpy = TestBed.inject(
          MatSnackBar
        ) as jasmine.SpyObj<MatSnackBar>;
      });
    });

    it('should be created', () => {
      it('should be created', () => {
        expect(service).toBeTruthy();
        expect(service).toBeTruthy();
      });
    });

    it('should call MatSnackBar.open() with correct arguments', () => {
      const message = 'Test message';
      const type = SNACKBAR_TYPE.INFO;
      const duration = SNACKBAR_DURATION.SHORT;

      service.show(message, type, duration);

      expect(snackBarSpy.open).toHaveBeenCalledWith(
        message,
        SNACKBAR_ACTION.CLOSE,
        jasmine.objectContaining({
          horizontalPosition: SNACKBAR_POSITION.HORIZONTAL,
          verticalPosition: SNACKBAR_POSITION.VERTICAL,
          duration: duration,
        })
      );
    });
  });
});
