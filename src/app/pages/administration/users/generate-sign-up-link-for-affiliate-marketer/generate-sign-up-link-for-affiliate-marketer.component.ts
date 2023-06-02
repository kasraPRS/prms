import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { AuthService, RoleType, UserModel } from 'src/app/modules/auth';
import { Clipboard } from '@angular/cdk/clipboard';

import { RoleDTO } from 'src/app/modules/auth/services/token.service';
import { MarketerLinkHttpService } from 'src/app/_requests/marketerLink/marketerLink.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { UserHttpService } from 'src/app/_requests/user/user.service';

import { environment } from 'src/environments/environment';
import { User_getAllUsersIdAndNameDTO } from 'src/app/_requests/user/userModel';
import { AdministrationTooltips } from 'src/app/_tooltip/tooltips';

@Component({
  selector: 'prms-generate-sign-up-link-for-affiliate-marketer',
  templateUrl: './generate-sign-up-link-for-affiliate-marketer.component.html',
  providers: [UserHttpService, MarketerLinkHttpService],
})
export class GenerateSignUpLinkForAffiliateMarketerComponent implements OnInit {
  tooltips = AdministrationTooltips.users.generateAffiliateMarketerSignupLink;
  private prefixLink: string = environment.registrationLink;
  private identityer: string = '';

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showGeneratedLink$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  allowedRoles: RoleDTO[] = [];
  selectedRole: RoleType | undefined;
  generatedLink: string;

  generateLinkForUser: boolean = false;
  selectedUser: User_getAllUsersIdAndNameDTO;
  users: User_getAllUsersIdAndNameDTO[];

  constructor(
    private clipboard: Clipboard,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private userHttpService: UserHttpService,
    private marketerLinkService: MarketerLinkHttpService
  ) {}
  ngOnInit(): void {
    this.init();
  }

  // Initialize Methods
  init() {
    this.getAllowedRoles(this.authService.currentUserValue?.role!);
    this.getUsers();
  }
  // #region Roles Handel
  resetAllowedRoles() {
    this.allowedRoles = [];
    this.selectedRole = undefined;
  }
  getAllowedRoles(userRole: RoleType) {
    this.allowedRoles = UserModel.getAllowedRoles(userRole);
    if (this.allowedRoles?.length)
      this.selectedRole = this.allowedRoles[0].value;
    this.cdr.detectChanges();
  }
  // #endregion Roles Handel

  // #region Link Handel
  toggleGeneratorLink() {
    this.generateLinkForUser = !this.generateLinkForUser;
    if (this.generateLinkForUser) {
      if (this.selectedUser)
        this.getAllowedRoles(this.selectedUser.marketerTypeTitle as RoleType);
      else this.resetAllowedRoles();
    } else {
      this.getAllowedRoles(this.authService.currentUserValue?.role!);
    }
  }
  onCopyLink() {
    this.clipboard.copy(this.generatedLink);
    this.toastr.success('Link Copied to Clipboard.');
  }
  generateLink(identityer: string) {
    this.identityer = identityer;
    this.generatedLink = `${this.prefixLink}?identityer=${identityer}`.replace(
      /("|')/gi,
      ''
    );
    this.showGeneratedLink$.next(true);
  }
  onGenerateNew() {
    this.showGeneratedLink$.next(false);
    // #region User Handel
  }
  // #region Link Handel

  // #region User Handel
  getUsers() {
    this.userHttpService.getAllUsersIdAndName({}).subscribe((response) => {
      this.users = response.items;
    });
  }
  selectUser(user: any) {
    if (user instanceof Event) return; // search items changes data and calls event change
    this.getAllowedRoles(user.marketerTypeTitle);
  }
  // #endregion User Handel

  // #region Send Data Methods
  onGenerate() {
    this.isLoading$.next(true);

    if (this.generateLinkForUser) {
      this.onGenerateLinkForUser();
    } else {
      this.onGenerateLinkForMe();
    }
  }
  onGenerateLinkForMe() {
    this.marketerLinkService
      .adminGeneretLink({ marketerTypeName: <RoleType>this.selectedRole })
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((identityer) => this.generateLink(identityer));
  }
  onGenerateLinkForUser() {
    this.marketerLinkService
      .adminGeneretLinkForUsers({
        userId: this.selectedUser.id,
        marketerTypeName: <RoleType>this.selectedRole,
      })
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe((identityer) => this.generateLink(identityer));
  }
  // #endregion Send Data Methods
}
