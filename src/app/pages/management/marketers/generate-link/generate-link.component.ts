import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { AuthService, RoleType } from 'src/app/modules/auth';
import { Clipboard } from '@angular/cdk/clipboard';

import { MarketerLinkHttpService } from 'src/app/_requests/marketerLink/marketerLink.service';
import { RoleDTO } from 'src/app/modules/auth/services/token.service';
import { ToastrService } from 'src/app/_services/toastr.service';
import { environment } from 'src/environments/environment';
import { ManagementTooltips } from 'src/app/_tooltip/management/management.tooltip';

@Component({
  selector: 'management-marketers-generate-link',
  templateUrl: './generate-link.component.html',
  styleUrls: ['./generate-link.component.scss'],
  providers: [
    MarketerLinkHttpService,
  ]
})
export class GenerateLinkComponent implements OnInit {
  tooltips = ManagementTooltips.marketers.generateAffiliateMarketerSignupLink;
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
    private authService: AuthService,
    private marketerLinkService: MarketerLinkHttpService,
  ) { }
  ngOnInit(): void { this.getAllowedRoles(); }

  // Get Data Methods
  getAllowedRoles() {
    this.allowedRoles = this.authService.currentUserValue?.allowedRoles!;
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
