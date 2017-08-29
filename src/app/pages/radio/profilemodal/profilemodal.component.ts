import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth/auth.service';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-profilemodal',
  templateUrl: './profilemodal.component.html',
  styleUrls: ['./profilemodal.component.css']
})
export class ProfilemodalComponent implements OnInit {
  closeResult: string;
  private user: User;
  private _loginStatus: boolean;
  private userKey: string;

  constructor(private modalService: NgbModal,
              private auth: AuthService,
              private usersService: UsersService) { }

  ngOnInit() {
    
  }

  open(content) {
    this.auth.getCurrentAuthState().subscribe(data => {
      this._loginStatus = this.auth.isAuthenticated();
      if (this._loginStatus) {
        this.userKey = this.auth.getCurrentUserId();
        // this.user = 
        this.usersService.getUser(this.userKey).subscribe((snapshot) => {
          this.user = snapshot;
          const usernameInput = document.getElementById('usernameInput');
          (<HTMLInputElement>usernameInput).value = this.user.username;
          const phoneInput = document.getElementById('phoneInput');
          if(this.user.phone) {
            (<HTMLInputElement>phoneInput).value = this.user.phone;
          }
          const genderInput = document.getElementById('genderInput');
          if (this.user.gender) {
            (<HTMLInputElement>genderInput).value = this.user.gender;
          }
          const datebirthInput = document.getElementById('datebirthInput');
          if (this.user.birth_date) {
            (<HTMLInputElement>datebirthInput).value = this.user.birth_date;
          }
        });
      }
    });
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  save() {
    console.log('Datos guardados');
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
