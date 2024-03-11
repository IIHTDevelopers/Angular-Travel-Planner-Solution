import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPlannerComponent } from './travelplanner.component';
import { FormsModule } from '@angular/forms';

describe('TravelplannerComponent', () => {
  let component: TravelPlannerComponent;
  let fixture: ComponentFixture<TravelPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TravelPlannerComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have initial places array populated', () => {
      expect(component.places.length).toBeGreaterThan(0);
    });

    it('should display "Places to Visit" heading', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Places to Visit');
    });

    it('should display place names correctly', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('div > div h3').textContent).toContain(component.places[0].name);
    });

    it('should have a button to select a place for creating an itinerary', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('button').textContent).toContain(component.places[0].name);
    });

    it('should update selectedPlaceId when a place is selected', () => {
      const placeId = component.places[0].id;
      component.selectPlace(placeId);
      expect(component.selectedPlaceId).toEqual(placeId);
    });

    it('should display "Places to Visit" as a heading', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain('Places to Visit');
    });

    it('should display "Hotels in" as a heading for each place', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h4').textContent).toContain('Hotels in');
    });

    it('should display "Available Rooms" for each hotel', () => {
      component.selectedPlaceId = component.places[0].id;
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.innerHTML).toContain('Available Rooms:');
    });

    it('should display "Select a Place for Your Itinerary" as a heading', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Select a Place for Your Itinerary');
    });

    it('should display "Create Your Itinerary" as a heading when a place is selected', () => {
      component.selectPlace(component.places[0].id);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Create Your Itinerary');
    });

    it('should display "Creating itinerary for:" when creating an itinerary', () => {
      component.selectPlace(component.places[0].id);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.innerHTML).toContain('Creating itinerary for:');
    });

    it('should have a number type field for "numberOfRooms"', () => {
      component.selectPlace(component.places[0].id);
      fixture.detectChanges();
      const compiled = fixture.nativeElement.querySelector('input[name="numberOfRooms"]');
      expect(compiled.type).toBe('number');
    });

    it('should have a date field for "startDate"', () => {
      component.selectPlace(component.places[0].id);
      fixture.detectChanges();
      const compiled = fixture.nativeElement.querySelector('input[name="startDate"]');
      expect(compiled.type).toBe('date');
    });

    it('should display "Please select a place to create an itinerary" when no place is selected', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Please select a place to create an itinerary');
    });

    it('should display "Days Recommended" for each place', () => {
      const compiled = fixture.nativeElement;
      const paragraphs = Array.from(compiled.querySelectorAll('p'));
      const daysRecommendedExists = paragraphs.some((p: any) => p.textContent.includes('Days Recommended:'));
      expect(daysRecommendedExists).toBeTruthy();
    });

    it('should display "Terrain" for each place', () => {
      const compiled = fixture.nativeElement;
      const paragraphs = Array.from(compiled.querySelectorAll('p'));
      const terrainExists = paragraphs.some((p: any) => p.textContent.includes('Terrain:'));
      expect(terrainExists).toBeTruthy();
    });

    it('should display "Transport" for each place', () => {
      const compiled = fixture.nativeElement;
      const paragraphs = Array.from(compiled.querySelectorAll('p'));
      const transportExists = paragraphs.some((p: any) => p.textContent.includes('Transport:'));
      expect(transportExists).toBeTruthy();
    });

    it('should display "Rating" for each place', () => {
      const compiled = fixture.nativeElement;
      const paragraphs = Array.from(compiled.querySelectorAll('p'));
      const ratingExists = paragraphs.some((p: any) => p.textContent.includes('Rating:'));
      expect(ratingExists).toBeTruthy();
    });

    it('should have a "Create Itinerary" button after selecting a place', () => {
      component.selectPlace(component.places[0].id);
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      const buttons = Array.from(compiled.querySelectorAll('button'));
      const createItineraryButtonExists = buttons.some((button: any) => button.textContent.trim() === 'Create Itinerary');
      expect(createItineraryButtonExists).toBeTruthy();
    });
  });
});