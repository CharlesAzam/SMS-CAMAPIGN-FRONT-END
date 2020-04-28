import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'custom-checkbox-2',
    template: '<mat-checkbox [checked]="isChecked" (change)="emitCheckboxSelection($event.value)">{{action | titlecase}}</mat-checkbox>'
})
export class CheckBoxComponent2 {
    isChecked: boolean = true;
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