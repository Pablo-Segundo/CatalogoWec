export interface ProductsCategory {
    brands: Brand[];
}

export interface Brand {
    _id:        string;
    name:       string;
    url:        string;
    status:     boolean;
    products:   any[];
    data:       any[];
    image:      string;
    createdAt:  Date;
    updatedAt:  Date;
    categories: any[];
    images:     Images;
}

export interface Images {
    "400x400":   string;
    "750x750":   string;
    "1000x1000": string;
    "1400x1400": string;
    _id:         string;
}
