import './DeactivateAccount.scss';

const DeactivateAccount = () => {
  return (
    <section className='deactivateAccount'>
      <div className='deactivateAccount__container'>
        <h2 className='deactivateAccount__container--heading'>
          Deactivate account
        </h2>
        <div className='deactivateAccount__wrapper'>
          <p className='deactivateAccount__wrapper--text'>
            Deleting your account will remove all of your information from our
            database. This cannot be undone.
          </p>
          <button type='button' className='deactivateAccount__wrapper--btn'>
            Delete my Account
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeactivateAccount;
