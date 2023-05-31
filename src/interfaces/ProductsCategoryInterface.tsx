export interface ProductsCategory {
    products: Product[];
}

export interface Product {
    _id:                     string;
    barcode:                 string;
    name:                    string;
    description:             string;
    quantity:                number;
    category:                Category;
    subcategory:             string;
    brand:                   Brand;
    price:                   number;
    price_purchase:          number;
    discount:                number;
    product_key:             string;
    sku:                     string;
    status:                  boolean;
    multimedia:              Multimedia[];
    tags:                    Tag[];
    createdAt:               Date;
    updatedAt:               Date;
    url:                     string;
    product_type:            string;
    google_product_category: string;
    location:                string;
    onzas?:                  number;
    prices:                  Price[];
    weight:                  number;
    discounts:               any[];
    measurements:            any[];
}

export enum Brand {
    The628F8Bf682D2E390786D959C = "628f8bf682d2e390786d959c",
    The628F8C2B82D2E390786Db72E = "628f8c2b82d2e390786db72e",
    The628F8C3882D2E390786Dc128 = "628f8c3882d2e390786dc128",
}

export enum Category {
    The63697D2E02Ef2Cc9B9Bd2F73 = "63697d2e02ef2cc9b9bd2f73",
}

export interface Multimedia {
    path:   string;
    _id:    string;
    images: Images;
}

export interface Images {
    original:    string;
    "400x400":   string;
    "750x750":   string;
    "1000x1000": string;
    "1400x1400": string;
    _id:         string;
}

export interface Price {
    currency: Currency;
    price:    number;
    _id:      string;
}

export enum Currency {
    Mxn = "MXN",
    Pab = "PAB",
    Pen = "PEN",
    Usd = "USD",
}

export interface Tag {
    tag_id: string;
    _id:    string;
}