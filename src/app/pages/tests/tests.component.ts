import { Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/_requests/user/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'prms-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  constructor(
    private UserHttpService: UserHttpService
  ) { }

  ngOnInit(): void {
  }
  DO() {
    // this.UserHttpService.user().subscribe();
    Swal.fire({ text: 'Are u sure?', icon: 'warning', confirmButtonText: 'Yes', showCancelButton: true }).then(res => { 
      console.log(res);
      
    });
  }

}
