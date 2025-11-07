import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SignupFormService } from '../service/form/signup-form-service';
import { Store } from '@ngrx/store';
import { SignupApiService } from '../service/api/signup-api-service';
import { ROUTER_PATHS } from '../../../../../core/constants/router-path.constant';
import { selectAllCountries } from '../../../../../shared/store/country-list/countryList.selector';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Country } from '../../../../../shared/model/country.model';
import { City } from '../../../../../shared/model/city.model';
import { Role } from '../../../../../shared/model/role.model';
import { selectAllDepartment } from '../../../../../shared/store/department-list/departmentList.selector';
import { selectAllRole } from '../../../../../shared/store/role-list/roleList.selector';
import { Department } from '../../../../../shared/model/department.model';
import { loadCountries } from '../../../../../shared/store/country-list/countryList.action';
import { loadDepartments } from '../../../../../shared/store/department-list/departmentList.action';
import { loadRole } from '../../../../../shared/store/role-list/roleList.action';
import { loadCitiesByCountry } from '../../../../../shared/store/city-list-by-countryId/cityListByCountryId.action';
import { selectAllCities } from '../../../../../shared/store/city-list-by-countryId/cityListByCountryId.selector';
import { signup } from '../store/signup.actions';
import { loadGenderList } from '../../../../../shared/store/gender-list/genderList.action';
import { selectGenderList } from '../../../../../shared/store/gender-list/genderList.selector';
import { Gender } from '../../../../../shared/model/gender.model';

@Component({
  selector: 'app-signup-component',
  standalone: false,
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    public formService: SignupFormService,
    private store: Store,
    private signupApiService: SignupApiService
  ) {}
  ROUTER_PATHS = ROUTER_PATHS;
  Countries$: Observable<Country[]> = of([]);
  Cities$: Observable<City[]> = of([]);
  Departments$: Observable<Department[]> = of([]);
  Roles$: Observable<Role[]> = of([]);
  Genders$: Observable<Gender[]> = of([]);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initializeForm();

    this.store.dispatch(loadCountries());
    this.Countries$ = this.store.select(selectAllCountries);

    this.store.dispatch(loadDepartments());
    this.Departments$ = this.store.select(selectAllDepartment);

    this.store.dispatch(loadRole());
    this.Roles$ = this.store.select(selectAllRole);

    this.store.dispatch(loadGenderList());
    this.Genders$ = this.store.select(selectGenderList);

    const countryControl = this.formService.getAddressControl('countryId');
    if (countryControl) {
      countryControl.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((countryId: number) => {
          const cityControl = this.formService.getAddressControl('cityId');
          cityControl?.reset();

          if (countryId) {
            this.store.dispatch(loadCitiesByCountry({ countryId }));
            this.Cities$ = this.store.select(selectAllCities);
          }
        });
    }
  }
  private initializeForm(): void {
    this.formService.buildSignupForm();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    const form = this.formService.form;
    if (!form || form.invalid) {
      this.formService.applyTouchAndDirtyToForm();
      return;
    }

    const payload = this.formService.getFormValue();
    this.store.dispatch(signup({ payload }));
  }
}
