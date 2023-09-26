import {Component, OnInit} from '@angular/core';
import {IUser} from "../../../domains/user/users.interface";
import {UserConfigService} from "../services/users/user-config.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {
  users: IUser[] | null = null
  isLoad: boolean = false
  isError: boolean = false
  message: string = ''
  changeUser: IUser | undefined
  isViewConfirmWindow: boolean = false
  isViewInformer: boolean = false;

  constructor(private userService: UserConfigService) {
  }

  ngOnInit(): void {
    if (!this.userService.Users) {
      this.userService.getAllUser().subscribe({
        next: u => {
          console.log(u)
          this.users = u
          this.isLoad = true
        },
        error: err => {
          console.log(err)
          this.isError = true
          this.isLoad = true
        }
      })
    } else {
      this.users = this.userService.Users
      this.isLoad = true
    }
  }

  public addNewUser() {
    if (this.users && !this.users.find(u => u.id === 'new')) {
      this.users.push(this.userService.getNewUser())
      setTimeout(()=>  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 200)
    }
  }

  public saveUser(user: IUser) {
    this.userService.saveUser(user).subscribe({
      next: value => {
        console.log(value)
        if (this.users){
          this.users.filter((u, index)=>{
            if(u.id === user.id && this.users)
              this.users[index] = value
          })
        }
        this.isViewInformer = true
        this.message = 'Пользователь сохранен'
        this.startTimerCloseWindow()
      },
      error: err => {
        console.log(err)
        if (err.error?.message) {
          this.message = err.error.message
        } else {
          this.message = 'Ошибка сервера'
        }
        this.isViewInformer = true
        this.isError = true
      }
    })
  }
  startTimerCloseWindow(){
    setTimeout(()=>{this.cancelModalInformer()}, 1500)
  }
  deleteRequestUser(user: IUser) {
    this.changeUser = user
    this.isViewConfirmWindow = true
  }

  cancelModalWindow() {
    this.isViewConfirmWindow = false
    this.isError = false
  }
  cancelModalInformer() {
    this.isViewInformer = false
    this.message = ''
  }
  deleteUser() {
    this.cancelModalWindow()
    if (this.changeUser) {
      if (this.changeUser.id !== 'new')
        this.userService.deleteUser(this.changeUser.id).subscribe({
          next: value => {
            console.log(value)
            this.users = this.users?.filter(u => u.id !== value.id) ?? []
            this.userService.Users = this.users
            this.isViewInformer = true
            this.message = 'Пользователь удален'
            this.startTimerCloseWindow()
          },
          error: err => {
            console.log(err)
          }
        })
      else {
        this.users = this.users?.filter(u => u.id !== 'new') ?? []
        this.userService.Users = this.users
        this.isViewInformer = true
        this.message = 'Пользователь удален'
        this.startTimerCloseWindow()
      }
    }
  }


}
