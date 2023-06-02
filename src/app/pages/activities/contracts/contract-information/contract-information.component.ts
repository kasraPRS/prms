import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractHttpService } from 'src/app/_requests/contract/contract.service';

@Component({
  selector: 'prms-contract-information',
  templateUrl: './contract-information.component.html',
})
export class ContractInformationComponent implements OnInit {

  id: number = 0
  content: string = `asfasdfs`;
  name: string = ''
  startDate: string = ''
  endDate: string = ''
  status: string = ''
  fullName: string = ''

  constructor(
    private ContractHttpService: ContractHttpService,
    private Router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.id = this.ContractHttpService.getStateContractId
    if (this.id <= 0) {
      this.Router.navigate(['activities/contracts'])
    }
  }

  ngOnInit(): void {
    this.onGetContract()
  }

  onGetContract() {
    this.ContractHttpService.get({ id: this.id }).subscribe(res => {
      this.id = res.id;
      this.name = res.name;
      this.content = res.content;
      this.startDate = res.startDate;
      this.endDate = res.endDate;
      this.status = res.status;
      this.fullName = res.fullName
      this.cdr.detectChanges();
    });
  }

  onBtnDeclinedContractClick() {
    const data = {
      id: this.id,
      status: 4
    }
    this.ContractHttpService.changeStatus(data).subscribe(data => {
      this.Router.navigate(['/administration/contracts'])
    });
  }

  onBtnSignContractClick() {
    const data = {
      id: this.id,
      status: 1
    }
    this.ContractHttpService.changeStatus(data).subscribe(data => {
      this.Router.navigate(['/administration/contracts'])
    });
  }

}
