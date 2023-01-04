import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ProductService } from "./product.service";

@Component({
    selector: 'app-product-modal',
    template: `
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label>Product name</ion-label>
                    <ion-input type="text" [(ngModel)]="name" name="name"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Product value</ion-label>
                    <ion-input type="number" [(ngModel)]="value" name="value"></ion-input>
                </ion-item>
            </ion-list>

            <ion-button *ngIf="index === null" (click)="addProduct()">Add Product</ion-button>
            <ion-button *ngIf="index !== null" (click)="update()">Update Product</ion-button>
        </ion-content>
    `
})
export class ProductModalComponent {

    @Input() name!: string | null
    @Input() value!: number | null
    @Input() index: number | null

    constructor(private productService: ProductService, private modalController: ModalController) {
    }

    addProduct() {
        const payload = {
            name: this.name,
            value: this.value
        }
        this.productService.add(payload)
        this.name = ''
        this.value = null
        this.modalController.dismiss()
    }

    update() {
        const payload = {
            name: this.name,
            value: this.value
        }
        this.productService.update(payload, this.index)
        this.name = ''
        this.value = null
        this.index = null
        this.modalController.dismiss()  
    }

}