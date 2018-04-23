import {enableProdMode} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable'; 
import { NgForm } from '@angular/forms';
import 'rxjs/add/operator/map';
// import entire SDK


enableProdMode();
@Component({
  selector: 'app-questionpub',
  templateUrl: './questionpub.component.html',
  styleUrls: ['./questionpub.component.css']
})

export class QuestionpubComponent implements OnInit{
/*	
	users:FirebaseListObservable<any>;;
    constructor(db2: AngularFireDatabase) {
    this.users = db2.list('coursSupinfo/coursSupinfo');
	console.log ("val from DB",this.users);
          }
	
  ngOnInit() {
}
*/
///demandeservicespecial ou besoindujour ou backupbesointraite

  users: FirebaseListObservable<any[]>;
  date: string = '';
  dateforbackup: string = '';
  type: string = '';
  sens: string = '';
  dejapasse:string="";
   img: string = 'http://seg.solutions/imgbot/logookkk.png';
  nomprenom: string = '-';
  besoins: FirebaseListObservable<any[]>;
  allbesoins: FirebaseListObservable<any[]>;
  msgVal: string = '';
  myVar: boolean =true;
  constructor( public af: AngularFireDatabase) {
    this.users = af.list('/coursSupinfo/coursSupinfo', {
      query: {
        limitToLast: 5
      }
    });
	  this.date = this.getUrlParameter('date');
	  this.dateforbackup = this.getUrlParameter('date');
	  this.type = this.getUrlParameter('type');
	  this.sens = this.getUrlParameter('sens');
	  
	console.log (this.date,this.sens,this.type);
//	this.allbesoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, ref => ref.orderByChild('r').equalTo(null));
if (this.type=="achatspecial") {this.date = ""; }
  if (this.type.indexOf("EVENTSUCCES") >= 0) {this.type=this.type.replace("EVENTSUCCES","");this.date=this.type;this.type="questionpub";}
	if (this.sens=="debut") {
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToFirst: 1
	}
      });
	} else if (this.sens=="fin") {
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToLast: 1
	}
      });	
	} else if (this.sens=="5last") {
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToLast: 5
	}
      });	
	} else if (this.sens=="5first") {
	
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToFirst: 5
	}
      });	
	} else if (this.sens=="backup") {
		this.myVar=false;
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToFirst: 5
	}
      });	
	} else {
		this.myVar=false;
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToFirst: 5
	}
      });		
	}

/* this.besoins.map(song => {
	song [0].img="ffff";
  console.log ("val from song",song);
  return song;
})
.subscribe(songs => {
  songs.forEach(song => this.forimguser(song.user))
    console.log ("val from this.img",this.img);
//return songs;
}); */
console.log ("val from DB",this.besoins);
  }
  ngOnInit() {
} 
onSubmit(form: NgForm) { 
 //   console.log(form.value);
	const itemsmsgtosend = this.af.list('/boteventinboxer/msgtosend');

		if (form.value.reponserobot=="") {
		var reponsestandqrd="Je n'ai eu aucune réponse par rapport à ta question: \n\n"+form.value.s;
    this.addToListmsgtosend({user:form.value.user,msg:reponsestandqrd});
	this.removeItemFromListbesoin(form.value.valkey);
	}	else {
		 this.addToListmsgtosend({user:form.value.user,msg:"Concernant:"+form.value.s+"\n\n Voici la réponse:"+ form.value.reponserobot});
		 const setreponses=this.af.object('/boteventinboxer/'+this.type+'/'+this.date+'/'+form.value.valkey);
		// setreponses.update({r:form.value.reponserobot}).then(_ => console.log('update!'));

		 this.addToListbackupbesointretait ({user:form.value.user,s:form.value.s,r:form.value.reponserobot});
		this.removeItemFromListbesoin(form.value.valkey);
}
 }

 
 addToListmsgtosend(item: any) {
	 console.log (item);
	 const itemsmsgtosend = this.af.list('/boteventinboxer/msgtosend');
   itemsmsgtosend.push(item);
  }
  
   addToListbackupbesointretait(item: any) {
	 const itemsmsgtosend = this.af.list('/boteventinboxer/backupbesoinquestionpub/'+this.type);
   itemsmsgtosend.push(item);		   
  }
  
  removeItemFromListbesoin(key: string) {
   this.besoins.remove(key).then(_ => console.log('item deleted!'));
  }
  updateValuebesoin(data: any) {
  //  this.value.update(data).then(_ => console.log('update!'));
  }
  
  private getUrlParameter(sParam) {
  return decodeURIComponent(window.location.search.substring(1)).split('&')
   .map((v) => { return v.split("=") })
   .filter((v) => { return (v[0] === sParam) ? true : false })
   .reduce((prev, curv, index, array) => { return curv[1]; }, undefined);
  }
/* users: Observable<any[]>;

constructor(private afDb: AngularFireDatabase) { }

ngOnInit() {

this.users = this.getCourses('/coursSupinfo');
console.log ("val from DB",this.users);
}

getCourses(listPath): Observable<any[]> {

return this.afDb.list(listPath);

} */

}

