import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  host: {
    'class': 'w-100'
  }
})
export class FormComponent {
  @Input() form_component: String | undefined;

}
