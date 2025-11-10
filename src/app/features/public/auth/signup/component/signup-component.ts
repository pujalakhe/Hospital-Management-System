import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SignupFormService } from '../service/form/signup-form-service';
import { Store } from '@ngrx/store';
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
import { Address } from '../models/signup.model';
import { selectSignupLoading } from '../store/signup.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-component',
  standalone: false,
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    public signupFormService: SignupFormService,
    private store: Store,
    private router: Router
  ) {}
  signupForm?: FormGroup;
  countries$: Observable<Country[]> = of([]);
  cities$: Observable<City[]> = of([]);
  departments$: Observable<Department[]> = of([]);
  roles$: Observable<Role[]> = of([]);
  genders$: Observable<Gender[]> = of([]);
  private destroy$ = new Subject<void>();
  loading$?: Observable<boolean>;
  ngOnInit(): void {
    this.initializeForm();
    this.LoadAllCountriesDepartmentRoleGender();
    this.loadCountryBasedOnCity();
    this.store.select(selectSignupLoading);
  }

  private LoadAllCountriesDepartmentRoleGender() {
    this.store.dispatch(loadCountries());
    this.countries$ = this.store.select(selectAllCountries);

    this.store.dispatch(loadDepartments());
    this.departments$ = this.store.select(selectAllDepartment);

    this.store.dispatch(loadRole());
    this.roles$ = this.store.select(selectAllRole);

    this.store.dispatch(loadGenderList());
    this.genders$ = this.store.select(selectGenderList);
  }
  private initializeForm(): void {
    this.signupForm = this.signupFormService.buildSignupForm();
  }

  private loadCountryBasedOnCity() {
    const countryControl = this.getAddressControl('countryId');
    if (countryControl) {
      countryControl.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((countryId: number) => {
          const cityControl = this.getAddressControl('cityId');
          cityControl?.reset();

          if (countryId) {
            this.store.dispatch(loadCitiesByCountry({ countryId }));
            this.cities$ = this.store.select(selectAllCities);
          }
        });
    }
  }

  onSubmit(): void {
    if (!this.signupForm || this.signupForm.invalid) {
      this.signupFormService.applyTouchAndDirtyToForm();
      return;
    }
    const payload = this.signupForm.value;
    this.store.dispatch(signup({ payload }));
  }

  getControl(controlName: string): FormControl {
    return this.signupForm?.get(controlName) as FormControl;
  }

  getAddressControl(controlName: keyof Address): FormControl {
    return this.signupForm?.get('address.' + controlName) as FormControl;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  navigateTo() {
    this.router.navigate([ROUTER_PATHS.LOGIN]);
  }
}
