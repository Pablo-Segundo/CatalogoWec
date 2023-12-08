export interface MessageResponse {
    message: string;
  }
  export interface ProductsResponse {
    products: Product[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: null;
    nextPage: number;
  }
  
  export interface Product {
    _id:            string;
    barcode:        string;
    name:           string;
    description:    string;
    quantity:       number;
    category:       Brand;
    subcategory:    Brand;
    brand:          Brand;
    price:          number;
    price_purchase: number;
    discount:       number;
    product_key:    string;
    sku:            string;
    status:         boolean;
    multimedia:     Multimedia[];
    tags:           Tag[];
    createdAt:      Date;
    updatedAt:      Date;
    url:            string;
    product_type:   string;
    prices:         Price[];
    discounts:      any[];
    measurements:   any[];
    weight?:        number;
  }
  export interface Price {
    currency: Currency;
    price:    number;
    _id:      string;
  }
  
  export enum Currency {
    Clp = "clp",
    Eur = "EUR",
    Mxn = "MXN",
    Pen = "PEN",
    Usd = "USD",
  }
  export interface Brand {
    _id: string;
    name: string;
  }
  
  export interface Category {
    _id: string;
    name: string;
  }
  
  export interface Subcategory {
    _id: string;
    name: string;
  }
  
  export interface Multimedia {
    path: string;
    _id: string;
  }
  
  export interface Tag {
    tag_id: string;
    _id: string;
  }
  
  export interface ProductResponse {
    product: Product;
  }
  
  export interface Multimedia {
    _id:     string;
    images?: Images;
    path:    string;
  }
  
  export interface Images {
    "1000x1000": string;
    "1400x1400": string;
    "400x400":   string;
    "750x750":   string;
    _id:         string;
    original:    string;
  }
  