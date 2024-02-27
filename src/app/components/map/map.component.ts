import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, MapStyle, Marker, Popup, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  map: Map | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  markerIcons = [
    { icon: '../../../assets/red-marker-icon.png', name: 'RED-MARKER' },
    { icon: '../../../assets/green-marker-icon.png', name: 'GTREEN-MARKER' },
  ]

  constructor() {
  }

  ngOnInit(): void {
    config.apiKey = 'MZNDyCXZInU2EavUZBab';
    console.log("in map");
  }

  ngAfterViewInit() {
    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: [18.69, 45.552],
      zoom: 14
    });
    this.createMarkers();
  }

  createMarkers(){
    //sw park
    new Marker({color: "#FF0000"})
      .setLngLat([18.69721460389514, 45.55794914783099])
      .setPopup(new Popup().setHTML("<h3>Street Workout Park Osijek</h3><p>Ul. Kneza Trpimira, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#FF0000"})
      .setLngLat([18.70155495763761, 45.55819747114023])
      .setPopup(new Popup().setHTML("<h3>Park za vježbanje</h3><p>31000, Tvrđa, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#FF0000"})
      .setLngLat([18.70160994294413, 45.55324391981571])
      .setPopup(new Popup().setHTML("<h3>Street workout park</h3><p>Sjenjak bb, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#FF0000"})
      .setLngLat([18.69831404964911, 45.55071719405862])
      .setPopup(new Popup().setHTML("<h3>Street workout park</h3><p>31000, Novi Grad, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#FF0000"})
      .setLngLat([18.67011270429651, 45.568036156015374]) //45.568036156015374, 18.67011270429651
      .setPopup(new Popup().setHTML("<h3>Sportski park - Osječko-baranjske županije</h3><p>Sjevernodravska obala 700, 31000, Tvrđavica</p>"))
      .addTo(this.map);
      //gym
    new Marker({color: "#00FF00"})
      .setLngLat([18.69578217981138, 45.551095580133726])
      .setPopup(new Popup().setHTML("<h3>Blue Gym Sjenjak</h3><p>Sjenjak 133, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.709566690360493, 45.55393921657826])
      .setPopup(new Popup().setHTML("<h3>XXL Gym</h3><p>Bosanska ul. 2c, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.7316066254006, 45.55411417706824])
      .setPopup(new Popup().setHTML("<h3>Inova-Gim</h3><p>Ul. Zeleno polje 30A, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.713697514307075, 45.55092118470022])
      .setPopup(new Popup().setHTML("<h3>Pilates Studio Eccentric</h3><p>Ul. Martina Divalta 162, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.708746669743178, 45.55050693850119])
      .setPopup(new Popup().setHTML("<h3>Infinitum Wellness & Fitness</h3><p>Ul. Josipa Reihl - Kira 2c, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.70811295887855, 45.545316389980094])
      .setPopup(new Popup().setHTML("<h3>Dux Fitness</h3><p>Ul. kralja Petra Svačića 61, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.694061542842128, 45.54422253955909])
      .setPopup(new Popup().setHTML("<h3>Figuram</h3><p>Ul. Kneza Trpimira 23, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.67800650338374, 45.54479370294613])
      .setPopup(new Popup().setHTML("<h3>Blue gym Bosutsko</h3><p>Mercator, 31000, Industrijska četvrt, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.678758137685087, 45.5531021728793])
      .setPopup(new Popup().setHTML("<h3>City Fitness</h3><p>Autobusni kolodvor Osijek, Ul. Bartola Kašića 70, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.678133853667177, 45.5600647403447])
      .setPopup(new Popup().setHTML("<h3>Gyms4you Osijek</h3><p>Trg slobode 6, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.67689392218838, 45.562273515112096])
      .setPopup(new Popup().setHTML("<h3>Kaizen centar</h3><p>Ribarska ul. 4, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.672808917975978, 45.561547700262366])
      .setPopup(new Popup().setHTML("<h3>Blue gym centar</h3><p>Ul. Pavla Pejačevića 22, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.66758967304562, 45.559008044356275])
      .setPopup(new Popup().setHTML("<h3>Fitness club Fantastic Osijek</h3><p>Ružina ul. 83, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.664563470782078, 45.56391461086593])
      .setPopup(new Popup().setHTML("<h3>Fitness Central</h3><p>J.J. Strossmayera 111, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.65265543012726, 45.56424923368624])
      .setPopup(new Popup().setHTML("<h3>Fitness centar Ritam pulsa</h3><p>Ul. Josipa Jurja Strossmayera 203, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.647544480949083, 45.56228498005089])
      .setPopup(new Popup().setHTML("<h3>X BODY by Suzana</h3><p>Kolodvorska ul. 62, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.63865027555243, 45.564818215927716])
      .setPopup(new Popup().setHTML("<h3>PBS training zone</h3><p>Ul. Josipa Jurja Strossmayera 327, 31000, Osijek</p>"))
      .addTo(this.map);
    new Marker({color: "#00FF00"})
      .setLngLat([18.60841237662545, 45.52921071643854])
      .setPopup(new Popup().setHTML("<h3>Fitness Blue Gym</h3><p>Ul. Leopolda Mandića 118, 31431, Livana</p>"))
      .addTo(this.map);
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
