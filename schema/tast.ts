export type Content = {
    id: number;
    title: string;
    description: string;
    body?: string;
    contentTypeTd: number;
    createTime: Date;
    fields: Field[] | [];
    taxonomies: Taxonomy[] | [];
};
export type ContentType = {
  id: number;
  name: string;
  description: Text;
  createTime: Date;
  fieldTypes: FieldType[];
  taxonomyTypes: TaxonomyType[];
};

export type Field = {
  id: number;
  name: string;
  value: string;
};

export type FieldType = {
  id: number;
  name: string;
  contentTypeId: number;
  dataType: string;
  createTime: Date;
};

export type Taxonomy = {
  id: number;
  name: string;
  recordIds: number[];
};
export type TaxonomyType = {
  id: number;
  name: string;
  description: Text;
  createTime: Date;
};

export interface MapContentTaxonomy {
  id: number;
  contentId: number;
  taxonomyId: number;
  createTime: string | null;
  on: string | null;
}

export interface MapContenttypeTaxonomytype {
  id: number;
  taxonomyTypeId: number;
  contentTypeId: number;
  createTime: string | null;
  on: string | null;
}
