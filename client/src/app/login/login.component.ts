import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //todo: complete missing code
   itemForm!: FormGroup;
  errorMsg: string = '';
  successMsg: string = '';
  constructor(private fb:FormBuilder,private httpService:HttpService,private authSerivce:AuthService,private router:Router){}
  ngOnInit(): void {
    this.itemForm = this.fb.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  onLogin()
  {
    if(this.itemForm.valid)
    {
      this.httpService.Login(this.itemForm.value).subscribe({
        next:(res:any)=>{
          this.authSerivce.saveToken(res.token);
          this.authSerivce.SetRole(res.role);
          this.authSerivce.saveUserId(res.userId)
          this.router.navigate(['/dashboard'],{replaceUrl:true})
        },
        error:()=> {
          this.errorMsg="Invalid username or password"
        },
     } )
    }
  }

}