import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GenderList, PlaceTypeList, UserModel } from '../../models/user.model';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import Inputmask from 'inputmask';

import { FileService } from 'src/app/_services/file.service';

import { CityAndStateHttpService } from 'src/app/_requests/cityAndState/cityAndState.service';
import { NgmValidators } from 'src/app/_ngmValidations/validations/ngm-validators';
import { User_generateUserByLink_body } from 'src/app/_requests/user/userModel';
import {
  CityAndState_listOfCitiesDTO,
  CityAndState_listOfCountriesDTO,
  CityAndState_listOfStatesDTO,
} from 'src/app/_requests/cityAndState/cityAndStateModel';
import {
  CountryISO,
  NgxIntlTelInputComponent,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { NgmAnimations } from 'src/app/_animations/ngm-animations';
import { trigger } from '@angular/animations';

interface AddressAdditionalControls {
  countrySearchedText: string;
  stateSearchedText: string;
  citysearchedText: string;

  countryLoading: boolean;
  stateLoading: boolean;
  cityLoading: boolean;

  selectedCountryId: FormControl;
  selectedStateId: FormControl;
  states: CityAndState_listOfStatesDTO[];
  cities: CityAndState_listOfCitiesDTO[];
  countries: CityAndState_listOfCountriesDTO[];
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [trigger('slideAuto', NgmAnimations.Slide.Auto())],
})
export class RegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
  showPass: boolean;
  registrationForm: FormGroup;
  isLoading$: Observable<boolean>;
  profileImage: File | undefined;
  maxSizeImage: number = 1 * 1048576; // 1MB
  genderList = GenderList;
  placeTypeList = PlaceTypeList;

  // Work Address Additional Controls
  workAddress: AddressAdditionalControls;
  homeAddress: AddressAdditionalControls;
  isSameAddress: boolean = false;
  saveAddress: {
    additionalControl: AddressAdditionalControls;
    selectedCountryId: number;
    selectedStateId: number;
    address: any;
  };
  options = {
    componentRestrictions: {
      country: ['US', 'CA'],
    },
  };

  // For Phone Number
  PhoneNumberFormat = PhoneNumberFormat;
  selectedCountryISO = CountryISO.UnitedStates;
  SearchCountryField = SearchCountryField;
  OnlyCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.Canada];
  @ViewChild(NgxIntlTelInputComponent, { static: true })
  telInputRef: NgxIntlTelInputComponent;

  // private fields
  private unsubscribe: Subscription[] = [];

  @ViewChild('homeAddZIPCode', { static: false }) homeAddZIPCode: ElementRef;
  @ViewChild('workAddZIPCode', { static: true }) workAddZIPCode: ElementRef;
  @ViewChildren(NgxIntlTelInputComponent)
  phoneNumbers: QueryList<NgxIntlTelInputComponent>;

  constructor(
    private cityAndStateHttpService: CityAndStateHttpService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    this.getInitData();
    this.initAdditionalAddress();
    this.f.profileImageUrl.setValidators(this.logoFileValidator);
  }
  ngAfterViewInit(): void {
    this.setMasks();
    this.setGooglePhoneValidatorsAndMasks();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }

  initAdditionalAddress() {
    this.workAddress = {
      countrySearchedText: '',
      stateSearchedText: '',
      citysearchedText: '',

      countryLoading: false,
      stateLoading: false,
      cityLoading: false,

      selectedCountryId: new FormControl(null, [Validators.required]),
      selectedStateId: new FormControl(null, [Validators.required]),
      countries: [],
      states: [],
      cities: [],
    };
    this.homeAddress = Object.assign({}, this.workAddress);
    this.homeAddress.selectedCountryId = new FormControl(null, [
      Validators.required,
    ]);
    this.homeAddress.selectedStateId = new FormControl(null, [
      Validators.required,
    ]);
  }
  initForm() {
    // Create Address
    let workAddress = new FormGroup({
      addr: new FormControl(null, [Validators.required]),
      place: new FormControl(null, [Validators.required]),
      no: new FormControl(null, [Validators.required]),
      cityId: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      zipCode: new FormControl(null, [
        Validators.required,
        NgmValidators.zipCode,
      ]),

      id: new FormControl(0, []),
      type: new FormControl(0, []),
      isPrimary: new FormControl(true, []),
      contactPhone: new FormControl(null, []),
      phoneNumberExtension: new FormControl(null, []),
    });
    let homeAddress = new FormGroup({
      addr: new FormControl(null, [Validators.required]),
      place: new FormControl(null, [Validators.required]),
      no: new FormControl(null, [Validators.required]),
      cityId: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      zipCode: new FormControl(null, [
        Validators.required,
        NgmValidators.zipCode,
      ]),

      id: new FormControl(0, []),
      type: new FormControl(1, []),
      isPrimary: new FormControl(false, []),
      contactPhone: new FormControl(null, []),
      phoneNumberExtension: new FormControl(null, []),
    });

    // Create UserRegisterByLinkDto
    let userRegisterByLinkDto = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      lastName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      taxId: new FormControl(null, [Validators.required]),
      socialSecurityNumber: new FormControl(null, [Validators.required]),

      logoFile: new FormControl(null, []),
      profileImageUrl: new FormControl(null, []),
      isSameWorkAndHomeAddress: new FormControl(false, []),
      id: new FormControl(this.route.snapshot.queryParams['identityer'], []),

      homeAddress: homeAddress,
      workAddress: workAddress,

      password: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
          NgmValidators.password(8, 100),
        ])
      ),
    });

    // Create RegisterForm
    this.registrationForm = userRegisterByLinkDto;
  }
  setMasks() {
    const americaZipCodeMask = 'aa 9{4,10}';
    const nonAmericaZipCodeMask = '9{4,10}';

    /** work address zipcode*/
    Inputmask(
      this.workAddress.selectedCountryId.value == 233
        ? americaZipCodeMask
        : nonAmericaZipCodeMask
    ).mask(this.workAddZIPCode?.nativeElement);
    /** home address zipcode*/
    if (this.homeAddZIPCode) {
      Inputmask(
        this.homeAddress.selectedCountryId.value == 233
          ? americaZipCodeMask
          : nonAmericaZipCodeMask
      ).mask(this.homeAddZIPCode?.nativeElement);
    }
  }
  setGooglePhoneValidatorsAndMasks() {
    this.registrationForm
      .get('workAddress.phoneNumber')
      ?.setValidators(NgmValidators.googlePhoneNumber);
    this.registrationForm
      .get('homeAddress.phoneNumber')
      ?.setValidators(NgmValidators.googlePhoneNumber);

    this.phoneNumbers?.toArray().map((telInputRef, index) => {
      this.setPhoneNumberMask(telInputRef);
    });
  }

  // #region Get Data
  getInitData() {
    this.getCountries();
  }
  getCountries() {
    this.cityAndStateHttpService
      .listOfCountries()
      .subscribe((countries: CityAndState_listOfCountriesDTO[]) => {
        this.workAddress.countries = countries;
        this.homeAddress.countries = countries;
        this.updateHomeAddress();
      });
  }
  getStates(address: AddressAdditionalControls, event: any) {
    if (event instanceof Event) return; // change event trigger when select data changed
    const CountryId = address.selectedCountryId.value;
    this.cityAndStateHttpService
      .listOfStates({ CountryId })
      .subscribe((states: CityAndState_listOfStatesDTO[]) => {
        address.states = states;
        this.updateHomeAddress();
      });
  }
  getCities(address: AddressAdditionalControls, event: any) {
    if (event instanceof Event) return; // change event trigger when select data changed
    const StateId = address.selectedStateId.value;
    this.cityAndStateHttpService
      .listOfCities({ StateId })
      .subscribe((cities: CityAndState_listOfCitiesDTO[]) => {
        address.cities = cities;
        this.updateHomeAddress();
      });
  }
  getCountryPhoneNumberInfo(
    telInputRef: NgxIntlTelInputComponent,
    countryId: number,
    event: any
  ) {
    if (event instanceof Event) return; // change event trigger when select data changed
    // Select Country For Phone Number Validation
    this.selectedCountryISO =
      countryId === 233 ? CountryISO.UnitedStates : CountryISO.Canada;
    this.setPhoneNumberMask(telInputRef);
  }
  // #endregion Get Data

  // #region Logo Handel
  logoFileValidator = (control: AbstractControl): ValidationErrors | null => {
    if (<number>this.profileImage?.size > this.maxSizeImage) {
      return { maxSize: true };
    }
    return null;
  };
  setLogoFile(file: File) {
    FileService.fileToBase64(file).then((base64: string) => {
      this.registrationForm.get('profileImageUrl')?.setValue(base64);
    });
  }
  removeLogoFile() {
    this.registrationForm.get('profileImageUrl')?.setValue(null);
  }
  removeProfileImage() {
    this.profileImage = undefined;
    this.removeLogoFile();
  }
  // #endregion Logo Handel

  // #region City and State Handel
  unsetState(
    address: AddressAdditionalControls,
    formControl: AbstractControl | null
  ) {
    this.unsetCity(address, formControl);
    address.selectedStateId.setValue(undefined);
    address.states = [];
  }
  unsetCity(
    address: AddressAdditionalControls,
    formControl: AbstractControl | null
  ) {
    formControl?.get('cityId')?.setValue(undefined);
    address.cities = [];
  }
  useSameAddress(isSame: boolean) {
    this.isSameAddress = isSame;

    // If Dont Show Home Address
    let homeAddress = this.registrationForm.get('homeAddress');
    if (isSame) {
      homeAddress?.disable();
    } else {
      homeAddress?.enable();
    }
    return;
    // If Dont Show Home Address

    if (isSame) {
      // Save Address
      this.saveAddress = {
        additionalControl: this.homeAddress,
        address: this.registrationForm.controls['homeAddress'].value,
        selectedCountryId: this.homeAddress.selectedCountryId.value,
        selectedStateId: this.homeAddress.selectedStateId.value,
      };

      // Update Home Address
      this.disableHomeAddress();
      this.updateHomeAddress();
    } else {
      // Reset Home Address
      this.enableHomeAddress();
      this.resetHomeAddress();
    }
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }
  disableHomeAddress() {
    let controls = (<FormGroup>this.registrationForm.get('homeAddress'))
      ?.controls;
    for (const control in controls) controls[control].disable();
    this.homeAddress.selectedCountryId.disable();
    this.homeAddress.selectedStateId.disable();
  }
  enableHomeAddress() {
    let controls = (<FormGroup>this.registrationForm.get('homeAddress'))
      ?.controls;
    for (const control in controls) controls[control].enable();
    this.homeAddress.selectedCountryId.enable();
    this.homeAddress.selectedStateId.enable();
  }

  resetHomeAddress() {
    // Reset Additional Control
    this.homeAddress = this.saveAddress.additionalControl;
    this.homeAddress.selectedCountryId.setValue(
      this.saveAddress.selectedCountryId
    );
    this.homeAddress.selectedStateId.setValue(this.saveAddress.selectedStateId);
    this.setMasks();

    // Reset Form Group
    this.registrationForm.get('homeAddress')?.patchValue({
      addr: this.saveAddress.address?.addr,
      cityId: this.saveAddress.address?.cityId,
      phoneNumber: this.saveAddress.address?.phoneNumber,
      phoneNumberExtension: this.saveAddress.address?.phoneNumberExtension,
      place: this.saveAddress.address?.place,
      no: this.saveAddress.address?.no,

      id: this.saveAddress.address?.id,
      type: this.saveAddress.address?.type,
      zipCode: this.saveAddress.address?.zipCode,
      isPrimary: this.saveAddress.address?.isPrimary,
      contactPhone: this.saveAddress.address?.contactPhone,
    });
  }
  updateHomeAddress() {
    return; // If Dont Show Home Address

    if (this.isSameAddress) {
      // Update Additional Control
      this.homeAddress = { ...this.workAddress };
      this.homeAddress.selectedCountryId =
        this.saveAddress.additionalControl.selectedCountryId;
      this.homeAddress.selectedStateId =
        this.saveAddress.additionalControl.selectedStateId;
      this.homeAddress.selectedCountryId.setValue(
        this.workAddress.selectedCountryId.value
      );
      this.homeAddress.selectedStateId.setValue(
        this.workAddress.selectedStateId.value
      );
      this.setMasks();

      // Update Form Group
      let workAddress = this.registrationForm.get('workAddress')?.value;
      this.registrationForm.get('homeAddress')?.patchValue({
        addr: workAddress?.addr,
        cityId: workAddress?.cityId,
        phoneNumber: workAddress?.phoneNumber,
        phoneNumberExtension: workAddress?.phoneNumberExtension,
        place: workAddress?.place,
        no: workAddress?.no,

        id: workAddress?.id,
        type: workAddress?.type,
        zipCode: workAddress?.zipCode,
        isPrimary: workAddress?.isPrimary,
        contactPhone: workAddress?.contactPhone,
      });
    }
  }
  updateHomeAddressWithDelay() {
    return; // If Dont Show Home Address
    setTimeout(() => this.updateHomeAddress());
  }
  // #endregion City and State Handel

  // #region Address Handel
  addressChange(formControl: AbstractControl, value: string) {
    formControl.setValue(value);
    this.updateHomeAddress();
  }
  // #endregion Address Handel

  // #region Other Handel
  // Set Mask For Phone Number
  setPhoneNumberMask(telInputRef: NgxIntlTelInputComponent) {
    let regex = telInputRef.selectedCountry.placeHolder
      .toString()
      .replace(/\d/g, '9');
    Inputmask(regex).mask(document.getElementById(telInputRef.inputId)!);
  }
  // #endregion Other Handel

  // #region Request Handels
  getRequestBody(): User_generateUserByLink_body {
    let value = JSON.parse(JSON.stringify(this.registrationForm.value));
    const getAddress = (): any[] => {
      value.workAddress.phoneNumber = value.workAddress?.phoneNumber?.e164Number
        .toString()
        .replace(/\s|\(|\)|-/g, '');
      // value.workAddress.zipCode = Inputmask.unmask(value.workAddress.zipCode || '', { mask: 'aa 9{4,10}' });

      if (this.isSameAddress) {
        return [value.workAddress];
      } else {
        value.homeAddress.phoneNumber =
          value.homeAddress?.phoneNumber?.e164Number
            .toString()
            .replace(/\s|\(|\)|-/g, '');
        return [value.workAddress, value.homeAddress];
      }
    };
    return {
      userRegisterByLinkDto: {
        id: value.id,
        firstName: value.firstName,
        taxId: value.taxId,
        gender: value.gender,
        lastName: value.lastName,
        password: value.password,
        email: value.email,
        logoFile: value.logoFile,
        profileImageUrl: value.profileImageUrl,
        socialSecurityNumber: value.socialSecurityNumber,
        creationDate: null,
        addresss: getAddress(),
      },
    };
  }
  submit() {
    console.log(JSON.stringify(this.getRequestBody()));
    const registrationSubscr = this.authService
      .registration(this.getRequestBody())
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user.role === 'admin')
          this.router.navigate(['/administration/contracts']);
        else this.router.navigate(['/activities/overview']);
      });
    this.unsubscribe.push(registrationSubscr);
  }
  // #endregion Request Handels

  // Hostbinding
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
