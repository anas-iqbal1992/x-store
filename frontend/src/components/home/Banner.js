import Carousel from 'react-bootstrap/Carousel';
const Banner = () => {
    const images = [
        process.env.PUBLIC_URL + '/images/banner/banner1.jpg',
        process.env.PUBLIC_URL + '/images/banner/banner2.jpg',
        process.env.PUBLIC_URL + '/images/banner/banner3.jpg'
    ];

    const BannerImages = images.map((img,idx) =>
        <Carousel.Item interval={2000} key={idx}>
            <img
                className="d-block w-100"
                src={img}
                alt="First slide"
            />
        </Carousel.Item>
    )

    return (
        <Carousel>
            {BannerImages}
        </Carousel>
    );
}
export default Banner;