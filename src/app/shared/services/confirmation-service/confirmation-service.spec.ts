import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ConfirmationService } from './confirmation-service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog-component/confirmation-dialog-component';
import { ConfirmDialogData } from '../../model/confirm-dialog-data';
import { DIALOG_WIDTH, DialogActions } from '../../constants/dialog.constants';

describe('ConfirmationService', () => {
  let service: ConfirmationService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmationDialogComponent>>;

  beforeEach(() => {
    // Mock MatDialogRef
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));

    // Mock MatDialog
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    dialogSpy.open.and.returnValue(dialogRefSpy);

    TestBed.configureTestingModule({
      providers: [
        ConfirmationService,
        { provide: MatDialog, useValue: dialogSpy },
      ],
    });

    service = TestBed.inject(ConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open dialog with merged data', () => {
    const customData: ConfirmDialogData = {
      title: 'Custom Title',
      message: 'Custom Message',
      action: DialogActions.Stay,
      cancelBtn: DialogActions.Leave,
    };

    service.confirm(customData).subscribe((res) => {
      expect(res).toBe(true);
    });

    expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      width: DIALOG_WIDTH,
      data: { ...service.defaultData, ...customData },
    });

    // Check that afterClosed was called
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
  });

  it('should use default data if no data provided', () => {
    service.confirm({} as ConfirmDialogData).subscribe();

    expect(dialogSpy.open).toHaveBeenCalledWith(ConfirmationDialogComponent, {
      width: DIALOG_WIDTH,
      data: service.defaultData,
    });

    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
  });
});
