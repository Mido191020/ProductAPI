import { Controller, Post,Body,Get,Patch,Delete,Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(private readonly ProductService:ProductService) {}
    @Post()
    addProduct(
        @Body('title') prodTitle:string,
        @Body('description') prodDesc:string,
        @Body('price') prodPrice:number,
    ){
       const genratedId= this.ProductService.insertProduct(prodTitle,prodDesc,prodPrice);
       return {id:genratedId};
    }
    @Get()
    getAllProducts(){
       return this.ProductService.getALLProducts();
    }
    @Get(':id')
getProduct(@Param('id') prodId: string) {
    return this.ProductService.getSingleProduct(prodId);
}

    @Patch(':id')
    updateProduct(
        @Body('id') productId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ){
        this.ProductService.updateProduct(productId, prodTitle, prodDesc, prodPrice);
        return null;
    }
    @Delete(':id')
    removeProduct(@Body('id') prodId:string){
        this.ProductService.deleteProduct(prodId);
        return null;
    }
}