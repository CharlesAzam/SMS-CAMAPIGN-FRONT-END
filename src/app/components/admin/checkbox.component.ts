import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'custom-checkbox',
    template: '<mat-checkbox [checked]="isChecked" (change)="emitCheckboxSelection($event.value)">{{action | titlecase}}</mat-checkbox>'
})
export class CheckBoxComponent {
    isChecked: boolean = false;
    @Input()
    action

    @Input() module

    @Output()
    saveSelection = new EventEmitter();

    emitCheckboxSelection(value) {
        this.isChecked = !this.isChecked
        this.saveSelection.emit({ module: this.module, action: this.action, state: this.isChecked })
    }

}