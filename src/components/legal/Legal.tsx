import './Legal.scss';

const Legal = () => {
  return (
    <section
      className='legal'
      aria-label='Legal information'
      aria-labelledby='legal-heading'
    >
      <h2 id='legal-heading' className='sr-only'>
        Legal Notice and Copyright Information
      </h2>
      <p className='legal__text' lang='en'>
        This website (www.fusionhub.com) is copyright protected by the laws of
        U.S.A and the rest of the World Countries represented on this website
        and by International Treaties. No part of this website
        (www.fusionhub.com) may be saved or stored, reproduced, used or
        transmitted in any form or by any electronic or mechanical means,
        including, but not limited to storage thereof by e-mail or any other
        means, and the use thereof on any other website and/or any other media
        form, without the written and express permission of Fusionhub.
      </p>
    </section>
  );
};

export default Legal;
