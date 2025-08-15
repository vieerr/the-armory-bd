import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMap, MapAdvancedMarker, MapInfoWindow],
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class MapComponent {
  center: google.maps.LatLngLiteral = { lat: 51.678418, lng: 7.809007 };
  zoom = 12;
  
  // Example markers
  markers = [
    { lat: 51.673858, lng: 7.815982, label: "A" },
    { lat: 51.373858, lng: 7.215982, label: "B" },
    { lat: 51.723858, lng: 7.895982, label: "C" }
  ];

  // Info window handling
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  selectedMarker: any = null;

  openInfoWindow(marker: any, markerElement: any) {
    this.selectedMarker = marker;
    this.infoWindow?.open(markerElement);
  }
}