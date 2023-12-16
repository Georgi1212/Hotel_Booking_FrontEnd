import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class InitialFilterService {
  selectedCountry: string = '';
  selectedCity: string = '';
  startDate!: Date;
  endDate!: Date;
}
