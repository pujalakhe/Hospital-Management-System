import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseFormService } from '../../../../../shared/services/base-form-service/base-form-service';

@Injectable({
  providedIn: 'root',
})
export class CheckOutFormService extends BaseFormService {
  buildCheckOutForm() {
    const config = {
      checkOutReason: ['', Validators.required],
    };

    return this.buildForm(config);
  }
}
