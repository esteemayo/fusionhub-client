import './DeleteAccount.scss';

const DeleteAccount = () => {
  return (
    <div className='delete-account'>
      <div className='delete-account__container'>
        <p className='delete-account__container--text'>
          De-activating your account will remove all of your information from
          our database. This cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default DeleteAccount;
