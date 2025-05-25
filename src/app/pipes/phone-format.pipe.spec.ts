import { PhoneFormatPipe } from './phone-format.pipe';

describe('PhoneFormatPipe', () => {
  let pipe: PhoneFormatPipe;

  beforeEach(() => {
    pipe = new PhoneFormatPipe();
  });

  it('должна вернуть пустую строку, если входное значение пустое', () => {
    expect(pipe.transform('')).toBe('');
    expect(pipe.transform(null as any)).toBe('');
    expect(pipe.transform(undefined as any)).toBe('');
  });

  it('должна форматировать номер начиная с 8', () => {
    expect(pipe.transform('81234567890')).toBe('8 (123) 456 78 90');
  });

  it('должна автоматически добавить 8 в начало, если номер начинается с 9', () => {
    expect(pipe.transform('9123456789')).toBe('8 (912) 345 67 89');
  });

  it('должна игнорировать нецифровые символы', () => {
    expect(pipe.transform('+7 (912) 345-67-89')).toBe('8 (912) 345 67 89');
  });
});
