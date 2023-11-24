import { Injectable,NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
@Injectable()
export class ProductService {
   private products :Product []= [];
    insertProduct(title:string,dec:string,price:number){
        const prodId=Math.random().toString();
        const newProduct=new Product(prodId,title,dec,price);
        this.products.push(newProduct);
        return prodId;
    }
    getALLProducts(){
        return [...this.products];
    }
    getSingleProduct(productId:string){
       const product= this.findproduct(productId)[0];
         return {...product};
    }

    updateProduct(productId: string, title: string, dec: string, price: number) {
        const [product, index] = this.findproduct(productId);
    
        // Update the properties directly on the existing product
        if (title) {
            product.title = title;
        }
        if (dec) {
            product.description = dec;
        }
        if (price) {
            product.price = price;
        }
    
        // Update the product in the array
        this.products[index] = product;
    }

    
    deleteProduct(prodId:string){
        const index=this.findproduct(prodId)[1];
        this.products.splice(index,1);
    }
    private findproduct(id: string):[Product,number]{
        const productIndex=this.products.findIndex(prod=>prod.id===id);
        const product=this.products[productIndex];
        if(!product){
            throw new NotFoundException('Could not find product');

        }
        return [product,productIndex];
    }
}