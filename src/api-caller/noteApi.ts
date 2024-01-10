import { getInstanceLocal } from "@api/apiClient";
import { INote } from "@constraint/constraint";
import { formattedError } from "@utils";

export default async function addNoteImage({
  note_title,
  note_equip,
  note_desc,
  note_img,
  img_id,
}: INote): Promise<boolean> {
  try {
    const { data } = await getInstanceLocal().post("/image/", {
      note_title,
      note_desc,
      note_equip,
      note_img,
      img_id,
    });
    return data;
  } catch (error) {
    throw formattedError(error);
  }
}
