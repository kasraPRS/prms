import { ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { RoleType } from 'src/app/modules/auth';
import { Clipboard } from '@angular/cdk/clipboard';

import { RoleDTO } from 'src/app/modules/auth/services/token.service';
import { MarketerLinkHttpService } from 'src/app/_requests/marketerLink/marketerLink.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { environment } from 'src/environments/environment';
import { MarketerUser } from 'src/app/_services/marketer-user.service';

@Component({
  selector: 'prms-generate-affiliate-marketer-signup-link',
  templateUrl: './generate-affiliate-marketer-signup-link.component.html',
})
export class GenerateAffiliateMarketerSignupLinkComponent implements OnInit {
  private prefixLink: string = environment.registrationLink;
  private identityer: string = '';

  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showGeneratedLink$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  allowedRoles: RoleDTO[] = [];
  selectedRole: RoleType;
  generatedLink: string;


  constructor(
    private clipboard: Clipboard,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private marketerUser: MarketerUser,
    private marketerLinkService: MarketerLinkHttpService,
  ) { }
  ngOnInit(): void {
    this.getAllowedRoles();
  }

  // Get Data Methods
  getAllowedRoles() {
    this.allowedRoles = this.marketerUser.marketer?.allowedRoles!;
    if (this.allowedRoles?.length) this.selectedRole = this.allowedRoles[0].value;
    this.cdr.detectChanges();
  }

  // Send Data Methods
  onGenerate() {
    this.isLoading$.next(true);
    this.marketerLinkService.GeneretLink({ marketerTypeName: this.selectedRole }).pipe(
      finalize(() => this.isLoading$.next(false)),
    ).subscribe(
      identityer => {
        this.identityer = identityer;
        this.generatedLink = `${this.prefixLink}?identityer=${identityer}`.replace(/("|')/ig, '');
        this.showGeneratedLink$.next(true);
      }
    );
  }
  onCopyLink() {
    this.clipboard.copy(this.generatedLink);
    this.toastr.success('Link Copied to Clipboard.');
  }

  // Other Methods
  onGenerateNew() {
    this.showGeneratedLink$.next(false);
  }
}

