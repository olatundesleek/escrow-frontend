import PageBannerTitle from "./PageBannerTitle";
import Header from "./Header";


interface SectionalTitleProps {
    title: string;
    description: string
}
const SectionalTitle = ({title, description}:SectionalTitleProps) => {
    return (
        <div>
            <PageBannerTitle>{title}</PageBannerTitle>
            <Header>{description}</Header>
        </div>
    );
}

export default SectionalTitle;
