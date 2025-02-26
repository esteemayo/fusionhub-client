import Button from '../button/Button';
import Input from '../input/Input';
import ContactHeading from '../contactHeading/ContactHeading';

import './Newsletter.scss';

const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <aside className='newsletter'>
      <div className='newsletter__container'>
        <ContactHeading
          title='Our newsletters'
          subtitle='Subscribe to our newsletter to get the latest updates directly to your inbox.'
          type='sm'
        />
        <form onSubmit={handleSubmit} className='newsletter__wrapper'>
          <Input type='email' name='email' placeholder='Email address' />
          <div className='newsletter__wrapper--btn'>
            <Button type='submit' label='Submit' className='dark' />
          </div>
        </form>
      </div>
    </aside>
  );
};

export default Newsletter;
