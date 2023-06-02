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
import { Subscription, finalize, take, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Inputmask from 'inputmask';

import { FileService } from 'src/app/_services/file.service';

import { ScrollTopComponent as KTScrollTop } from 'src/app/_metronic/kt/components/_ScrollTopComponent';
import { CityAndStateHttpService } from 'src/app/_requests/cityAndState/cityAndState.service';
import {
  AuthService,
  GenderList,
  PlaceType,
  PlaceTypeList,
  UserAddressDTO,
  UserModel,
} from 'src/app/modules/auth';
import { environment } from 'src/environments/environment';
import { MarketerUser } from 'src/app/_services/marketer-user.service';
import {
  CityAndState_listOfCitiesDTO,
  CityAndState_listOfCountriesDTO,
  CityAndState_listOfStatesDTO,
} from 'src/app/_requests/cityAndState/cityAndStateModel';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import { User_updateProfile_body } from 'src/app/_requests/user/userModel';
import {
  CountryISO,
  NgxIntlTelInputComponent,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input';
import { NgmValidators } from 'src/app/_ngmValidations/validations/ngm-validators';
import { trigger } from '@angular/animations';
import { NgmAnimations } from 'src/app/_animations/ngm-animations';
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
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  animations: [
    trigger('slideAuto', NgmAnimations.Slide.Auto()),
  ]
})
export class ProfileDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  updateProfileForm: FormGroup;
  hasError: boolean;
  profileImage: File | undefined;
  profileImageUrl: string = environment.avatarImage;
  maxSizeImage: number = 1 * 1048576; // 1MB
  user: UserModel;
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
    private userHttpService: UserHttpService,
    public marketerUser: MarketerUser,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getInitData();
    this.initAdditionalAddress();
    this.f.profileImageUrl.setValidators(this.logoFileValidator);
    this.user = this.authService.currentUserValue!;
    this.fillForm();
  }
  ngAfterViewInit(): void {
    this.setMasks();
    this.setGooglePhoneValidatorsAndMasks();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.updateProfileForm.controls;
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
      cityId: new FormControl(null, [Validators.required]),
      phoneNumberExtension: new FormControl(null, []),
      place: new FormControl(null, [Validators.required]),
      no: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      zipCode: new FormControl(null, [
        Validators.required,
        NgmValidators.zipCode,
      ]),

      id: new FormControl(0, []),
      type: new FormControl(0, []),
      isPrimary: new FormControl(true, []),
      contactPhone: new FormControl(null, []),
    });
    let homeAddress = new FormGroup({
      addr: new FormControl(null, [Validators.required]),
      cityId: new FormControl(null, [Validators.required]),
      phoneNumberExtension: new FormControl(null, []),
      place: new FormControl(null, [Validators.required]),
      no: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
      zipCode: new FormControl(null, [
        Validators.required,
        NgmValidators.zipCode,
      ]),

      id: new FormControl(0, []),
      type: new FormControl(1, []),
      isPrimary: new FormControl(false, []),
      contactPhone: new FormControl(null, []),
    });

    // Create UserRegisterByLinkDto
    let updateProfileForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
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

      password: new FormControl(null, []),
    });

    // Disabled Field
    // ===> Remember Disabled Fields has null value
    updateProfileForm.get('email')?.disable();

    // Create Update Form
    this.updateProfileForm = updateProfileForm;
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
    this.updateProfileForm
      .get('workAddress.phoneNumber')
      ?.setValidators(NgmValidators.googlePhoneNumber);
    this.updateProfileForm
      .get('homeAddress.phoneNumber')
      ?.setValidators(NgmValidators.googlePhoneNumber);

    this.phoneNumbers?.toArray().map((telInputRef, index) => {
      this.setPhoneNumberMask(telInputRef);
    });
  }
  fillForm() {
    // Get Current User
    let marketer = this.marketerUser.marketer;

    // Set Profile Image Url
    this.profileImageUrl = marketer.profileImageUrl;

    // Create Work Address Value
    let workAddress: UserAddressDTO = {
      id: marketer.workAddress?.id,
      addr: marketer.workAddress?.addr,
      cityId: marketer.workAddress?.cityId,
      zipCode: marketer.workAddress?.zipCode,
      phoneNumber: marketer.workAddress?.phoneNumber,
      place: marketer.workAddress?.place || PlaceType.apt,
      no: marketer.workAddress?.no,
      phoneNumberExtension: marketer.workAddress?.phoneNumberExtension,
    };

    // Create Home Address Value
    let homeAddress: UserAddressDTO = {
      id: marketer.homeAddress?.id,
      addr: marketer.homeAddress?.addr,
      cityId: marketer.homeAddress?.cityId,
      zipCode: marketer.homeAddress?.zipCode,
      phoneNumber: marketer.homeAddress?.phoneNumber,
      place: marketer.workAddress?.place || PlaceType.apt,
      no: marketer.homeAddress?.no,
      phoneNumberExtension: marketer.homeAddress?.phoneNumberExtension,
    };

    // Set Address Additional Controls Work Address
    this.workAddress.selectedCountryId.setValue(marketer.workAddress.countryId);
    this.workAddress.selectedStateId.setValue(marketer.workAddress.stateId);
    this.getStates(this.workAddress, null);
    this.getCities(this.workAddress, null);

    // Set Address Additional Controls Home Address
    this.homeAddress.selectedCountryId.setValue(marketer.homeAddress.countryId);
    this.homeAddress.selectedStateId.setValue(marketer.homeAddress.stateId);
    this.getStates(this.homeAddress, null);
    this.getCities(this.homeAddress, null);

    // Set Update Form Value
    this.updateProfileForm.patchValue({
      id: marketer.id,
      email: marketer.email,
      lastName: marketer.lastName,
      firstName: marketer.firstName,
      gender: marketer.gender,
      isSameWorkAndHomeAddress: marketer.isSameWorkAndHomeAddress,
      homeAddress: homeAddress,
      workAddress: workAddress,
      taxId: marketer.taxId,
      socialSecurityNumber: marketer.socialSecurityNumber,
    });

    setTimeout(() => {
      this.cdr.detectChanges();
    }, 1000);
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
      this.updateProfileForm.get('profileImageUrl')?.setValue(base64);
    });
  }
  removeLogoFile() {
    this.profileImageUrl = environment.avatarImage;
    this.updateProfileForm.get('profileImageUrl')?.setValue(null);
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
    let homeAddress = this.updateProfileForm.get('homeAddress');
    if (isSame) {
      homeAddress?.disable();
    }
    else {
      homeAddress?.enable();
    }
    return;
    // If Dont Show Home Address

    if (isSame) {
      // Save Address
      this.saveAddress = {
        additionalControl: this.homeAddress,
        address: this.updateProfileForm.controls['homeAddress'].value,
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
    let controls = (<FormGroup>this.updateProfileForm.get('homeAddress'))
      ?.controls;
    for (const control in controls) controls[control].disable();
    this.homeAddress.selectedCountryId.disable();
    this.homeAddress.selectedStateId.disable();
  }
  enableHomeAddress() {
    let controls = (<FormGroup>this.updateProfileForm.get('homeAddress'))
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
    this.setMasks();
    this.homeAddress.selectedStateId.setValue(this.saveAddress.selectedStateId);

    // Reset Form Group
    this.updateProfileForm.get('homeAddress')?.patchValue({
      addr: this.saveAddress.address?.addr,
      cityId: this.saveAddress.address?.cityId,
      phoneNumber: this.saveAddress.address?.phoneNumber,
      place: this.saveAddress.address.place,
      no: this.saveAddress.address.no,
      phoneNumberExtension: this.saveAddress.address.phoneNumberExtension,

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
      let workAddress = this.updateProfileForm.get('workAddress')?.value;
      this.updateProfileForm.get('homeAddress')?.patchValue({
        addr: workAddress?.addr,
        cityId: workAddress?.cityId,
        phoneNumber: workAddress?.phoneNumber,
        phoneNumberExtension: workAddress?.phoneNumberExtension,

        id: workAddress?.id,
        type: workAddress?.type,
        zipCode: workAddress?.zipCode,
        place: workAddress?.place,
        no: workAddress?.no,
        isPrimary: workAddress?.isPrimary,
        contactPhone: workAddress?.contactPhone,
      });
    }
    this.cdr.detectChanges();
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

  // Set Mask For Phone Number
  setPhoneNumberMask(telInputRef: NgxIntlTelInputComponent) {
    let regex = telInputRef.selectedCountry.placeHolder
      .toString()
      .replace(/\d/g, '9');
    Inputmask(regex).mask(document.getElementById(telInputRef.inputId)!);
  }
  //#endregion Address handel

  // #region Request Handels
  getRequestBody(): User_updateProfile_body {
    let value = this.updateProfileForm.value;
    const getAddress = (): any[] => {
      value.workAddress.phoneNumber = value.workAddress?.phoneNumber?.e164Number
        ?.toString()
        .replace(/\s|\(|\)|-/g, '');
      // value.workAddress.zipCode = Inputmask.unmask(value.workAddress.zipCode || '', { mask: 'aa 9{4,10}' });

      if (this.isSameAddress) {
        return [value.workAddress];
      } else {
        value.homeAddress.phoneNumber =
          value.homeAddress?.phoneNumber?.e164Number
            ?.toString()
            .replace(/\s|\(|\)|-/g, '');
        // value.homeAddress.zipCode = Inputmask.unmask(value.homeAddress.zipCode || '', { mask: 'aa 9{4,10}' });
        return [value.workAddress, value.homeAddress];
      }
    };
    return {
      updateUserDto: {
        id: value.id,
        firstName: value.firstName,
        lastName: value.lastName,
        gender: value.gender,
        password: value.password,
        logoFile: value.logoFile,
        profileImageUrl: value.profileImageUrl,
        isSameWorkAndHomeAddress: value.isSameWorkAndHomeAddress,
        taxId: value.taxId,
        socialSecurityNumber: value.socialSecurityNumber,
        addresss: getAddress(),
        creationDate: null,

        // Disable Field dont return with form value getter
        email: this.updateProfileForm.get('email')?.value,
      },
    };
  }
  submit() {
    // Check Access
    if (this.user?.role !== 'admin' && this.marketerUser.routeId) return;

    this.isLoading$.next(true);
    const updateSubscr = this.userHttpService
      .updateProfile(this.getRequestBody())
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe(() => {
        this.marketerUser
          .updateMarketer()
          .pipe(
            take(1),
            finalize(() => {
              this.isLoading$.next(false);
              this.cdr.detectChanges();
              KTScrollTop.goTop();
            })
          )
          .subscribe();
      });
    this.unsubscribe.push(updateSubscr);
  }
  // #endregion Request Handels

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
