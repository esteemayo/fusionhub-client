const AccountIcon = ({ icon }: { icon: string }) => {
  return (
    <svg
      aria-hidden='true'
      focusable='false'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className='size-6'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d={icon} />
    </svg>
  );
};

export default AccountIcon;
