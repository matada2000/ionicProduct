import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { productDto, ProductService } from "./product.service";

@Component({
    selector: 'app-product',
    template: `
        <ion-header>
            <ion-toolbar>
                <ion-title>Product Dashboard</ion-title>

            </ion-toolbar>
        </ion-header>
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

            <ion-list>
                <ion-item *ngFor="let item of product">
                    <ion-label>{{ item.name }}</ion-label>
                    <ion-label>{{ item.value }}</ion-label>
                </ion-item>
            </ion-list>

            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button (click)="addProduct()">
                    <ion-icon name="add"></ion-icon>
                </ion-fab-button>
            </ion-fab>
            
        </ion-content>
    `
})
export class ProductComponent { 

    product: productDto[]
    name: string
    value: number

    constructor(private productService: ProductService) {
        this.product = this.productService.listProduct
    }

    addProduct() {
        const payload = {
            name: this.name,
            value: this.value
        }
        this.productService.add(payload)
        this.name = ''
        this.value = 0
    }

}

@NgModule({
    declarations: [ProductComponent],
    imports: [CommonModule, RouterModule.forChild(
        [
            {
                path: '',
                component: ProductComponent
            }
        ]
    ), IonicModule, FormsModule, ReactiveFormsModule],
    providers: [ProductService]
})
export class ProductModule { }