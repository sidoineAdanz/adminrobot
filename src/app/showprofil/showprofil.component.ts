import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable'; 
import * as aws from 'aws-sdk';
var key="hhh";
var secret="jjj";
aws.config.update({
  region: "us-east-2"
});
var  s3 = new aws.S3({
  accessKeyId: key,
  secretAccessKey: secret
});
 var dynamodb = new aws.DynamoDB({
  accessKeyId: key,
  secretAccessKey: secret,
  apiVersion: '2012-08-10'
});
var docClient = new aws.DynamoDB.DocumentClient({
 accessKeyId: key,
  secretAccessKey: secret
});
@Component({
  selector: 'app-showprofil',
  templateUrl: './showprofil.component.html',
  styleUrls: ['./showprofil.component.css']
})
export class ShowprofilComponent implements OnInit {
 user: string = '';
 userdata: string = '';
  constructor(private ref:ChangeDetectorRef) {
this.user = this.getUrlParameter('user');

	  var params = {TableName:"sucusers",Key:{"k":this.user}};
	
docClient.get(params, function(err, data) {
            if (err || data.Item==null)  { console.error(err); return null;
        } else {
			console.log ("val data",data);
this.userdata = data.Item.d.id;this.user = data.Item.d.id;
this.userdata.subscribe( () => {
	  console.log(this.userdata);
           this.cd.markForCheck();
        });
console.log(this.userdata);
ref.detectChanges();
console.log(this.userdata);

        }
  })
  }

  ngOnInit() {
  }
  private getUrlParameter(sParam) {
  return decodeURIComponent(window.location.search.substring(1)).split('&')
   .map((v) => { return v.split("=") })
   .filter((v) => { return (v[0] === sParam) ? true : false })
   .reduce((prev, curv, index, array) => { return curv[1]; }, undefined);
  }
}
