import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true,
  pure: false // Для динамического обновления
})
export class PhoneFormatPipe implements PipeTransform {
  transform(phoneNumber: string): string {
    if (!phoneNumber) return '';

    const cleaned = phoneNumber.replace(/\D/g, '');

    let processedValue = cleaned;
    if (/^[0-9]/.test(phoneNumber) && !cleaned.startsWith('8')) {
      processedValue = '8' + cleaned;
    }

    let formatted = '';
    if (processedValue.length > 0) {
      formatted = `8 (${processedValue.slice(1, 4)}`;
    }
    if (processedValue.length >= 4) {
      formatted += `) ${processedValue.slice(4, 7)}`;
    }
    if (processedValue.length >= 7) {
      formatted += ` ${processedValue.slice(7, 9)}`;
    }
    if (processedValue.length >= 9) {
      formatted += ` ${processedValue.slice(9, 11)}`;
    }

    return formatted;
  }
}
