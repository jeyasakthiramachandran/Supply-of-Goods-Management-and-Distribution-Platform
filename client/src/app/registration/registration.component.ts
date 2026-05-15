import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
 
})
export class RegistrationComponent implements OnInit {

  constructor(private httpService:HttpService,private fb:FormBuilder,private router:Router){}
  itemForm!:FormGroup;
  isSubmitting:boolean=false;
  errorMsg=''
  showPassword=false;
  ngOnInit(): void {
    this.itemForm=this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",[Validators.required]],
      role:["",[Validators.required]],
      username:["",[Validators.required]]
    })
  }
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.isSubmitting = true;
      this.errorMsg = '';
      this.httpService.registerUser(this.itemForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
           
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMsg = err.error?.message || "Registration failed. Please try again.";
        }
      });
    }
  }
  
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

