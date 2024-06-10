export type Content = {
  id: number;
  title: string;
  description: string;
  body?: string;
  contentTypeId: number;
  createTime: Date;
  fields: Field[] | [];
  taxonomies: Taxonomy[] | [];
  img_url?:string
};
export type ContentType = {
  id: number;
  name: string;
  description?: Text;
  createTime?: Date;
  fieldTypes: FieldType[] | [];
  taxonomieTypeIds: number[];
  taxonomyTypes?: TaxonomyType[];
};
export type CreateContentType = Omit<TaxonomyType, "id">;
export type UpdateContentType = TaxonomyType;

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
  taxonomiesNames: string[];
  taxonomies: Taxonomy[];
};
export type CreateTaxonomyType = Omit<TaxonomyType, "id">;
export type UpdateTaxonomyType = TaxonomyType;

export type MapContentTaxonomy = {
  id: number;
  contentId: number;
  taxonomyId: number;
  createTime: string | null;
  on: string | null;
};

export type MapContenttypeTaxonomytype = {
  id: number;
  taxonomyTypeId: number;
  contentTypeId: number;
  createTime: string | null;
  on: string | null;
};
