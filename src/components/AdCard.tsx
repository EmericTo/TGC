import Image from 'next/image';
export type AdType = {
  id: number;
  link: string;
  imgUrl: string;
  title: string;
  price: number;
};

export type AdCardProps = AdType;

export function AdCard(props: AdCardProps): React.ReactNode {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={props.link}>
      <Image
        className="ad-card-image"
        src={props.imgUrl}
        alt="Description de l'image"
        width={200} 
        height={200} 
      />
        <div className="ad-card-text">
          <div className="ad-card-title">{props.title}</div>
          <div className="ad-card-price">{props.price} €</div>
        </div>
      </a>
    </div>
  );
}

