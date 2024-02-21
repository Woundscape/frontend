import { ICreateCompare, INote } from "@constants";
import { formattedError } from "@utils";
import { getInstanceLocal } from "@api/apiClient";

export async function getImageNoteById(image_id: string): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get(`/note/image/${image_id}`);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function getCompareNoteById(compare_id: string): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get(
      `/note/compare/${compare_id}`
    );
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function addImageNote({
  note_title,
  note_equip,
  note_desc,
  note_img,
  img_id,
  author_id,
}: INote): Promise<boolean> {
  try {
    const formData = new FormData();

    formData.append("note_title", note_title);
    formData.append("note_desc", note_desc);
    formData.append("note_equip", JSON.stringify(note_equip));
    formData.append("img_id", img_id);
    formData.append("author_id", author_id);

    note_img.forEach((file, _) => {
      let fileBlob = file.originFileObj ?? new Blob();
      formData.append("file", fileBlob);
    });
    const { data } = await getInstanceLocal().post("/note/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export async function addCompareNote({
  note_title,
  note_desc,
  note_img,
  author_id,
  compare,
}: ICreateCompare): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("note_title", note_title);
    formData.append("note_desc", note_desc);
    note_img.forEach((file, _) => {
      let fileBlob = file.originFileObj ?? new Blob();
      formData.append("file", fileBlob);
    });
    formData.append("case_id", compare.case_id);
    formData.append("compare_info", JSON.stringify(compare.compare_info));
    formData.append("img_collect", JSON.stringify(compare.img_collect));
    formData.append("author_id", author_id);

    const { data } = await getInstanceLocal().post("/note/compare", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
