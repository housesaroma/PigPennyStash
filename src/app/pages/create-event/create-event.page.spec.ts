import { CreateEventPage } from './create-event.page';
import { IEvent } from '../../interfaces/event.interface';
import { Contact } from 'src/app/models/contact.model';

describe('CreateEventPage', () => {
  let component: CreateEventPage;

  beforeEach(() => {
    component = new CreateEventPage(
      {} as any,  // Router
      {} as any,  // ContactsService
      { dismiss: jasmine.createSpy('dismiss') } as any // ModalController
    );
  });

  describe('removeMember', () => {
    it('должен удалить участника по индексу', () => {
      component.selectedMembers = [
        { name: 'A' } as Contact,
        { name: 'B' } as Contact,
        { name: 'C' } as Contact
      ];

      component.removeMember(1); // Удалим "B"

      expect(component.selectedMembers.length).toBe(2);
      expect(component.selectedMembers.map(m => m.name)).toEqual(['A', 'C']);
    });

    it('не должен удалять ничего, если индекс вне диапазона', () => {
      component.selectedMembers = [
        { name: 'A' } as Contact,
        { name: 'B' } as Contact
      ];

      component.removeMember(5); // Неверный индекс

      expect(component.selectedMembers.length).toBe(2); // `splice` удаляет undefined
    });
  });

  describe('generateId', () => {
    it('должен вернуть максимальный id + 1, если события есть', () => {
      const mockEvents: IEvent[] = [
        { id: 1 } as IEvent,
        { id: 3 } as IEvent,
        { id: 7 } as IEvent
      ];

      const newId = component['generateId'](mockEvents);

      expect(newId).toBe(8);
    });

    it('должен вернуть 1, если список событий пустой', () => {
      const newId = component['generateId']([]);
      expect(newId).toBe(1);
    });
  });
});
