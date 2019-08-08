export class Catalog{
    id: number;
    name: string;
    description:string;
    parentId?: number;
}

export class CatalogFamily{
    catalog: Catalog;
    child: Catalog[];
    displayChild: boolean;
}