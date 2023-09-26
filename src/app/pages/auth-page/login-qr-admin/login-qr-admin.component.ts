import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user-service/user.service";

@Component({
  selector: 'app-login-qr-admin',
  templateUrl: './login-qr-admin.component.html',
  styleUrls: ['./login-qr-admin.component.css']
})
export class LoginQrAdminComponent implements OnInit{

  isError: boolean = false
  message: string = ''
  isLoad: boolean = false

  constructor(private route: ActivatedRoute,  private router: Router, private userService: UserService) {
  }
//login/:login/:password
  ngOnInit(): void {
    const login = this.route.snapshot.paramMap.get('login');
    const password = this.route.snapshot.paramMap.get('password')

    if (!login || !password){
      this.isError = true
      this.message = 'неверный QR'
      this.isLoad = true
      return
    }
   this.userService.loginAdmin({login, password}).subscribe({
     next: async (value) => {
       localStorage.setItem('token', value.token)
       await this.router.navigate(['/', 'admin'])
     },
     error: err => {
       console.log(err)
       this.isError = true
       this.message = 'неверный QR'
       this.isLoad = true
     }
   })

  }

}
