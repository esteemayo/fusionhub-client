import './DeleteAccount.scss';

const DeleteAccount = () => {
  return (
    <div className='deleteAccount'>
      <div className='deleteAccount__container'>
        <p className='deleteAccount__container--text'>
          De-activating your account will remove all of your information from
          our database. This cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default DeleteAccount;
