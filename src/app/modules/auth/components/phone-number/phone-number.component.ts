import { Component, OnInit } from '@angular/core';
import { PhoneNumberHandelService } from './phone-number-handel.service';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.scss'],
  providers: [PhoneNumberHandelService],
})
export class PhoneNumberComponent implements OnInit {
  // create instance phoneNumberHandel is required this constructor  
  constructor(private phoneNumberHandel: PhoneNumberHandelService) {}
  ngOnInit(): void {}
}
