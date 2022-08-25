import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import colors from 'values/colors';


const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Carousel = () => {
  const cards = [
    '/img/carousel1.png',
    '/img/carousel2.png',
    '/img/carousel3.png',
  ];

  const bodys = [
    {
      title: "Halo, Perkenalkan kami \nJumpaDokter",
      body: "Panggil dokter dari rumah dan lebih mudah dengan JumpaDokter",
    },
    {
      title: "Berobat ke dokter tanpa \nantri lama-lama",
      body: "Setelah kamu panggil dokter tenangkan diri biarkan kami para dokter menghampiri",
    },
    {
      title: "Semoga \nlekas sembuh...",
      body: "Jangan lupa istirahat yang cukup, minum air putih yang banyak dan minum obat",
    },
  ];

  return (
    <Box
      display={{ base: 'none', lg: 'inline-block' }}
      w="full"
      color={colors.PRIMARY}
      overflow={"hidden"}
      height={"700px"}
    >
      <Slider {...settings}>
        {cards.map((url, index) => (
          <div key={index}>
            <Box position="relative" w="full" h="400px" mb="4">
              <Image
                src={url}
                sizes="40vw"
                objectFit="contain"
                alt=""
                layout="fill"
              />
            </Box>

            <Text fontSize="3xl" fontWeight="bold" lineHeight="42px">
              {bodys[index].title}
            </Text>
            <Text mb="8" fontSize="lg" fontWeight="light" color={colors.HITAM_PUDAR}>
              {bodys[index].body}
            </Text>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;