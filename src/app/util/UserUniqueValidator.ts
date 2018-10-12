import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Directive} from '@angular/core';

@Directive({
  selector: '[userUniqueValid][formControlName],[userUniqueValid][ngModel]',
  providers:
    [{
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UserUniqueValidator, multi: true
    }]
})
export class UserUniqueValidator implements Validator {
  private checkUserUniqueUrl = 'http://localhost:8080/api/checkUserUnique';

  constructor(private http: HttpClient) {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(control: AbstractControl): Promise<{ [key: string]: any }> {
    const user = control.value;
    const params = new HttpParams().set('user', user);
    return new Promise(resolve =>
      this.http.get(this.checkUserUniqueUrl, {params: params})
        .subscribe(res =>
          res ? resolve(null) : resolve({userUniqueValid: false})));
  }

}
