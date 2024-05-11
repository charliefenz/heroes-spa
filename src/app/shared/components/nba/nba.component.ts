import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import { NBAInput } from '../../../models/nbaInput';

@Component({
  selector: 'app-nba',
  standalone: true,
  imports: [NgClass],
  templateUrl: './nba.component.html',
  styleUrl: './nba.component.scss'
})
export class NbaComponent implements OnChanges{
  @Input() nbaType: NBAInput['nbaType'] = 'info';
  @Input() message: string | undefined;
  @Output() informDestroyed : EventEmitter<boolean> = new EventEmitter();
  showTimeout = 5000;

  iconType: { [key: string]: string } = {
    error: 'errorRef', // TODO Look for icons
    success: 'successRef',
    info: 'infoRef'
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'].currentValue !== changes['message'].previousValue && changes['message'].previousValue === undefined) {
      console.log('nba-comp/messageInput', this.message)
      setTimeout(() => {
        this.informDestroyed.emit(true);
      }, this.showTimeout)
    }
  }
}

