import Header from "./Header";
import Article from "./Article";

interface AboutusCardProps {
  video: string;
  title: string;
  description: string;
}

const AboutusCard = ({ video, title, description }: AboutusCardProps) => {
  return (
    <div className="lg:w-auto h-auto flex flex-col items-center gap-4 border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-50 border border-gray-200 shadow-inner">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
          aria-label={`${title} icon`}
        />
      </div>

      <Header textSize="text-lg font-semibold text-center text-secondary">
        {title}
      </Header>
      <Article>
        <p className="text-sm text-center text-gray-600">{description}</p>
      </Article>
    </div>
  );
};

export default AboutusCard;
