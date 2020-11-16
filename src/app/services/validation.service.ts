import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true };
    };
  }

  phoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[+]{0,1}[0-9]{7,12}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true };
    };
  }

  zipValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[0-9]{4,6}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalid: true };
    };
  }

}