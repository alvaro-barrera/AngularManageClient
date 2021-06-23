import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore
} from '@Angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { map } from "rxjs/operators";

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(
    private db: AngularFirestore
  ){
    this.clientsCollection = db.collection("clients",ref => ref.orderBy("name","asc"));
  }

  getClients():Observable<Client[]>{
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(action =>{
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        }
        )
      })
    );
    return this.clients;
  }

  storeClient(client: Client){
    this.clientsCollection.add(client);
  }
}
