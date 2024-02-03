import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-default',
  templateUrl: './modal-default.component.html',
  styleUrls: ['./modal-default.component.scss']
})
export class ModalDefaultComponent implements OnInit {
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

}
