import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FlightsService } from 'src/app/core/services/flights.service';
import { Flight } from 'src/app/models/flight.model';
import { FlightFormComponent } from '../flight-form/flight-form.component';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.scss']
})
export class EditFlightComponent implements AfterViewInit {
  @ViewChild('flightForm') flightForm: FlightFormComponent;
  flight : Flight;

  constructor(
    private flightsService: FlightsService,
    private toast: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngAfterViewInit(): void {
    this.loadFlight()
  }

  editFlight() {
    this.flightsService.editFlight(this.flight.key, this.flightForm.form.value)
      .then(this.onEditSuccess.bind(this), this.onFailure.bind(this))
  }

  removeFlight() {
    this.flightsService.removeFlight(this.flight.key)
      .then(this.onRemoveSuccess.bind(this), this.onFailure.bind(this))
  }

  private onEditSuccess() {
    this.router.navigate(['/dashboard'])
    this.toast.open('Flight has been successfully updated', '', {panelClass: 'toast-success'});
  }

  private onRemoveSuccess() {
    this.router.navigate(['/dashboard'])
    this.toast.open('Flight has been successfully deleted', '', {panelClass: 'toast-success'});
  }

  private onFailure() {
    this.toast.open('Error', '', {panelClass: 'toast-error'});
  }

  private loadFlight() {
    const key = this.route.snapshot.params['key']; 
    this.flightsService.getFlight(key)
    .pipe(tap(flight => this.flightForm.setFlight(flight)))
      .subscribe(flight => this.flight = flight);
  }

}
