import tealClimateLogo1 from "../../assets/teal-climate-logo-1.svg";
import tealClimateLogo2 from "../../assets/teal-climate-logo-2.svg";

const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-x-1 my-8 ">
      <img src={tealClimateLogo1} />
      <img src={tealClimateLogo2} />
    </div>
  );
};

export default Logo;
