import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Crew } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {
  form: FormGroup;
  jobs = [
    {label: 'Stewardess', value: 'stewardess'},
    {label: 'Senior Cabin Crew', value: 'senior_cabin_crew'},
    {label: 'Pilot', value: 'pilot'},
    {label: 'Co-Pilot', value: 'co_pilot'},
    {label: 'Mechanic', value: 'mechanic'}
  ]

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  get crew() {
    return this.form.get('crew') as FormArray;
  }

  buildCrewMember() {
    return this.formBuilder.group({
      name: '',
      job: ''
    })
  }

  removeCrewMember(i: number) {
    this.crew.removeAt(i);
  }

  addCrewMember() {
    this.crew.push(this.buildCrewMember())
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      origin: '',
      destination: '',
      departureTime: '',
      returnTime: '',
      code: '',
      additionalInformation: '',
      withSKPlanesDiscount: false,
      crew: this.formBuilder.array([this.buildCrewMember()])
    })
  }
}
