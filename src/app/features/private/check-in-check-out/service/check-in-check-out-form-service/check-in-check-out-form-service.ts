import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../shared/services/base-form-service/base-form-service';
import { setValidators } from '../../../../../shared/utils/form.util';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CheckInCheckOutFormService extends BaseFormService {
  buildCheckInCheckOutForm() {
    const config = {
      checkInReason: [''],
      workLocation: [''],
      checkOutReason: [''],
    };

    return this.buildForm(config);
  }

  setValidatorsByStatus(form: FormGroup, status: boolean | null) {
    const [enable, disable] = status
      ? ['checkOutReason', ['checkInReason', 'workLocation']]
      : [['checkInReason', 'workLocation'], 'checkOutReason'];

    setValidators(form, enable, disable);
  }
}
