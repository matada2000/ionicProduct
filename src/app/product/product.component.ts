import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertController, IonicModule, ModalController } from "@ionic/angular";
import { ProductModalComponent } from "./product.modal";
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
                <ion-item *ngFor="let item of product; let i = index">
                    <ion-label>{{ item.name }}</ion-label>
                    <ion-label>{{ item.value }}</ion-label>
                    <ion-button color="warning" (click)="openModal(item, i)">
                        <ion-icon name="pencil"></ion-icon>
                    </ion-button>
                    <ion-button color="danger" (click)="deleteProduct(i)">
                        <ion-icon name="trash"></ion-icon>
                    </ion-button>
                </ion-item>
            </ion-list>
            
            <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                <ion-fab-button (click)="openModal()">
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

    constructor(private productService: ProductService, private modalController: ModalController, private alertController: AlertController) {
        this.product = this.productService.listProduct
    }

    addProduct() {
        const payload = {
            name: this.name,
            value: this.value
        }
        this.productService.add(payload)
        this.name = ''
        this.value = null
    }

    async openModal(item?: productDto, index?: number) {
        const modal = await this.modalController.create({
            component: ProductModalComponent,
            componentProps: {
                name: item?.name ?? null,
                value: item?.value ?? null,
                index: index ?? null
            },
            initialBreakpoint: 0.5,
            breakpoints: [0.5]
        })

        modal.present()
    }

    async deleteProduct(index: number) {
        const alert = await this.alertController.create({
            header: 'Delete Product',
            message: 'Are you sure?',
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: 'OK',
                    handler: () => {
                        this.productService.delete(index)
                        this.product = this.productService.listProduct
                    }
                }
            ]
        })

        alert.present()
    }
}

@NgModule({
    declarations: [ProductComponent, ProductModalComponent],
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