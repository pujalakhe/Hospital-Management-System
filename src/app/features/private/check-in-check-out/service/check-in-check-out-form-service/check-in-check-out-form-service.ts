import { Injectable } from '@angular/core';
import { BaseFormService } from '../../../../../shared/services/base-form-service/base-form-service';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CheckInCheckOutFormService extends BaseFormService {
  buildCheckInCheckOutForm() {
    const config = {
      checkInReason: ['', Validators.required],
      workLocation: ['', Validators.required],
    };

    return this.buildForm(config);
  }
}
