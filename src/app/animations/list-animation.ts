import { animate, query, stagger, style, transition, trigger } from "@angular/animations"


export const listAnimate = () => {
    return trigger('list-animation', [
        transition(':enter', [
            query('ion-item', [
                style({ opacity: 0, transform: 'translateY(20px)' }),
                stagger(100, [
                    animate('300ms ease-out', style({ opacity: 1, transform: 'none' }))
                ])
            ])
        ])
    ])
}