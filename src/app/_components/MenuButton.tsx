import { TbMenu2, TbX } from 'react-icons/tb';

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
      className='text-white bg-secondary p-1 rounded lg:hidden'
    >
      {!isToggled ? <TbMenu2 fontSize='2rem' /> : <TbX fontSize='2rem' />}
    </div>
  );
}
