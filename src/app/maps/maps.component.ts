import { Component,OnInit } from '@angular/core';
import {enableProdMode} from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable'; 
import { NgForm } from '@angular/forms';
declare var google: any;

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html'
})

export class MapsComponent implements OnInit {
 date: string = '';
  type: string = '';
  sens: string = '';
  besoins: FirebaseListObservable<any[]>;
  allbesoins: FirebaseListObservable<any[]>;
  msgVal: string = '';
  myVar: boolean =true;
	  constructor( public af: AngularFireDatabase) { 
	  this.date = this.getUrlParameter('date');
	  this.type = this.getUrlParameter('type');
	  this.sens = this.getUrlParameter('sens');
	  
	console.log (this.date,this.sens,this.type);
//	this.allbesoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, ref => ref.orderByChild('r').equalTo(null));


		this.myVar=false;
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToFirst: 100
	}
      });	
	
console.log ("val from DB",this.besoins);
  }
  ngOnInit() {
}       // var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
        // var mapOptions = {
        //   zoom: 13,
        //   center: myLatlng,
        //   scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        //   styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]
        //
        // }
        // var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //
        // var marker = new google.maps.Marker({
        //     position: myLatlng,
        //     title:"Hello World!"
        // });
        //
        // // To add the marker to the map, call setMap();
        // marker.setMap(map);
		  private getUrlParameter(sParam) {
  return decodeURIComponent(window.location.search.substring(1)).split('&')
   .map((v) => { return v.split("=") })
   .filter((v) => { return (v[0] === sParam) ? true : false })
   .reduce((prev, curv, index, array) => { return curv[1]; }, undefined);
  }
    }
