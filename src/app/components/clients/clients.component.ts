import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];

  client: Client = {
    name: '',
    lastname: '',
    budget: 0,
  };

  titleModal = 'Agregar cliente';

  id: number | null = null;

  @ViewChild('clientForm') clientForm: NgForm;
  @ViewChild('buttonClose') buttonClose: ElementRef;

  constructor(
    private clientService: ClientService,
    private flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
    });
  }

  getBudgetTotal() {
    let budgetTotal: number = 0;
    if (this.clients) {
      this.clients.forEach((client) => {
        budgetTotal += client.budget;
      });
    }
    return budgetTotal;
  }

  edit(id?: string) {
    this.titleModal = 'Editar cliente';
    if (id) {
      this.clientService.findClient(id).subscribe((client) => {
        this.client = client;
      });
    } else {
      this.flashMessagesService.show('Algo ocurrió mal, vuelva a intentar', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    }

    // this.client.id = client.id;
    // this.client.name = client.name;
    // this.client.lastname = client.lastname;
    // this.client.email = client.email;
    // this.client.budget = client.budget;
  }

  handleSave(f: NgForm) {
    if (!f.valid) {
      this.flashMessageFormInvalid();
    } else {
      if (this.client.id) {
        f.value.id = this.client.id;
        this.updateClient(f.value);
      } else {
        this.storeClient(f.value);
      }
    }
  }

  storeClient(client: Client) {
    this.clientService.storeClient(client);
    this.closeModal();
    this.clearRegister();
  }
  updateClient(client: Client) {
    console.log(client);
    this.clientService.updateClient(client);
    this.closeModal();
    this.clearRegister();
  }
  deleteClient(client:Client) {
    if (confirm(`¿Desea eliminar al cliente?`)) {
      this.clientService.deleteClient(client);
    }
  }

  flashMessageFormInvalid(): void {
    this.flashMessagesService.show('Valores incorrectos en el formulario', {
      cssClass: 'alert-danger',
      timeout: 4000,
    });
  }

  clearRegister(): void {
    this.clientForm.resetForm();
    this.client.id = '';
    this.titleModal = 'Agregar cliente';
  }

  private closeModal() {
    this.buttonClose.nativeElement.click();
  }
}
