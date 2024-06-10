import { Content } from "@schema";

export const prettyContent = (d: any) => {
  const prettyContent: Content = {
    ...d,
    sfd: "sd",
    fields: d.field,
    taxonomies: d.contentType?.mapContentTypeTaxonomyType.map((obj: any) => {
      return {
        ...obj.taxonomyType,
        recordIds: d.mapContentTaxonomy
          .filter(
            (map: any) => map.taxonomy.taxonomyTypeId === obj.taxonomyType.id
          )
          .map((o: any) => o.taxonomy.id),
      };
    }, {}),
    field: undefined,
    mapContentTaxonomy: undefined,
    contentType: undefined,
  };
  return prettyContent;
};

export const prettyType = (d: any) => {
  return {
    ...d,
    taxonomyTypes: d.mapContentTypeTaxonomyType?.map((t: any) => t.taxonomyType)??[],
    taxonomieTypeIds: d.mapContentTypeTaxonomyType?.map(
      (t: any) => t.taxonomyTypeId
    )??[],
    fieldTypes: d.fieldType,
    fieldType: undefined,
    mapContentTypeTaxonomyType: undefined,
  };
};

export const prettyTaxonomy = (d: any) => {
  return {
    ...d,
    taxonomies: d.taxonomy,
    taxonomy: undefined,
  };
};
