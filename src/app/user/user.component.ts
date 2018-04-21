import {enableProdMode} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable'; 
import { NgForm } from '@angular/forms';

enableProdMode();
@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
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
  besoins: FirebaseListObservable<any[]>;
  allbesoins: FirebaseListObservable<any[]>;
  msgVal: string = '';
  myVar: boolean =true;
  constructor( public af: AngularFireDatabase) {
    this.users = af.list('/coursSupinfo/coursSupinfo', {
      query: {
        limitToLast: 50
      }
    });
	  this.date = this.getUrlParameter('date');
	  this.dateforbackup = this.getUrlParameter('date');
	  this.type = this.getUrlParameter('type');
	  this.sens = this.getUrlParameter('sens');
	  
	console.log (this.date,this.sens,this.type);
//	this.allbesoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, ref => ref.orderByChild('r').equalTo(null));
if (this.type=="achatspecial") {this.date = ""; }
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
	} else if (this.sens=="100last") {
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToLast: 100
	}
      });	
	} else if (this.sens=="100first") {
	
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToFirst: 100
	}
      });	
	} else if (this.sens=="backup") {
		this.myVar=false;
	this.besoins = af.list('/boteventinboxer/'+this.type+'/'+this.date, {
	query: {
        limitToFirst: 100
	}
      });	
	} 
console.log ("val from DB",this.besoins);
  }
  ngOnInit() {
} 
onSubmit(form: NgForm) { 
 //   console.log(form.value);
	const itemsmsgtosend = this.af.list('/boteventinboxer/msgtosend');
	if (this.type=="achatspecial") {
	if (form.value.reponserobot=="") {
		var reponsestandqrd="Pour ton achat: \n\n"+form.value.s+"\n\nil manque plus de détails. il me faut ce que tu veux acheter,ton contact et ta ville!\n\nPour toutes questions, contactez le +229 62502434.";
    this.addToListmsgtosend({user:form.value.user,msg:reponsestandqrd});
	this.removeItemFromListbesoin(form.value.valkey);
	} else if (form.value.reponserobot=="a") {
console.log ("ok not send");
this.removeItemFromListbesoin(form.value.valkey);

	} else if (form.value.reponserobot=="b") {
console.log ("ok not send");
 this.addToListmsgtosend({user:form.value.user,msg:"Pour ton achat special: "+form.value.s+"\n\n je n'ai pas encore un partenaire dans ta localité. je vais en chercher!\n\nPour toutes questions, contactez le +229 62502434."});
this.removeItemFromListbesoin(form.value.valkey);

	}	else {
		 this.addToListmsgtosend({user:form.value.user,msg:"Pour ton achat special:"+form.value.s+"\n\n Voici ma réponse:"+ form.value.reponserobot+"\n\nPour toutes questions, contactez le +229 62502434."});
		 const setreponses=this.af.object('/boteventinboxer/'+this.type+'/'+this.date+'/'+form.value.valkey);
		// setreponses.update({r:form.value.reponserobot}).then(_ => console.log('update!'));

		 this.addToListbackupbesointretait ({user:form.value.user,s:form.value.s,r:form.value.reponserobot});
		this.removeItemFromListbesoin(form.value.valkey);
}
	} else {
		if (form.value.reponserobot=="") {
		var reponsestandqrd="J'ai pas pu trouver une bonne solution pour ce besoin: \n\n"+form.value.s+"\n\nJe ferais mieux prochainement surtout pour les besoins d'achat de produits et services en te donnant un code d'achat ayant un retour sur achat d'un montant de 500f à 10000f!\n\nPour toutes questions, contactez le +229 62502434.";
    this.addToListmsgtosend({user:form.value.user,msg:reponsestandqrd});
	this.removeItemFromListbesoin(form.value.valkey);
	} else if (form.value.reponserobot=="a") {
console.log ("ok not send");
this.removeItemFromListbesoin(form.value.valkey);

	} else if (form.value.reponserobot=="b") {
console.log ("ok not send");
 this.addToListmsgtosend({user:form.value.user,msg:"Concernant:"+form.value.s+"\n\n je n'ai pas encore un partenaire dans ta localité. je vais en chercher!\n\nPour toutes questions, contactez le +229 62502434."});
this.removeItemFromListbesoin(form.value.valkey);

	}	else {
		 this.addToListmsgtosend({user:form.value.user,msg:"Concernant:"+form.value.s+"\n\n Voici ma réponse:"+ form.value.reponserobot+"\n\nPour toutes questions, contactez le +229 62502434."});
		 const setreponses=this.af.object('/boteventinboxer/'+this.type+'/'+this.date+'/'+form.value.valkey);
		// setreponses.update({r:form.value.reponserobot}).then(_ => console.log('update!'));

		 this.addToListbackupbesointretait ({user:form.value.user,s:form.value.s,r:form.value.reponserobot});
		this.removeItemFromListbesoin(form.value.valkey);
}	
	} 
 }
 
 addToListmsgtosend(item: any) {
	 console.log (item);
	 const itemsmsgtosend = this.af.list('/boteventinboxer/msgtosend');
   itemsmsgtosend.push(item);
  }
  
   addToListbackupbesointretait(item: any) {
	 const itemsmsgtosend = this.af.list('/boteventinboxer/backupbesointraite/'+this.dateforbackup);
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
