import { getInstanceLocal } from "@api/apiClient";
import { INote } from "@constraint/constraint";
import { formattedError } from "@utils";

export async function getNoteImageById(note_id: string): Promise<any> {
  try {
    const { data } = await getInstanceLocal().get(`/note/image/${note_id}`);
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}

export default async function addNoteImage({
  note_title,
  note_equip,
  note_desc,
  note_img,
  img_id,
}: INote): Promise<boolean> {
  try {
    const formData = new FormData();

    formData.append("note_title", note_title);
    formData.append("note_desc", note_desc);
    formData.append("note_equip", JSON.stringify(note_equip));
    formData.append("img_id", img_id);

    note_img.forEach((file, _) => {
      let fileBlob = file.originFileObj ?? new Blob();
      formData.append("file", fileBlob);
    });
    const { data } = await getInstanceLocal().post("/note/image/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
