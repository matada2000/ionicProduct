import { Injectable } from "@angular/core";

export interface productDto {
    name: string,
    value: number
}

@Injectable()
export class ProductService {
    
    listProduct: productDto[] = [{
        name: 'mouse',
        value: 10
    },
    {
        name: 'keyboard',
        value: 15
    }
]

    constructor() {}

    add(item: productDto) {
        this.listProduct.push(item)
    }

    update(item: productDto, index: number) {
        this.listProduct.filter( (value, i) => {
            if (i === index) {
                value.name = item.name ?? value.name
                value.value = item.value ?? value.value
            }
        })
    }

    delete(index: number) {
        this.listProduct = this.listProduct.filter( (_, i) => {
            return i !== index
        })
    }
}