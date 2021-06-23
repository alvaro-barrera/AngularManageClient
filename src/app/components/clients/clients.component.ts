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

  store(f: NgForm) {
    // {value,valid}:{value:Client, valid:boolean}
    if (!f.valid) {
      this.flashMessagesService.show('Valores incorrectos en el formulario', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      this.clientService.storeClient(f.value);
      this.closeModal();
      this.clientForm.resetForm();
    }
  }

  private closeModal() {
    this.buttonClose.nativeElement.click();
  }
}
