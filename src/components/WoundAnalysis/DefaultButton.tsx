interface DefaultButtonProps {
  onChange: () => void;
  editable?: boolean;
  title: string; // Add the title prop
  sub_title?: string;
  bordered?: boolean;
  backgroundColor?: string;
}

function DefaultButton({
  onChange,
  editable,
  title,
  sub_title,
  bordered,
  backgroundColor,
}: DefaultButtonProps) {
  const handleClick = () => {
    if (onChange && typeof onChange === "function") {
      onChange();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-28 jura text-md flex justify-center items-center ${
        bordered ? "border border-[#9198AF]" : ""
      } text-[#4C577C] rounded-md ${editable ? backgroundColor : ""}`}
    >
      {!editable ? title : sub_title || title}
    </button>
  );
}

export default DefaultButton;
