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
}