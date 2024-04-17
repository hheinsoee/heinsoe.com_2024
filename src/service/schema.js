export const schema = {
  content: {
    read: [
      "id",
      "title",
      "description",
      "body",
      "type",
      "category_id",
      "fields",
      "img_url",
      "category_ids",
      "created_time",
      'updated_time'
    ],
    update: [
      "id",
      "title",
      "description",
      "body",
      "type",
      "category_id",
      "img_url",
    ],
    create: [
      "title",
      "description",
      "body",
      "type",
      "category_id",
      "img_url",
    ],
    create_required: ["title", "body", "type"],
  },
};
