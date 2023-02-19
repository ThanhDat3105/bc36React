import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  width: "100%",
  height: "600px",
  objectFit: "cover",
};

export default function CarouselMovies() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <Carousel afterChange={onChange} dotPosition="right" autoplay={true}>
      <div>
        <div>
          <img
            style={contentStyle}
            src="https://i.ytimg.com/vi/FoZbdtQMTvM/maxresdefault.jpg"
          />
        </div>
      </div>

      <div>
        <div>
          <img
            style={contentStyle}
            src="https://media.doisongphapluat.com/thumb_x1280x857/media/dang-nhat-duy/2022/12/03/poster-phim-tran-thanh-nha-ba-nu-dspl-31220222.jpg"
          />
        </div>
      </div>
    </Carousel>
  );
}
