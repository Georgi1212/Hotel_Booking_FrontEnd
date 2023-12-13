import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class InitialFilterService {
  selectedCountry: string | null = null;
  selectedCity: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  clearSelection() {
    this.selectedCountry = null;
    this.selectedCity = '';
    this.startDate = null;
    this.endDate = null;
  }
}
