import './Categories.scss';

const Categories = () => {
  return (
    <aside className='categories'>
      <div className='categories__container'>
        <h2 className='categories__container--heading'>Categories</h2>
        <div className='categories__list'>
          <span className='categories__list--label'>Lifestyle</span>
          <span className='categories__list--total'>(05)</span>
        </div>
        <div className='categories__list'>
          <span className='categories__list--label'>Travel</span>
          <span className='categories__list--total'>(34)</span>
        </div>
        <div className='categories__list'>
          <span className='categories__list--label'>Fashion</span>
          <span className='categories__list--total'>(09)</span>
        </div>
        <div className='categories__list'>
          <span className='categories__list--label'>Music</span>
          <span className='categories__list--total'>(46)</span>
        </div>
        <div className='categories__list'>
          <span className='categories__list--label'>Branding</span>
          <span className='categories__list--total'>(16)</span>
        </div>
      </div>
    </aside>
  );
};

export default Categories;
