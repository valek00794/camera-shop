
type StarsProps = {
  rating?: number;
  }

const stars = [1,2,3,4,5];

function Stars(props: StarsProps): JSX.Element {

  const getFullStar = (star: number) => props.rating && star <= props.rating ? '#icon-full-star' : '#icon-star';

  return (
    <>
      {
        stars.map((star) => (
          <svg key={star} width="17" height="16" aria-hidden="true">
            <use xlinkHref={getFullStar(star)}></use>
          </svg>
        ))
      }
    </>
  );
}

export default Stars;
