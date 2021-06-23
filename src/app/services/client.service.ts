import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestore,
} from '@Angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private db: AngularFirestore) {
    this.clientsCollection = db.collection('clients', (ref) =>
      ref.orderBy('name', 'asc')
    );
  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((action) => {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.clients;
  }

  findClient(id: string): Observable<Client> {
    this.clientDoc = this.db.doc<Client>(`clients/${id}`);
    return (this.client = this.clientDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data as any;
        }
      })
    ));
  }

  storeClient(client: Client) {
    this.clientsCollection.add(client);
  }

  updateClient(client: Client) {
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: Client) {
    this.clientDoc = this.db.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
