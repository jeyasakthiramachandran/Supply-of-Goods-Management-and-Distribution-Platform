import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  itemForm!: FormGroup;
  isSubmitting = false;
  errorMsg = '';
  successMsg = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ]
      ],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      role: ["", [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.isSubmitting = true;
      this.errorMsg = '';
      this.successMsg = '';

      this.httpService.registerUser(this.itemForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.successMsg = "Registration successful!";
          this.itemForm.reset();
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMsg =
            err.error?.message ||
            "Registration failed. Please try again.";
        }
      });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}