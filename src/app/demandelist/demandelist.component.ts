import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-demandelist',
  templateUrl: './demandelist.component.html',
  styleUrls: ['./demandelist.component.css']
})
export class DemandelistComponent implements OnInit {
coursObservable: Observable<any[]>;

constructor(private afDb: AngularFireDatabase) { }

ngOnInit() {

this.coursObservable = this.getCourses('/coursSupinfo');

}

getCourses(listPath): Observable<any[]> {

return this.afDb.list(listPath).valueChanges();

}

}
