import { TbMenu2, TbX } from "react-icons/tb";

export default function MenuButton({
  isToggled,
  onClick,
}: {
  isToggled: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-none text-secondary border-1 border-secondary p-1 rounded-md lg:hidden cursor-pointer"
    >
      {!isToggled ? <TbMenu2 fontSize="1.5rem" /> : <TbX fontSize="1.5rem" />}
    </div>
  );
}
