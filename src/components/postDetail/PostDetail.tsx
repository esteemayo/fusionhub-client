import millify from 'millify';

import './PostDetail.scss';

const PostDetail = () => {
  return (
    <section className='postDetail'>
      <div className='postDetail__container'>
        <div className='postDetail__wrapper'>
          <div className='postDetail__user'>
            <div className='postDetail__username'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                />
              </svg>
              <span>John doe</span>
            </div>
            <div className='postDetail__date'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <time dateTime={new Date().toDateString()}>19 hours ago</time>
            </div>
            <div className='postDetail__view'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
              <span>{millify(10000)} views</span>
            </div>
          </div>
          <div className='postDetail__actions'>
            <button type='button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z'
                />
              </svg>
              <span>10</span>
            </button>
            <button type='button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54'
                />
              </svg>
            </button>
            <button type='button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z'
                />
              </svg>
              <span>300</span>
            </button>
            <button type='button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
                />
              </svg>
            </button>
            <button type='button'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className='postDetail__box'>
        <h2 className='postDetail__heading'>
          Effective communication is at the heart of every successful
          professional.
        </h2>
        <p className='postDetail__desc'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ex modi
          soluta. Minus omnis vero voluptatibus non nam quidem a, cumque
          explicabo, sint nesciunt, laudantium fugiat expedita sapiente sed
          nostrum. Fugiat, incidunt ullam. Reprehenderit, aut possimus
          cupiditate incidunt quas enim asperiores. Doloribus ipsa voluptatum
          veniam voluptas natus incidunt consequatur blanditiis nisi facilis
          distinctio quos, facere eum dignissimos fuga animi magnam! Corrupti
          ducimus iure atque beatae! Architecto, quaerat consectetur obcaecati
          tempore qui dicta adipisci nostrum reprehenderit ab ullam perferendis
          blanditiis, esse debitis eos. Quibusdam commodi quidem cumque qui sunt
          expedita incidunt. Provident assumenda necessitatibus in excepturi
          cum, ab unde. Sed, doloribus sapiente ab eos blanditiis reiciendis
          aperiam praesentium a obcaecati reprehenderit, eum dignissimos id
          magni veritatis quis ea nam asperiores distinctio. Animi, tempora?
          Sapiente a fugiat at consequatur vero cumque repudiandae, eaque libero
          quis ratione neque? Optio eum ipsa voluptate, maxime recusandae omnis,
          nobis, voluptates debitis fugiat rerum veritatis? Iusto, ab.
        </p>
        <p className='postDetail__desc'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit
          maiores corrupti cum, ad in repellendus provident veritatis tempore?
          Numquam nulla molestiae inventore quisquam cum veniam natus repellat
          odit in ipsum. Saepe porro ducimus sapiente laborum recusandae
          mollitia obcaecati cumque qui consectetur vero similique ipsum, fuga
          debitis. Corrupti, ratione placeat, tempora ullam et qui facilis,
          facere corporis quo asperiores repellat provident. Doloribus, mollitia
          nemo ipsa laboriosam doloremque voluptas necessitatibus quidem
          consequuntur dolorum cupiditate fugiat autem recusandae ab iure ipsam
          id eius. Doloribus debitis corporis eveniet error possimus libero ab
          magni molestiae?
        </p>
        <p className='postDetail__desc'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          incidunt, saepe nihil esse deserunt inventore, sed sint alias error,
          quis tempora! Fuga quas repellat maxime animi exercitationem eum,
          beatae quae. Maxime ex esse sequi soluta alias saepe nostrum, minima
          exercitationem labore sed odit eaque laboriosam velit eligendi optio
          commodi impedit est ipsa culpa nobis recusandae id iste architecto?
          Nemo, error. Nemo quasi, deserunt minus ut inventore quia molestiae
          ipsam reiciendis accusantium soluta tenetur nihil similique illum
          laudantium totam sit minima corrupti iusto aliquid tempore, numquam
          ipsa necessitatibus. Ipsum, voluptatem asperiores. Praesentium
          obcaecati cum beatae explicabo perspiciatis doloremque nisi veritatis
          voluptatum numquam aperiam facere culpa, assumenda fugit dicta
          voluptatem unde, earum pariatur eum, tempore odit reprehenderit
          commodi. Expedita illum mollitia eos. Vero placeat ex, ducimus
          deleniti, qui nihil quos distinctio cupiditate ipsa doloremque esse
          quis similique perferendis obcaecati dignissimos eum temporibus cumque
          voluptate. Illo animi dolore tempore eligendi corporis maxime
          doloribus! Nisi impedit tempora, soluta facere quisquam at incidunt,
          pariatur quos laudantium deserunt totam repellat a quod ad inventore
          dolorum possimus. Ullam obcaecati ea perferendis corporis minima
          veritatis eligendi nemo nulla? Debitis earum cupiditate possimus,
          accusantium, laboriosam deserunt voluptas ipsum accusamus assumenda
          laudantium quia dolores ullam ad, animi laborum quidem aut
          necessitatibus quam obcaecati! Ullam odio hic iste facere ex
          doloribus!
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
