import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'acme-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  @Input() public scale: number = 1;

  constructor() {}

  ngOnInit(): void {}
}
