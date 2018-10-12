import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Attribute, Directive} from '@angular/core';

@Directive({
  selector: '[validateEqual][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualToValidator, multi: true
  }]
})
export class EqualToValidator implements Validator {
  constructor(@Attribute('validateEqual') public validateEqual: string) {
  }

  registerOnValidatorChange(fn: () => void): void {
  }

  validate(c: AbstractControl): { [key: string]: any } {
    const v = c.value;
    const e = c.root.get(this.validateEqual);
    if (e && v !== e.value) {
      return {validateEqual: false};
    }
    e.valueChanges.subscribe((val: string) => {
        if (val !== v) {
          c.setErrors({validateEqual: false});
        } else {
          c.setErrors(null);
        }
      }
    );
    return null;
  }
}
