import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Booking } from '../../models/booking.model';
import { Hotel } from '../../models/hotel.model';
import { Place } from '../../models/place.model';
import { Itinerary } from 'src/app/models/itenary.model';

@Component({
  selector: 'app-travel-planner',
  templateUrl: './travelplanner.component.html',
  styleUrls: ['./travelplanner.component.css']
})
export class TravelPlannerComponent {
  itineraries: Itinerary[] = [];
  selectedPlaceId: number | null = null;

  places: Place[] = [
    {
      id: 1,
      name: 'Mountain Valley',
      numberOfDays: 3,
      terrain: 'Mountain',
      transport: 'Bus',
      rating: 4.5
    },
  ];

  hotels: Hotel[] = [
    {
      id: 1,
      placeId: 1,
      name: 'Valley View Resort',
      starRating: 4,
      numberOfRooms: 10,
      rentPerNight: 1500
    },
  ];

  bookings: Booking[] = [
    {
      hotelId: 1,
      bookingDate: new Date('2024-03-15'),
      numberOfRoomsBooked: 2
    },
  ];

  bookHotel(form: NgForm) {
    const newBooking: Booking = {
      hotelId: form.value.hotelId,
      bookingDate: new Date(form.value.bookingDate),
      numberOfRoomsBooked: form.value.numberOfRoomsBooked,
    };
  }

  getPlaces() {
    return this.places.map(place => ({
      ...place,
      hotels: this.getHotelsForPlace(place.id)
    }));
  }

  getHotelsForPlace(placeId: number) {
    return this.hotels.filter(hotel => hotel.placeId === placeId).map(hotel => ({
      ...hotel,
      availableRooms: this.calculateAvailableRooms(hotel.id, new Date())
    }));
  }

  calculateAvailableRooms(hotelId: number, date: Date) {
    const hotel = this.hotels.find(hotel => hotel.id === hotelId);
    if (!hotel) return 0;

    const bookingsForHotel = this.bookings.filter(booking => booking.hotelId === hotelId && booking.bookingDate.toDateString() === date.toDateString());
    const bookedRooms = bookingsForHotel.reduce((acc, booking) => acc + booking.numberOfRoomsBooked, 0);

    return hotel.numberOfRooms - bookedRooms;
  }

  selectPlace(placeId: number) {
    this.selectedPlaceId = placeId;
  }

  createItinerary(form: NgForm) {
    if (this.selectedPlaceId == null) {
      alert('No place selected');
      return;
    }

    const newItinerary: Itinerary = {
      placeId: this.selectedPlaceId,
      startDate: new Date(form.value.startDate),
      endDate: new Date(form.value.endDate),
      hotelId: form.value.hotelId,
      numberOfRooms: form.value.numberOfRooms,
    };

    this.itineraries.push(newItinerary);
    form.reset();
    this.selectedPlaceId = null;
    alert('Itinerary created successfully!');
  }

  getSelectedPlaceName(): string | undefined {
    if (!this.selectedPlaceId) return undefined;
    return this.places.find(place => place.id === this.selectedPlaceId)?.name;
  }
}