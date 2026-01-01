export const createFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  // Loop through object
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null || value.length < 1) return;

    // 📌 If value is File -> append directly
    if (value instanceof File) {
      formData.append(key, value);
    }

    // 📌 If value is array of Files -> append one by one
    else if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach((file) => formData.append(key, file));
    }

    // 📌 If value is an array -> convert to JSON string
    else if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    }

    // 📌 Booleans must be string
    else if (typeof value === "boolean") {
      formData.append(key, value ? "true" : "false");
    }
    // 📌 Booleans must be string
    else if (key === "tags") {
      const tagsArray = value.split(",");

      tagsArray.forEach((tag: string) => formData.append("tags[]", tag.trim()));
    }
    // 📌 Normal text fields
    else {
      formData.append(key, String(value));
    }
  });
  formData.delete("reviews");

  formData.delete("creator");
  formData.append("creator", "6902151f2684b533a0cd38a2");
  return formData;
};
