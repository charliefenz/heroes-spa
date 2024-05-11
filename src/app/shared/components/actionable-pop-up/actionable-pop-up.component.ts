import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-actionable-pop-up',
  standalone: true,
  imports: [],
  templateUrl: './actionable-pop-up.component.html',
  styleUrl: './actionable-pop-up.component.scss'
})
export class ActionablePopUpComponent {
  @Input() message: string | undefined;
  @Output() selectionEmitter: EventEmitter<boolean> = new EventEmitter();

  communicateChoice(choice: boolean) {
    this.selectionEmitter.emit(choice)
  }
}
