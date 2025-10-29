import MutedComments from '../../components/mutedComments/MutedComments';
import MutedUsers from '../../components/mutedUsers/MutedUsers';
import AccountHeading from '../../components/accountHeading/AccountHeading';
import MutedReplies from '../../components/mutedReplies/MutedReplies';

import SeoMeta from '../../components/SeoMeta';

import { mutedEntities } from '../../data';

import './Privacy.scss';

const Privacy = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Account Privacy Settings',
    description:
      'Manage your privacy preferences, muted users, comments, and replies all in one place.',
    url: 'https://yourapp.com/settings/privacy',
    publisher: {
      '@type': 'Organization',
      name: 'FinSmart',
      logo: 'https://yourapp.com/assets/logo.png',
    },
  };

  const { mutedUsers, mutedComments, mutedReplies } = mutedEntities;

  return (
    <section className='privacy'>
      <SeoMeta
        title='Account Privacy Settings | fusionHub'
        description='Manage your privacy preferences, muted users, comments, and replies all in one place. Take full control of your account visibility and communication settings.'
        url='https://fuzionhub.netlify.app/accounts/privacy'
        image='https://yourapp.com/assets/privacy-banner.png'
        schema={schema}
      />
      <div className='privacy__container'>
        <AccountHeading
          title='Account Privacy Settings'
          subtitle='Manage your account’s privacy and communication preferences to keep your experience secure and distraction-free'
          type='profile'
        />
      </div>
      <MutedUsers mutedUsers={mutedUsers} />
      <MutedComments mutedComments={mutedComments} />
      <MutedReplies mutedReplies={mutedReplies} />
    </section>
  );
};

export default Privacy;
