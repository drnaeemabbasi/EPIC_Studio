import React, { useState, useEffect } from "react";
import axios from "axios";
const UsersForm = ({ selectedForm, setSelectedForm }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    fecthContinent();
  }, [selectedForm]);

  useEffect(() => {
    fetchCountry();
  }, [selectedContinent]);

  useEffect(() => {
    fetchregion();
  }, [selectedCountry]);

  const fecthContinent = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Profiles/continent`
      );
      const jsonData = res.data; // Here we get the data directly
      setContinents(jsonData);
    } catch (error) {
      console.log(error);
    } finally {
      console.info("succesfully fecth continents");
    }
  };

  const fetchCountry = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Profiles/country/${selectedContinent}`
      );
      setCountries(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.info("succesfully fecth countries");
    }
  };

  const fetchregion = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/Profiles/region/${selectedContinent}/${selectedCountry}`
      );
      setRegions(res.data);
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   console.info("succesfully fecth region");
    // }
  };
  return (
    <>
      <div className="flex-1 rounded-lg bg-white shadow-[0px_4px_60px_rgba(0,_0,_0,_0.02)] flex flex-col items-end justify-start py-[18px] pr-[18px] pl-6 box-border gap-[216px] min-w-[585px] max-w-full text-left text-5xl text-dark font-poppins mq450:gap-[216px] mq800:min-w-full mq1125:gap-[216px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[32px] max-w-full mq450:gap-[32px]">
          <h1 className="m-0 h-9 relative text-inherit font-semibold font-inherit inline-block z-[1] mq450:text-lgi">
            Insert EEIO data here
          </h1>
          <div className="w-full grid grid-cols-2 text-base gap-5">
            {/* Scope Category */}
            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Select continent
              </h3>
              <select
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                value={selectedContinent}
                onChange={(e) => setSelectedContinent(e.target.value)}
              >
                <option value="">Select Continent</option>
                {continents.map((item, index) => (
                  <option key={index} value={item.continent}>
                    {item.continent}
                  </option>
                ))}
              </select>
            </div>

            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Select countries
              </h3>
              <select
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {countries.map((item, index) => (
                  <option key={index} value={item.countries}>
                    {item.countries}
                  </option>
                ))}
              </select>
            </div>

            <div className="self-stretch flex flex-col items-start justify-start gap-[12px]">
              <h3 className="m-0 relative text-inherit capitalize font-medium font-inherit z-[1]">
                Select region
              </h3>
              <select
                className="w-full bg-not-white self-stretch h-10 rounded-lg overflow-hidden shrink-0 flex flex-row items-center justify-start pt-2.5 px-3 pb-[9px] box-border font-poppins text-sm  min-w-[248px] z-[1] border-[1px] border-solid border-slate-600"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="">Select Region</option>
                {regions.map((item, index) => (
                  <option key={index} value={item.region}>
                    {item.region}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UsersForm;
