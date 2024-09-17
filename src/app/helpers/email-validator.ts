import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador de correo electrónico personalizado
export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null; // No hacer validación si el campo está vacío
    }

    // Verifica el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const isValid = emailPattern.test(control.value);
    
    return isValid ? null : { 'invalidEmail': true };
  };
}
