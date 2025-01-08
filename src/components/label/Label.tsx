import './Label.scss';

const Label = ({ id, label }: { id?: string; label?: string }) => {
  return (
    <label htmlFor={id} className='label'>
      {label}
    </label>
  );
};

export default Label;
