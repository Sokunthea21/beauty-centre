import Beauty_Center from "./Beauty_Center.png";
import Logo from "./Logo.png";
import Slider1 from "./Slider-1.png";
import Slider2 from "./Slider-2.png";
import Slider3 from "./Slider-3.png";
import cart from "./cart.png";
import wishlist from "./wishlist.png";
import account from "./account.png";
import Call from "./Call.svg";
import Location from "./Location.svg";
import Message from "./Message.svg";
import facebook from "./facebook.svg";
import instagram from "./instagram.svg";
import Tiktok from "./Tiktok.svg";
import telegram from "./telegram.svg";
import bloomleft from "./bloom-left.svg";
import bloomright from "./bloom-right.svg";
import Trending_1 from "./Trending_1.png";
import Trending_2 from "./Trending_2.png";
import Trending_3 from "./Trending_3.png";
import Spotlight_1 from "./Spotlght_1.png";
import Spotlight_2 from "./Spotlght_2.png";
import star_icon from "./star_icon.svg";
import heart_icon from "./heart_icon.svg";
import arrows_left from "./arrows_left.svg";
import arrows_right from "./arrows_right.svg";
import star_dull_icon from "./star_dull_icon.svg";
import img_login from "./img-login.png";

//Image Categories
import Sunscreen from "./Categories_Sunscreen.png";
import OilCleansers from "./Categories_Oil Cleansers.png";
import Toners from "./Categories_Toners.png";
import Serum from "./Categories_Serum.png";
import WaterCleansers from "./Categories_WaterCleansers.png";
import Lipstick from "./Categories_Lipstick.png";
import Lotion from "./Categories_Lotion.png";

//Image Brands
import Anua from "./Brand_Anua.png";
import Cosrx from "./Brand_Cosrx.png";
import Innisfree from "./Brand_Innisfree.png";
import Axisy from "./Brand_Axis-y.png";
import BeautyOfJoseon from "./Brand_Beauty_of_joseon.png";
import Drceuracle from "./Brand_Dr.ceuracle.png";
import Goodal from "./Brand_Goodal.png";
import Iunik from "./Brand_Iunik.png";
import Skin1004 from "./Brand_Skin1004.png";
import MaryandMay from "./Brand_Mary&May.png";

//Image Products
import SerumJAPANCherry from "./SerumJAPANCherry.png";
import SileFeelCotton from "./Sile feel cotton Puff.png";
import DailySunscreen from "./Daily_UV_Sunscreen.png";
import jejucherrycream from "./Jeju_cherry_cream.png";
import poreclaymask from "./Pore_clay_mask.png";

export const assets = {
  Beauty_Center,
  Logo,
  cart,
  wishlist,
  account,
  Slider1,
  Slider2,
  Slider3,
  Call,
  Location,
  Message,
  facebook,
  instagram,
  telegram,
  Tiktok,
  bloomleft,
  bloomright,
  Trending_1,
  Trending_2,
  Trending_3,
  Spotlight_1,
  Spotlight_2,
  star_icon,
  heart_icon,
  star_dull_icon,
  arrows_left,
  arrows_right,
  SerumJAPANCherry,
  SileFeelCotton,
  DailySunscreen,
  jejucherrycream,
  poreclaymask,
  img_login,
};

export const categories = {
  Sunscreen,
  OilCleansers,
  Toners,
  Serum,
  WaterCleansers,
  Lipstick,
  Lotion,
};
export const categoryList = [
  {
    title: "Sunscreen",
    Image: Sunscreen,
  },
  {
    title: "Oil Cleansers",
    Image: OilCleansers,
  },
  {
    title: "Toners",
    Image: Toners,
  },
  {
    title: "Serum",
    Image: Serum,
  },
  {
    title: "Water Cleansers",
    Image: WaterCleansers,
  },
  {
    title: "Lipstick",
    Image: Lipstick,
  },
  {
    title: "Lotion",
    Image: Lotion,
  },
];

export const brandList = [
  {
    title: "Anua",
    Image: Anua,
  },
  {
    title: "Beauty of Joseon",
    Image: BeautyOfJoseon,
  },
  {
    title: "Mary & May",
    Image: MaryandMay,
  },
  {
    title: "Skin1004",
    Image: Skin1004,
  },
  {
    title: "Innisfree",
    Image: Innisfree,
  },
  {
    title: "Cosrx",
    Image: Cosrx,
  },
  {
    title: "Iunik",
    Image: Iunik,
  },
  {
    title: "Goodal",
    Image: Goodal,
  },
  {
    title: "Axis-y",
    Image: Axisy,
  },

  {
    title: "Dr.Ceuracle",
    Image: Drceuracle,
  },
];
export const productsDummyData = [
{
    id: "1",
    title: "COSRX Aloe Soothing Suncream SPF50+/PA+++",
    vendor: "COSRX",
    price: 7.5,
    inStock: true,
    slug: "cosrx-aloe-suncream",
    rating: 4.5,
    reviewsCount: 120,
    description:
      "Experience ultimate sun protection with the Aloe Soothing Sun Cream SPF50+/PA+++...",
    images: [
      "/products/image1.jpg",
      "/products/image2.jpg",
      "/products/image3.jpg",
    ],
    usage:
      "Apply a generous amount as the last step of skincare before sun exposure.",
    skinType: "All skin types",
    ingredients:
      "Aloe Barbadensis Leaf Extract, Ethylhexyl Methoxycinnamate, etc.",
  },
];
export const userDummyData = {
  _id: 'user123',
  name: 'Jane Doe',
  email: 'jane@example.com',
  role: 'buyer', // or 'seller'
  avatar: '/images/user-avatar.png',
  address: {
    street: '123 Main Street',
    city: 'Phnom Penh',
    country: 'Cambodia',
    zip: '12000',
  },
  phone: '+85512345678',
  createdAt: '2024-01-01T00:00:00.000Z',
};
