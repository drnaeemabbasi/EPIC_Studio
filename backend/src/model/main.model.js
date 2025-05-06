// headers.js
export const headers = {
  EPICRUN: {
    // index: 0, // Starting index for EPICRUN
    headers: [["ASTN", "ISIT", "IWP1", "IWP5", "IWND", "INPS", "IOPS", "IWTH"]],
    descriptions: {
      ASTN: "Run name or run number. Since ASTN will be the name used for the output files generated for each run, ASTN must be a unique ID for each run so that the output files are not written over.",
      ISIT: "Site ID number. Must be one of the sites listed in the SITECOM.DAT file",
      IWP1: "Monthly weather station ID number. Must be one of the stations included in the WPM1US.DAT file. If set to zero, EPIC will use the latitude and longitude from WPM1USEL.DAT to choose the closest weather station to the simulated area (latitude and longitude from sitefile.SIT)",
      IWP5: "Alternate catalog of monthly weather stations for use with the southern oscillation coefficients in WIDX0810.DAT. Set IWP5 to zero for not using this feature",
      IWND: "Wind station ID number. Must be one of the stations included in the WINDUSEL.DAT file. If set to zero, EPIC will use the latitude and longitude from WNDUSEL.DAT to choose the closest weather station to the simulated area (latitude and longitude from sitefile.SIT)",
      INPS: "Soil ID number. Must be one of the soils included in the SOILCOM.DAT file",
      IOPS: "Operation schedule ID number. Must be one of the operation schedules included in OPSCCOM.DAT file",
      IWTH: "Daily weather station ID number. Must be one of the stations included in the WDLSTCOM.DAT file. If set to zero, EPIC will use the latitude and longitude from WDLSTCOM.DAT to choose the closest weather station to the simulated area (latitude and longitude from sitefile.SIT)",
    },
    forLoopEndpoint: 1, // Optional limit for the for loop, 0 means no limit
  },
  EPICCONT: {
    headers: [
      [
        "NBYR",
        "IYR0",
        "IMO0",
        "SOLS",
        "SOLO",
        "ISW",
        "IOPS",
        "IGMX",
        "MASP",
        "LBP",
        "IRRS",
        "NVCN",
        "INFL0",
        "LBP2",
        "PHU",
        "SRG",
        "COIR",
        "COL",
        "FULP",
        "NSTP",
      ],
      [
        "IGMX",
        "IERT",
        "ICG",
        "LMS",
        "ICF",
        "ISW",
        "IRW",
        "ICO2",
        "NTV",
        "ICOR",
        "IDN",
        "NUPC",
        "IOX",
        "IDI0",
        "ISAT",
        "IAZM",
        "IPAT",
        "IEVI",
        "IPRK",
        "ICP",
        "ISLT",
      ],
      [
        "RFN0",
        "CO20",
        "CNO30",
        "CSLT",
        "PSTX",
        "YWI",
        "BTA",
        "EXPK",
        "FL",
        "FW",
      ],
      [
        "ANG0",
        "STD0",
        "UXP",
        "DIAM",
        "ACW",
        "BIR",
        "EFI",
        "VIMX",
        "ARMN",
        "ARMX",
      ],
      [
        "BFT0",
        "FNP",
        "FMX",
        "DRT",
        "FDS0",
        "PEC0",
        "VLGN",
        "COWW",
        "DDLG",
        "SOLQ",
      ],
      ["GZLM", "FFED", "DZ", "DRV", "RST0", "STF0"],
      ["COIR", "COL", "FULP", "WAGE", "CSTZ1", "CSTZ2"],
    ],
    descriptions: {
      NBYR: "Number of Years for Simulation Duration: The number of years can be any number from 1 to hundreds of years; however, 20 to 30 years may be adequate to estimate frequency distributions used to solve many problems.(Range: 1 to 999)",
      IYR0: "Beginning Year of Simulation: If the starting year is before the first year of the historical weather data, ALLweather will be generated. Once the model starts generating weather, it continues until the end of the simulation. For example, if the historical weather data begins on Jan. 1, 1960, and the simulation begins on Jan. 1, 1956, then all the weather will be generated starting on Jan. 1, 1956, to the end of the simulation period.If the simulation period starts on a year included in the historical weather file, but the weather data does not extend for the complete simulation period, weather will be generated from the point the historical weather data ends to the end of the simulation period. For example, if the historical weather data begins on Jan. 1, 1960, and extends to Dec. 31, 2000, and the simulation period is from Jan. 1, 1996, to Dec. 31, 2005, then generated weather will be used beginning Jan. 1, 2001, and continue to the end of the simulation period (Dec. 31, 2005).(Range: 1880 to 9999)",
      IMO0: "Beginning Month of Simulation: Most long-term simulations start on January 1. Starting after January 1 may be convenient for simulating systems where data are only recorded during the growing season.(Range: 1 to 12)",
      IDA0: "Beginning Day of Simulation: Most long-term simulations start on January 1. Starting after January 1 may be convenient for simulating systems where data are only recorded during the growing season.(Range: 1 to 31)",
      IPD: "Print Code for Type of Output: The print code (IPD) allows the user to print daily, monthly, or annual output, with or without printing tables describing soil conditions printed in the General Output File (OUT). Annual printouts minimize output volume and may be useful for some long-term simulations. Monthly outputs enable the user to evaluate model performance within the growing season or to examine seasonality of runoff, erosion, and other processes more closely than with annual printouts. Monthly outputs are normally obtained in short-term (1-10 year) simulations and are particularly useful in model testing. Daily outputs are also useful for model testing and for comparison with detailed experimental data. To obtain the desired type of output, IPD can be set to values from 0 to 9, as described below. Allowed values: N0 for annual watershed output , N1 for annual printout , N2 for annual with soil table , N3 for monthly , N4 for monthly with soil table , N5 for monthly with soil table at harvest , N6 for n day interval , N7 for soil table only n day interval , N8 for n day interval, rainfall days only , N9 for n day interval during growing season , For IPD 0 to 5, N = 0 prints management operation, N = 1 prevent printing management operation, For IPD 6 to 9, N = days interval to prints output in the OUT file. Management operations always printed",
      NGN: "Input Code for Weather Variables: EPIC can read one or more daily weather variables from an external file specified by the user. The weather input code, NGN, specifies which variables will be read; all others will be generated by APEX’s stochastic weather data generator.If NGN is not set to zero, precipitation is read from the external file designated in the EPICRUN.DAT file. In addition to precipitation, any combination of the other daily weather variables can be read. The integers 1 through 5 are used to identify specific weather inputs that must be read from the selected daily weather file, as follows: 1 Precipitation , 2 Maximum and minimum temperatures , 3 Solar radiation , 4 Average wind speed , 5 Average relative humidity , If any daily weather variables are input, precipitation must also be input. Thus, it is not necessary to specify ID=1 unless rain is the only input variable , Example values of NGN are given below. NGN=0: Generate all weather variables (spatially distributed). NGN=1: Read precipitation; generate other variables. NGN=2: Read maximum and minimum temperatures and precipitation; generate other variables. NGN=3: Read solar radiation and precipitation; generate other variables. NGN=4: Read wind speed and precipitation; generate other variables. NGN=5: Read relative humidity and precipitation; generate other variables. NGN=23: Read maximum and minimum temperatures, solar radiation, and precipitation; generate wind speed and relative humidity. NGN=2345: Read all weather variables. NOTE: If weather data is not available for selected parameters, weather data is automatically generated. The model will use all available data for the selected parameters and generate when data for those select parameters is missing",
      IGN: "Number of Times Random Number Generator Cycles Before Simulations Starts: The random number generator is used to generate stochastically a series of daily weather data for input into other components of APEX. By changing IGN, the user can alter the sequence of generated weather data without changing its long-term statistical properties. Default setting: 0 (Range: 0 to 100) In some situations, a user may wish to vary the weather sequence between runs. This is done by setting IGN to a different number each time the model is run. Setting IGN to a value greater than zero will activate a random number generator, which will replace the default set of random numbers with a new set. The value to which IGN is set determines the number of times the random number generator cycles before the simulation begins. The seeds produced by the random number generator are then used by the weather generator instead of the default values. Historical weather data read into the model is not affected by this variable. However, if the historical weather data contains missing data, the weather generator will be used to generate data to replace the missing data. The generated data used to replace the missing data is affected by this variable.If IGN and the monthly weather statistics are not changed, successive simulations will have identical weather sequences",
      IGS0: "Day Weather Generator Stops Generating Daily Weather: This variable is used for real time simulations. When IGS0 is a negative integer, it indicates the total number of whole and partial years of input weather data. Normally, only a partial year (January 1 to planting date, for example) of measured weather data are used, thus IGS0 = -1. To estimate 20 alternative yield possibilities using input weather data for only part of a year, set NBYR to 20 and IGS0 to -1.(Range: -N to 366) 0 Normal operation of weather model N Duplicate weather in a given year up to date n -N Rewinds weather after n years 366 Gives a rough estimate of the average yield with only two years of simulation. IGS0 can also be used to simulate yield where the same weather data set is used many times. For example, if IGS0 is set to -3, this tells the model to reuse the three years of input weather data then rewind and use it again multiple times until NBYR is met",
      LPYR: "Leap Year Considered: Allowed values: 0 Leap year is considered , 1 Leap year is ignored. Tells the model to expect only 365 days of input weather data and generate only 365 days of weather ignoring February 29th. ATTENTION: In this case, February 29th must be deleted from the weather input file",
      IET: "Potential Evapotranspiration Equation Approach: This field enables the user to choose which equation will be used to estimate the potential evapotranspiration (PET).Allowed values: 0 *(default) Hargreaves , 1 *Penman-Monteith (usually for windy conditions). Adds a logarithmic eddy diffusion function and canopy resistance to the Penman equations. This option works best when measure data for all the weather variables are available , 2 *Penman. Adds relative humidity, wind speed, and elevation of wind measurements to the required weather inputs. This option works best when measure data for all the weather variables are available , 3 Priestley-Taylor. Requires radiation, as well as temperature as an input , 4 Hargreaves. Has two parameters which can be adjusted to calibrate the model for factors such as proximity to a major water body , 5 Baier-Robertson. Developed in cold environment, * Requires the entry of elevation (ELEV), monthly mean wind velocities(WVL). These equations also need relative humidity; however, if relative humidity is blank, EPIC will estimate relative humidity. Dew point can also be used",
      ISCN: "Stochastic CN Estimator Code: The final step in EPIC’s estimation of runoff volume is an attempt to account for uncertainty. The runoff retention parameter or curve number is based on land use, management, hydrologic soil group, land slope, soil water content and distribution. It is also adjusted for frozen soil. However, many natural processes and management factors that can affect runoff are not accounted for in the model. EPIC enables the user to use either a deterministic or a stochastic method of estimating CN. If the deterministic method is chosen, the curve number is adjusted daily for soil water content (and frozen soil). If the stochastic method is chosen, the deterministic value is varied stochastically on a daily basis using a triangular distribution. The extremes of the distribution are +/- 5 curve numbers from the mean.Allowed values, 0 Stochastic curve number estimator (default), 1 Rigid curve number estimator (Deterministic)",
      ITYP: "Peak rate estimate code: Types I and IA represent the Pacific maritime climate with wet winters and dry summers. Type III represents Gulf of Mexico and Atlantic coastal areas where tropical storms bring large 24-hour rainfall amounts. Type II represents the rest of the country. For more precise distribution boundaries in a state having more than one type, contact the SCS State Conservation Engineer (SCS 1986). Allowed values: 0 For modified rational EQ peak rate estimate, >0 For SCS TR55 peak rate estimate, 1 For type I rainfall pattern, 2 For type IA rainfall pattern, 3 For type II rainfall pattern, 4 For type III rainfall pattern",
      ISTA: "Static soil profile: This code is used to allow EPIC to estimate soil erosion but not change the soil profile other than readily available nutrients and water. With this option set at 1, the subroutines for the estimation of soil erosion are not called during the simulation and the soil characteristics related to the organic carbon and nitrogen content are set to the initial values at the end of each year. In this way, it is possible to simulate multiple years of weather on the same soil and estimate erosion under alternative weathers. Allowed values: 0 For normal erosion soil profile, 1 For static soil profile",
      IHUS: "Automatic heat unit scheduling: Based on potential heat units (PHU) In the first year of the run, all operations are assigned a heat unit fraction based on the total number of heat units input at planting and dates assigned to each operation. Calculation of heat units is based on monthly weather statistics. In the following years all operations will occur based on the heat unit schedule assigned to them. This can be used to help adjust operations to the weather (temperatures) from year to year. Operations occurring from planting to harvest are based on heat units set at planting. Operations occurring before planting are based on total annual heat units, which are calculated by the model. Allowed values: 0 Normal operation, 1 Automatic heat unit schedule (Number of growing degree units needed for crop to reach maturity (PHU) must be input at planting)",
      IRRS: "Simulation of root respiration:  Activates the simulation of root respiration in the denitrification subroutine NDNITCI. This option works only with the Cesar Izaurralde’s denitrification method (IDN = 3 or IDN = 4). Allowed values: 0 Root respiration calculated in NDNITCI, 1 Root respiration not considered in NDINITCI",
      NVCN: "Non-varying CN-CN2 used: Allowed values: 0 Variable daily CN nonlinear CN/SW with depth soil water weighting (Use Parm 81 to adjust), 1 Variable daily CN nonlinear CN/SW without depth weighting, 2 Variable daily CN linear CN/SW no depth weighting, 3 Non-varying CN - CN2 used for all storms, 4 Variable daily CN SMI (soil moisture index)",
      INFL0:
        "Runoff (Q) estimation methodology: Allowed values: 0 CN estimate of Q, 1 Green & Ampt (G&A) estimate of Q, Rainfall Exponential Distribution, Peak Rainfall Rate simulated, 2 G&A estimate of Q, Rainfall Exponential Distribution, Peak Rainfall Input, 3 G&A estimate of Q, Rainfall uniformly distributed, Peak RF Input",
      MASP: "Pesticide in output report: Allowed values: -1 For mass only no pesticide in .OUT file, 0 For mass only, pesticides in .OUT file, 1 For pesticide and nutrient output in mass and concentration",
      LBP: "Soluble phosphorus runoff estimate equation: Allowed values: 0 For soluble phosphorus runoff estimate using GLEAMS pesticide equation, 1 For modified nonlinear approach",
      NSTP: "Real time day of year (Columns 77-80) Day of year selected to be the stopping point up until which weather, crop growth, etc. are known. The remainder of the year is projected.(Range: 0 to 365)",
      IGMX: "Number of times generator seeds are initialized for a site (Range: 1 to 100).",
      IERT: "Enrichment Ratio Method. Sets the method to simulate organic material lost in runoff. Allowed values: 0 for EPIC enrichment ratio method, 1 for GLEAMS enrichment ratio method.",
      ICG: "Crop growth biomass conversion method. Allowed values: 0 for traditional EPIC radiation to biomass conversion, 1 for new experimental water-use to biomass conversion. NOTE: If the water-use to biomass approach is selected, the value for variable WUB in EPIC in the plant list file (CROPCOM.DAT) must be provided.",
      LMS: "Code for liming operation. Enables simulation of agricultural limestone application to increase soil pH and/or reduce aluminum saturation. Allowed values: 0 for automatic lime application as needed to prevent soil acidification, 1 for no lime applied.",
      ICF: "C factor selector for erosion equation. Allowed values: 0 to use RUSLE C factor for all erosion equations, 1 to use EPIC C factor for all erosion equations except RUSLE.",
      ISW: "Field capacity and wilting point estimation method: ISW allows the user to select the method used to provide values for the soil water content at field capacity (FC) and wilting point (WP). Allowed values: 0 Dynamic FC and WP estimated with Rawls method. 1 Dynamic FC and WP estimated with Baumer method. 2 Dynamic FC and WP estimated with Rawls method starting with input data. FC and WP data must be provided in the soil file. 3 Dynamic FC and WP estimated with Baumer method starting with input data. FC and WP data must be provided in the soil file. 4 Static FC and WP estimated with Rawls method. FC and WP are estimated and kept constant for the entire simulation. 5 Static FC and WP estimated with Baumer method. FC and WP are estimated and kept constant for the entire simulation. 6 Static input FC and WP. Data provided in the soil files are kept constant for the entire simulation. 7 Dynamic FC and WP estimated with the nearest neighbor method. The input file SOIL35K.DAT must be provided. 8 Static FC and WP estimated with the nearest neighbor method. FC and WP are estimated and kept constant for the entire simulation. The input file SOIL35K.DAT must be provided. 9 Dynamic FC and WP estimated with the Behrman-Norfleet-Williams (BNW) method (Behrman, Norfleet, & Williams, 2016). 10 Static FC and WP estimated with the Behrman-Norfleet-Williams (BNW) method. FC and WP are estimated and kept constant for the entire simulation (Behrman et al., 2016).",
      IRW: "Daily weather data usage option When set to zero, the model uses the daily weather input data as usual. If set to one, the model will use the weather station set in the first run for all the subsequent runs. Moreover, when going from one run to the next one, the weather data will be read continuously. For example, if for run 1 the user selects 2 years of simulation starting in 2001, the model will use weather data of the appropriate weather station (let’s call it station A). Data from 2001 for the first year and data from 2002 for the second year of simulation. If the subsequent run simulates a two-year period, data from station A will be used for this simulation and data from 2003 will be used for the first year of simulation and from 2004 for the second year of simulation.Allowed values: 0 For normal runs with daily weather input, 1 For continuous daily weather from run to run (no rewind)",
      ICO2: "Atmospheric CO2 concentration: ICO2 allows to set the dynamic of the atmospheric CO2 concentration during the simulation. Allowed values: 0 For constant atmospheric CO2 concentration. CO2 concentration must be provided with variable CO20 or variable CO2X. 1 For dynamic atmospheric CO2 concentration. The initial CO2 concentration is calculated by EPIC and is increased linearly during the simulation. 2 For inputting the atmospheric CO2 concentration in the daily weather file. See the daily weather file section for more details.",
      NTV: "Nitrogen volatilization method: NTV allows to select the method used to simulate nitrogen volatilization. Allowed values: 0 Original EPIC nitrogen volatilization equations. 1 Revised nitrogen volatilization equations by C. Izaurralde.",
      ICOR: "Southern oscillation correction: If greater than zero, it sets the day of the year when the weather correction to simulate input monthly average values stops. Works only if multi-run option is activated. When activated, the values for temperature and precipitation in the WP1 file are corrected using the observed daily weather data used during the simulation. (Range: 0 – 365) 0 Normal run – no southern oscillation. >0 Day of the year when southern oscillation correction to simulate input monthly means stops.",
      IDN: "Denitrification method code: Selects the approach used to simulate the denitrification process. Allowed values: 1 Original EPIC denitrification approach. 2 Armen Kemanian’s denitrification approach. 3 Cesar Izaurralde’s denitrification approach (original DW) (R. C. Izaurralde et al., 2017). 4 Cesar Izaurralde’s denitrification approach (new DW) (R. C. Izaurralde et al., 2017).",
      NUPC: "Nitrogen and Phosphorus plant uptake concentration code: Selects the approach used to estimate the optimal N and P plant concentration. Allowed values: 0 Smith curve. 1 S-curve.",
      IOX: "Oxygen – depth function code: Selects the method used to estimate the oxygen concentration in the soil. Allowed values: 0 For original EPIC oxygen/depth function. 1 For Armen Kemanian’s carbon/clay function. 2 For new oxygen ratio method.",
      IDI0: "Data directory: Selects from where to read the input data. Allowed values: 0 For reading data from the working directory. 1 For reading data from weather directory. 2 For reading data from working directory plus 3 other directories.",
      ISAT: "Saturated conductivity code: ISAT allows the user to select if the soil saturated conductivity is provided in the soil file or if it must be estimated by the model. Allowed values: 0 For reading saturated conductivity from the soil profile data. 1 For computing saturated conductivity with Rawls method.",
      IAZM: "Latitude source code: Allowed values: 0 For using input latitude for the field. 1 For computing equivalent latitude based on azimuth orientation of land slope.",
      IPAT: "Auto phosphorus fertilization code: Turn on or off the automatic application of P. Allowed values: 0 Turn off auto-phosphorus fertilization. 1 Turns auto-phosphorus fertilization on.",
      IEVI: "Photosynthetic Active Radiation (PAR) estimation approach: IEVI is used to select how the PAR is estimated during the simulation. Allowed values: 0 PAR driven by crop LAI development. 1 PAR driven by EVI from remote sensing. If IEVI is set equal to one, vegetation index (EVI) obtained from remote sensing must be input in the daily output file as eighth variable.",
      IPRK: "Soil water percolation method: IPRK allows the user to select the method to estimate the soil water percolation during the simulation. Allowed values: 0 For original EPIC approach. 1 For Variable Saturation Hydraulic Conductivity (VSHC) method (Doro et al., 2018).",
      ICP: "Carbon/Nitrogen Mineralization Method: Selects the method used to simulate the soil organic carbon and nitrogen dynamics. Allowed values: 0 For the Phoenix approach (McGill, Hunt, Woodmansee, & Reuss, 1981). 1 For the Century approach (R. Izaurralde, Williams, McGill, Rosenberg, & Jakas, 2006).",
      ISLT: "Soil temperature simulation method: Selects the approach used to simulate the soil temperature. For more information see (Doro et al., 2021). Allowed values: 0 For original EPIC cosine function (SOLT subroutine). 1 For enhanced cosine function (subroutine SOLT_eCOS). 2 For temperature transfer approach (subroutine SOLT_TT).",
      RFN0: "Average concentration of nitrogen in rainfall (ppm): The average concentration of N in rainfall may vary slightly for different locations. However, since the rainfall N contribution is a relatively small component of the N cycle, a value of 0.8 ppm or mg N/liter is generally satisfactory. If site-specific information is available, the user is free to set the value appropriately. (Range: 0.50 to 1.50)",
      CO20: "Carbon dioxide concentration in atmosphere (ppm): The amount of carbon dioxide in the atmosphere (ppm) used to begin the simulation. See variable ICO2 for atmospheric CO2 concentration options. (Range: 0 to 1000)",
      CNO30:
        "Concentration of NO3-N in irrigation water (ppm): The amount of mineral nitrogen in irrigation water. (Range: 0 to 1000)",
      CSLT: "Salt concentration in irrigation water (ppm): The amount of salt in irrigation water. For reference, the irrigation water is classified as low salinity (0-456 ppm), moderately salty (456-1425 ppm), salty (1425-2850 ppm), and very salty (>2850 ppm). (Range: 0 – ∞)",
      PSTX: "Pest damage scaling factor: The factor scales the growth of pests (insects and diseases only) in terms of population growth. It ranges from 0 (no pest growth; pest damage function is shut off) to 10 (maximum pest growth). Under default conditions this parameter is set to 1.00 which produces only minimal pest growth and does not affect yield. This parameter works in conjunction with PARM(9), PARM(10), S-curve parameter 9 in the EPIC parameter file (PARM1102.DAT), and variable PST in the EPIC plant list file (CROPCOM.DAT). Pest damage function can be regulated from very mild (0.05-0.10) to very severe (1.00-10.00). (Range: 0 to 10)",
      YWI: "Number years of maximum monthly 0.5-hour rainfall available: Can be obtained from the U.S. Department of Commerce (0 if WI is not imputed). Default setting: 10 (Range: 0 to 20)",
      BTA: "Coefficient governing wet-dry probabilities given days of rain: Used to estimate wet-dry rainfall probabilities if information is only available for the average monthly number of wet days. Generally, the number of wet days is much more readily available than the wet-dry rainfall probabilities. A value of 0.75 for BTA usually gives satisfactory estimates of the wet-dry probabilities. May be left zero if daily rainfall is inputted. May be left zero if rainfall is generated and wet-dry probabilities are input. Default setting: 0.75 (Range: 0 to 1)",
      EXPK: "Parameter used to modify exponential rainfall amount distribution: The modified exponential distribution is used to generate rainfall amounts if the standard deviation and skew coefficient are not available. An EXPK value of 1.3 gives satisfactory results in many locations. May be left 0.0 if unknown or if standard deviation of rainfall and skew coefficient for daily precipitation are input. Default setting: 1.3 (Range: 0 to 2)",
      FL: "Field length (if wind erosion is to be considered) in kilometers: If the normal wind erosion calculation is to be utilized (Wind Erosion Adjustment Factor (ACW) = 1), field dimensions and orientation must be specified. This variable refers to the length of the field that is exposed to the wind. Without trees, FL = length of the field. With trees, FL < length of the field. If wind erosion is simulated for specific sites, FL, FW, and ANG can be measured easily. However, hypothetical sites are often used in long-term simulations associated with large-scale decision making. In such cases, values of FL, FW, and ANG should be chosen to represent typical field configurations of the area. Efforts to match field dimensions and drainage area are not necessary. The field dimensions are used only to estimate wind erosion, with the exception that FL is used to estimate water erosion from furrow irrigation. Thus, the simulation site may be a small area (1 ha) in a field of 1.0 by 0.5 km. It should be noted that the change in simulated wind erosion is not large for any FL > 0.3 km. Therefore, estimations of FL and FW are not usually critical for fields with areas greater than about 10 ha. When fields larger than 10 ha are strip cropped, however, the estimation of FW becomes more important. To evaluate the effect of strip cropping, FW is estimated as the average width of the strips. If FL is set to zero, a value of 0.632 is assigned by default. (Range: 0.001 to ∞)",
      FW: "Field width (if wind erosion is to be considered) in kilometers: See variable FL for further information. If FW is set to zero, a value of 0.316 is assigned by default. (Range: 0.001 to ∞)",
      ANG0: "Clockwise angle of field length from north (deg): It is used only if wind erosion is simulated. If ANG is known, enter the value in degrees. It can be left at zero if the simulation of wind erosion is not needed. (Range: 0 to 360)",
      STD0: "Standing dead crop residue (Mg ha-1): Standing dead crop residue present at the beginning of the simulation. STD0 can be left at zero if unknown; however, year one will not have standing dead residue prior to crop growth. Crop residue will be present only after the first crop cycle. (Range: 0 to 1000)",
      UXP: "Power parameter of modified exponential distribution of wind speed (if wind erosion is to be considered): The power parameter of the modified exponential wind speed distribution ranges from about 0.3 to about 0.7. A value of 0.50 usually gives satisfactory estimates of daily wind speed. UXP may be left at 0.0 if unknown, and it will be set to the default value of 0.50. (Range: 0 to 1)",
      DIAM: "Soil particle diameter (micron μm): It is used only if wind erosion is simulated. Normally this value ranges from 300 to 500 µm (sands). DIAM may be left at 0.0 if unknown, and it will be set to its default value of 500.0. (Range: 100 to 500)",
      ACW: "Wind erosion adjustment factor: The wind erosion adjustment factor is used along with PEC values to shut off or accelerate soil erosion. As with water erosion, wind erosion can be shut off by setting ACW = 0. If normal wind erosion calculation is desired, set ACW = 1. Also, AWC can be increased to a high level (e.g., ACW=10) as a shortcut in estimating wind erosion effects on the soil profile. Since ACW is related linearly to wind erosion, a 1000-year simulation can be approximated by a 100 years' simulation using ACW=10. (Range: 0 – 10)",
      ACW: "Wind erosion adjustment factor: The wind erosion adjustment factor is used along with PEC values to shut off or accelerate soil erosion. As with water erosion, wind erosion can be shut off by setting ACW = 0. If normal wind erosion calculation is desired, set ACW = 1. Also, AWC can be increased to a high level (e.g., ACW=10) as a shortcut in estimating wind erosion effects on the soil profile. Since ACW is related linearly to wind erosion, a 1000-year simulation can be approximated by a 100 years' simulation using ACW=10. (Range: 0 – 10), ACW = 0: No wind erosion, ACW = 1: Normal simulation, ACW > 1: Accelerates wind erosion (condenses time)",
      BIR: "Water stress factor to trigger automatic irrigation: BIR is used to trigger automatic irrigation based on selected aspects during the simulation. BIR allows us to select different methods to activate the automatic irrigation considering aspects such as plant water stress or soil water content measured in different ways. The following scheme provides detailed information on how to set BIR to select the method and set the threshold to activate the automatic irrigation, BIR = 0: Only manual irrigation will be used during the simulation, BIR 0 – 1.0: Automatic irrigation based on plant water stress factor. The dimension (1 – BIR) equals the fraction of plant water stress allowed. Consequently, a low BIR allows high plant water stress before triggering automatic irrigation, BIR = 1.0: Does not allow water stress, BIR < 0.0: Automatic irrigation triggered by plant available water deficit in the root zone. Number is in mm and must be negative, BIR > 1.0: Automatic irrigation triggered by soil water tension in the top 200 mm of the soil profile. Absolute number is in kilopascals, BIR = -1000: Sets water deficit high enough that only manual irrigations will occur. Effectively turns auto irrigation off, NOTES: When BIR is set and used with a cropping system that includes more than one crop in rotation, the BIR will apply to all crops in the rotation, When using a BIR based on anything other than plant water stress (0-1), be aware that irrigation will be applied outside of the growing season if the soil water deficit or soil water tension reaches BIR. This will reduce the amount of water available for irrigation during the growing season.",
      EFI: "Runoff volume/Volume irrigation water applied: The irrigation runoff ratio specifies the fraction of each irrigation application that is lost to runoff. Soluble nutrient loss through runoff applies. Changes in soil slope do not affect this amount dynamically. EFI must be set accordingly, and the irrigation method should be considered. Set to 0 if IRR = 0 (dryland). (Range: 0 to 1)",
      VIMX: "Maximum annual irrigation volume (mm): This is the maximum irrigation volume allowed each year in mm. If several crops are grown in one year, the first crop’s needs will be supplied as needed and any remaining water will be applied as needed to the next crop. If all of the water allocated by VIMX is used on the first crop, the second crop will not receive any irrigation. This also applies to manual irrigation. Once the amount of irrigation applied equals VIMX, then no additional irrigation will be applied, regardless of if it is manually or automatically applied.",
      ARMN: "Minimum single application volume (mm): This is the minimum amount of irrigation allowed for each auto irrigation application.",
      ARMX: "Maximum single application volume (mm): This is the maximum amount of irrigation allowed for each auto irrigation application in mm. This is the amount of irrigation water applied if rigid automatic irrigation is selected.",
      BFT0: "Nitrogen stress factor to trigger auto fertilization: The automatic fertilizer trigger functions like BIR for irrigation. When the plant nitrogen stress level reaches BFT0, nitrogen fertilizer may be applied automatically. If BFT0 is greater than 0, IDF0 must be the Number of the fertilizer selected for the automatic N application.The auto N fertilization can be activated as follows: BFT0 = 0.00 For manual fertilizer application. BFT0 0 – 1 Allows percentage of plant nitrogen stress with the dimension (1 – BFT) equals the fraction of nitrogen stress allowed. BFT0 = 1.00 No nitrogen stress allowed; auto-fertilization is triggered when needed. BFT0 > 1.00 If BFT0 is greater than 1, BFT0 is the ppm (g Mg-1) of nitrogen in soil at which automatic fertilization is triggered.",
      FNP: "Fertilizer application variable: FNP has two meanings: If the automatic fertilization is activated, a value greater than 1 will set the fixed amount of fertilizer applied with each automatic application. The value is input as kg ha-1. If irrigation from lagoon is selected (IRR = 4) FNP indicates the manure input to lagoon in kg/cow/day. If this option is used, the part for automatic fertilization is skipped. To use this option, variables RST0, FFED, VLGN, DDLG, COWW, and SOLQ (below in this section) must be provided.",
      FMX: "Maximum annual N fertilizer applied for a crop (kg ha-1): Maximum amount of nitrogen fertilizer available for application per plant (for annual plants) or per year (for perennial plants and trees). After FMX value has been met, no additional fertilizer will be applied. This variable can be overridden in the operation schedule where it can be set for each planting operation. Refer to section on the EPIC management file (filename.OPC) for further information on setting the maximum annual amount per crop. If FMX is set to zero it is default to 200. NOTE If this variable is set either in the control table file or in the operation schedule and manual fertilization is applied, the model will only apply up to this maximum amount regardless of the amount specified in the manual fertilization operation.",
      DRT: "Time requirement for drainage system to end plant stress in days: Artificial drainage systems may be very efficient and quickly reduce soil water content or it may take several days for the soil water level to decline sufficiently to eliminate aeration stress. The variable DRT is used to specify the time needed for the drainage system to eliminate stress. In this case time is measured in days. Enter 0 if drainage is not considered.(Range: 0 to 365)",
      FDS0: "Furrow dike safety factor: Fraction of furrow dike volume available for water storage. FDS0 controls the volume of water that can be stored in the dike before water tops over the dike. This variable is used to account for uncertainty in the volume of the furrow dike. The volume is calculated from the height of the row, row interval (width of row), length of dike and height of dike. If these values are not very certain, it may be wise to set FDS0 to a low number which indicates that the certainty of dike design in not very high. This will cause the dikes to overflow much quicker, which will affect runoff and erosion. If the certainty of design of the dike is great, FDS0 can be set to 0.9 or higher, which will lessen dike overflow as well as runoff and erosion.(Range: 0 to 1)",
      PEC0: "Erosion control practice factor: The erosion-control-practice factor normally ranges from about 0.1 to 0.9 depending upon the effectiveness of the conservation practice. Default = 1.0 for non-contoured fields. However, PEC can be set to 0.0 to eliminate water erosion entirely. At the other extreme, (PEC = 10.0) erosion rates are increased 10 times to improve long-term simulation efficiency. This feature is a big time-saver in estimating water erosion effects on soil properties over periods of up to 1000 years. Obviously, the 1000-year period can be approximated with a 100-year simulation using PEC = 10.0.(Range: 0 to 10)",
      VLGN: "Lagoon volume ratio: Normal Lagoon Volume as a fraction of Maximum Lagoon Volume (Normal Lagoon Volume/Maximum lagoon volume). It is needed only when IRR = 4.(Range: 0 to 1)",
      COWW: "Lagoon input from wash water (m3/cow/day): Needed only when IRR = 4 and owner has at least one head of livestock. Average normal value is 0.15.(Range: 0 to 1)",
      DDLG: "Time to reduce lagoon storage from maximum to normal (number of days): Needed only when IRR = 4.(Range: 0 to 1)",
      SOLQ: "Ratio liquid/total manure produced in this feedlot subarea: Fraction of total manure produced that goes into a lagoon as liquid. Needed only when IRR = 4.(Range: 0 to 1)",
      GZLM: "Above ground plant material grazing limit (Mg ha-1): This is the minimum amount of biomass present in the field to allow grazing activity. The grazing activity stops when the above ground biomass goes below the threshold set with GZLM.",
      FFED: "Fraction of day (24 hours) that herd is in feeding area: This is the fraction of the day that herd is in the feeding area and not grazing on pasture.(Range: 0 to 1)",
      DZ: "Layer thickness for solution of gas diffusion differential equation (m): This information is used only when the Cesar Izaurralde denitrification approaches (see IDN > 2 on line two of the EPIC control file) are selected by the user.",
      DRV: "Water erosion driving equation code: Specifies the equation used in simulating the water erosion process and interacts with all the EPIC components. In fact, EPIC simulates soil water erosion with all the methods available but only the results obtained with the methods selected by the user interact with the other components of the EPIC model. Allowed values:, 0 MUST – Modified MUSLE theoretical equation, 1 AOF - Onstad-Foster NOT AVAILABLE, 2 USLE - Universal Soil Loss Equation, 3 MUSS - Small Watershed MUSLE, 4 MUSL - Modified USLE, 5 MUSI - MUSLE with input parameters (see BUS(1)) NOT AVAILABLE, 6 RUSL – Revised Universal Loss Equation, 7 RUS2 – Modified Revised Universal Loss Equation",
      RST0: "Base stocking rate (hectares per head): Indicates the number of hectares available per grazer",
      STF0: "Fraction of storage interacting with nitrate leaching It defines the fraction of soil porosity that is considered in estimating nitrogen leaching. It is overwritten by values provided in the soil file (variable STRF).Default setting: 0.8 (Range: 0.05 to 1)",
      COIR: "Cost of irrigation water ($ m-3): This is the cost of water used for irrigation",
      COL: "Cost of lime ($ Mg-1) Cost of one metric ton (equal to one megagram - Mg) of lime",
      FULP: "Cost of fuel ($ gal-1) Cost of one gallon of fuel",
      WAGE: "Cost of labor ($ hr-1) Hourly cost of labor",
      CSTZ1:
        "Miscellaneous cost ($ ha-1) First of two additional costs available to the user",
      CSTZ2:
        "Miscellaneous cost ($ ha-1) Second of two additional costs available to the user",
    },
  },
  SITForm: {
    headers: [
      [
        "YLAT",
        "XLOG",
        "ELEV",
        "APM",
        "CO2X",
        "CNO3",
        "RFNX",
        "X1",
        "X2",
        "SNO0",
        "AZM",
      ],
      ["WSA", "CHL", "CHS", "CHD", "CHN", "SN", "UPSL", "UPS", "PEC", "DTG"],
      ["IRR", "IRI", "IFA", "IFD", "IDR0", "IDF0", "MNU", "IMW", "IDFP"],
    ],
    descriptions: {
      YLAT: "Latitude of watershed in decimal degrees (cols. 1-8): The latitude of the field or watershed (YLAT) is used to estimate day length. It must be supplied by the user. Units are degrees. Latitudes in the Southern Hemisphere are in negative degrees and positive in the Northern Hemisphere. (Range: -90 to 90).",
      XLOG: "Longitude of watershed in decimal degrees (cols. 9-16): (Range: -180 to 180).",
      ELEV: "Average watershed elevation in meters (cols. 17-24): The average watershed elevation should be input if the Penman or the Penma-Monteith approach is used to estimate potential evapotranspiration. Units are meters. (Range: -200 to 8000).",
      APM: "Peak runoff rate – rainfall energy adjustment factor (cols. 25-32): The peak runoff-rate-rainfall energy adjustment factor provides a means for fine tuning the energy factor used in estimating water erosion. Normally, an APM value of 1 gives satisfactory results. Set APM to 0 if unknown. (Range: 0 to 1).",
      CO2X: "Atmospheric CO2 Concentration in ppm (cols. 33-40): A non-zero value overrides the CO2 input in EPICCONT.DAT. (Range: 0 to 1000).",
      CNO3X:
        "Concentration of NO3 in irrigation water in ppm (cols.41-48): A non-zero value overrides the CQN input in the EPICCONT.DAT. (Range: 0 to 1000).",
      RFNX: "Average concentration of Nitrogen in rainfall in ppm (cols. 49-56): A non-zero value overrides the RFN0 input in the EPICCONT.DAT. (Range: 0.5-1.5).",
      X1: "Dummy (cols. 57-64)",
      X2: "Dummy (cols. 65-72)",
      SNO0: "Water content of snow present on the ground at start of simulation in millimeters (cols. 73-80).",
      AZM: "Azimuth orientation of land slope (degrees clockwise from north) (cols. 81-88): Used only if equivalent latitude is computed based on azimuth orientation of land slope (IAZM in EPICCONT.DAT greater than zero). (Range: 0 to 360).",
      WSA: "Field, farm or watershed area in hectares (cols. 1-8): Size of the area to be simulated. A value for WSA is required and must be provided.",
      CHL: "Mainstream channel length in kilometers (cols. 9-16): Distance from outlet to most distant point on field, farm, or watershed. Often in small areas there is no defined channel. In such cases, the length is measured along a concentrated flow path, or it can simply be estimated from the length-width ratio of the watershed. For areas ≤ 20 ha, the channel length measurement is not critical. In such cases where channel data is not available, CHL can be set to 0 and allow the model to estimate it. If channel data is not available, enter 0 (TR55 file must be present as input file).",
      CHS: "Mainstream channel slope (cols. 17-24): The average channel slope is computed by dividing the difference in elevation between the field, farm, or watershed outlet and the most distant point by CHL. For small areas this measurement is not critical because CHL and CHS are only used in estimating the watershed time of concentration. The dominant portion of the time of concentration is involved with overland rather than channel flow in small watersheds. Slope is expressed as units of drop per unit of distance (m m-1). If unknown, enter 0 (upland slope steepness (UPS) in site file must be provided).",
      CHD: "Channel depth (cols. 25-32): Depth of the channel in meters. If unknown, enter 0 (TR55 file must be present as input file).",
      CHN: "Manning’s N for channel (cols. 33-40): If the channel conducting runoff to the edge of the field is winding and/or contains obstructions, water flow rates will be reduced, and sediment will have an opportunity to settle. The channel roughness factor is referred to as the Manning's “n” value. Table 4 contains suggested values of Manning’s “n” for various condition channel flow (Chow, 1959). Chow has a very extensive list of Manning’s roughness coefficients. These values represent only a small portion of those listed in his book. If unknown, enter 0 (the default value of 0.05 will be assigned to CHN).",
      SN: "Manning’s N for upland (surface) (cols. 41-48): The surface roughness factor is Manning’s “n” values. Table 5 contains suggested values and possible ranges of Manning’s “n” for various condition overland flow (Engman, 1983). If unknown, enter 0 (the default value of 0.15 will be assigned to SN).",
      UPSL: "Average Upland Slope Length in meters (cols. 49-56): This value must be entered. The watershed slope length can be estimated by field measurement as described by Wischmeier and Smith (1978) or from topographic maps using the Contour-Extreme Point Method (R. J. Williams & Berndt, 1977). This is the distance that sheet flow is the dominant surface runoff flow process. Slope length should be measured to the point that flow begins to concentrate. This length is easily observable after a heavy rain on a fallow field when the rills are well developed. In this situation, the slope length is the distance from the subarea divide to the origin of the rill. This value can also be determined from topographic maps. Terraces divide the slope of the rill into segments equal to the horizontal terrace interval. With terracing, the slope length is the terrace interval. For broad base terraces, the horizontal terrace interval is the distance from the center of the ridge to the center of the channel for the terrace below. The horizontal terrace interval for steep backslope terraces is the distance from the point where cultivation begins at the base of the ridge to the base of the front slope of the terrace below. Slope length is a parameter that is commonly overestimated. As a rule of thumb, 90 meters (300 ft) is considered to be a very long slope length.",
      UPS: "Average Upland Slope (cols. 57-64): Slope is in m m-1. Must be entered. The average watershed slope can be estimated from field measurement or by using the Grid-Contour Method (R. J. Williams & Berndt, 1977).",
      PEC: "Erosion Control Practice Factor (cols. 65-72): The erosion-control-practice factor ranges from about 0.1 to 0.9 depending upon the effectiveness of the conservation practice. A non-zero value overwrites the PEC0 set in the EPICCONT.DAT file. Default = 1.0 for non-contoured fields. PEC can be set to 0.0 to eliminate water erosion entirely. At the other extreme, (PEC=10.) erosion rates are increased 10 times to improve long-term simulation efficiency. This feature is a big, time saver in estimating water erosion effects on soil properties over periods of up to 1000 years. Obviously, the 1000-year period can be approximated with a 100-year simulation using PEC=10. Table 6 provides P values and slope length limits for contouring.(Range: 0 to 10).",
      DTG: "Time Interval for Gas Diffusion Equations (cols. 73-80: This value is used when the Izaurralde denitrification approach is selected in EPICCONT.DAT (variable IDN > 2). For more information on the Izaurralde denitrification approach see Izaurralde et al. (2017).",
      IRR: "Irrigation Code (cols. 1-4): The irrigation code is used to specify whether irrigation is used and the type of irrigation. It is composed of two digits: the first one (N in the example below) defines the irrigation mode, the second one defines the irrigation type.N = 0 flexible (variable) application. Applies the minimum of volume input, soil water field capacity (FC-SW) and maximum single irrigation application(ARMX). When used with the manual irrigation option, irrigation is applied on the date specified in the operation schedule in a volume equal to the minimum of the specified volume, the maximum single application volume, or the volume required to fill the root zone to field capacity (calculated as (FC-SW)/ (1-efficiency EFI)). When used with the automatic option, irrigation is applied based on the irrigation trigger (BIR) and according to the minimum (ARMN) and maximum (ARMX) single irrigation application rate as well as the maximum annual irrigation amount(VIMX) and the irrigation interval (IRI) with the volume applied that will not exceed the volume required to fill the root zone to field capacity.N = 1 rigid (fixed) application. Applies input amount or ARMX. If the manual irrigation is selected, irrigation is applied according to the amounts and dates specified in the operation schedule. If the automatic irrigation option is selected, the amount applied per irrigation is equal to the maximum single application volume (ARMX) and it is applied when the irrigation trigger (BIR) is reached. In all cases, the EFI is removed through runoff prior to infiltration into the soil. Irrigation types available in EPIC are: N0 = for dryland areas N1 = for sprinkler irrigation N2 = for furrow/flood irrigation N3 = for fertigation (irrigation with fertilizer added) * N4 = for lagoon (irrigation from a lagoon) N5 = for drip irrigation For example, a rigid drip irrigation is coded as 15. A flexible sprinkler irrigation is coded as 01. In all cases, the N before the code for irrigation type indicates the irrigation mode. If furrow/flood irrigation is specified, water induced erosion is calculated. If fertigation is specified, IDF0 identifies the type of fertilizer (fertilizer ID from  table) and FNP identifies the amount of fertilizer for each irrigation. If lagoon is specified, IDF0 is used to identify the organic fertilizer while FNP represents the manure input to lagoon in kg/cow/day. * Fertigation works only when automatic irrigation and automatic nitrogen fertilization are selected. See BIR (line 4 of the EPIC control file) and BFT0 (line 5 of the EPIC control file). A way to manually simulate fertigation is to simulate irrigation and fertilization on the same day using the irrigation volume and amount of fertilizer added with the fertigation or using the automatic irrigation and setting the amount of N in irrigation water (see variables CNO30 and CNO3X).",
      IRI: "Minimum Application Interval for Automatic Irrigatio (cols. 5-8): This sets the number of days between automatic irrigation events. Irrigation will not occur until the minimum number of days has been met regardless of the BIR has already been met. Because IRI will also affect manual irrigation, set IRI = 0 if automatic irrigation is not used (IRR = 0).(Range: 0 to 365).",
      IFA: "Minimum Fertilizer Application Interval for Auto Option (cols. 9-12): This sets the number of days between fertilization events and fertilization will not occur until the minimum number of days has been met. Because IFA will also affect manual fertilization, set IFA = 0 if manual fertilization is used (BFT0 = 0)./(Range: 0 to 365).",
      IFD: "Furrow Dike Code (cols. 13-16): Furrow dikes (or tied ridges) are small dams constructed, usually by tillage equipment, in the furrows. They are designed to impede runoff and promote infiltration of rainfall and/or sprinkler irrigation. EPIC simulates the construction, function, and destruction of furrow dikes. The furrow dike code IFD is used to determine whether dikes are simulated. Allowed values: 0 Furrow dike system not simulated 1 Furrow dike system simulated.",
      IDR0: "Drainage Code (cols. 17-20) Artificial drainage systems (tiles, perforated pipes, open ditch drains, etc.) are often installed to remove excess water from fields. Allowed values:0 No drainage system >0 The drainage system is simulated. Enter depth to drainage system in mm (Range: 0 to 2500).",
      IDF0: "Commercial Nitrogen Fertilizer Used for Automatic Application (cols. 21-24): Enter the ID number of the fertilizer from lists provided in the (FERT___.DAT). If none is entered the model defaults to the fertilizer ID 21 which should be Elemental N in the fertilizer table. It is wise to set this number even if there are no current plans to use this function so that the selected fertilizer number matches the correct number in the fertilizer list which is being used.",
      MNU: "Auto Manure Application Without Trigger (cols. 25-28)A value greater than zero allows the application of manure (if the minimum interval between fertilization is met).(Range: 0 to 365).",
      IMW: " Minimum Interval between auto mowing (cols. 29-32)This refers to the minimum length of time (days) set between mowing when the Auto Mow function is used. The crop will be mowed at this interval given the crop height is greater than the cutting height set on the mower used in the operation. For the IMW to take effect, an automatic mower must be included in the operation schedule. (Range: 0 to 365).",
      IDFP: "Commercial Phosphorus Fertilizer Used for Automatic Application (cols. 33-36): Enter the ID number of the fertilizer from lists provided in the (FERT___.DAT). If none is entered model defaults to fertilizer ID 22 which should be Elemental P in the fertilizer table. It is wise to set this number even if there are no current plans to use this function so that the selected fertilizer number matches the correct number in the fertilizer list which is being used.",
    },
  },

  SOLForm: {
    headers: [
      ["SOLS", "SOLO"],
      [
        "SALB",
        "HSG",
        "FFC",
        "WTMN",
        "WTMX",
        "WTBL",
        "GWST",
        "GWMX",
        "RFTO",
        "RFPK",
      ],
      ["TSLA", "XIDP", "RTN0", "XIDK", "ZQT", "ZF", "ZTK", "FBM", "FHP", "XCC"],
      [
        "Column1",
        "Column2",
        "Column3",
        "Column4",
        "Column5",
        "Column6",
        "Column7",
        "Column8",
        "Column9",
        "Column10",
        "Column11",
        "Column12",
        "Column13",
        "Column14",
        "Column15",
      ],

      [
        "Z",
        "BD",
        "U",
        "FC",
        "SAN",
        "SIL",
        "WON",
        "PH",
        "SMB",
        "WOC",
        "CAC",
        "CEC",
        "ROK",
        "CNDS",
        "PKRZ",
        "RSD",
        "BDD",
        "PSP",
        "SATC",
        "HCL",
        "WP",
        "EXCK",
        "ECND",
        "STFR",
        "ST",
        "WLS",
        "WLM",
        "WLSL",
        "WLSC",
        "WLMC",
        "WLSLC",
        "WLSLNC",
        "WBMC",
        "WHSC",
        "WHPC",
        "WLSN",
        "WLMN",
        "WBMN",
        "WHSN",
        "WHPN",
        "FE26",
        "SULF",
        "ASHZ",
        "CGO2",
        "CGCO2",
        "CGN2O",
        "columns46",
        "columns47",
      ],
    ],
    descriptions: {
      SOLS: "Soil series name.",
      SOLO: "Soil order: This information can be used to drive the estimation of soil carbon losses if soil horizon is B or C, and if SOLO is one of the following: • Alfisols, • Mollisols, • Ultisols.",
      SALB: "Soil albedo (cols. 1-8): Ratio of the amount of solar radiation reflected by the soil to the amount incident upon it, often expressed as a fraction. The value for albedo should be reported when the soil is at or near field capacity.(Range: 0 to 1).",
      HSG: "Soil hydrologic group (cols. 9-16): The U.S. Natural Resource Conservation Service (NRCS) classifies soils into four hydrologic groups based on infiltration characteristics of the soils. NRCS Soil Survey Staff (1996) defines a hydrologic group as a group of soils having similar runoff potential under similar storm and cover conditions. Soil properties that influence runoff potential are those that impact the minimum rate of infiltration for a bare soil after prolonged wetting and when not frozen. These properties are depth to seasonally high-water table, saturated hydraulic conductivity, and depth to a very slowly permeable layer. The definitions for the different classes are: A Soils having high infiltration rates when thoroughly wetted, consisting chiefly of sand or gravel that are deep and well to excessively drained. These soils have high rate of water transmission (low runoff potential), B Soils having moderate infiltration rates when thoroughly wetted, chiefly moderately deep to deep, moderately well to well drained, with moderately fine to moderately coarse textures. These soils have a moderate rate of water transmission., C Soils having slow infiltration rates when thoroughly wetted, chiefly with a layer that impedes the downward movement of water or of moderately fine to fine texture and a slow infiltration rate. These soils have a slow rate of water transmission (high runoff potential)., D Soils having very slow infiltration rates when thoroughly wetted, chiefly clay soils with a high swelling potential; soils with a high permanent water table; soils with a clay pan or clay layer at or near the surface; and shallow soils over nearly impervious materials. These soils have a very slow rate of water transmission.See table 8 below for hydrologic group rating criteria. Accepted values are, 1 for hydrologic group A, 2 for hydrologic group B, 3 for hydrologic group C, 4 for hydrologic group D.",
      FFC: "Initial soil water content (cols. 17-24): Soil water content at the beginning of the simulation as a fraction of field capacity. Set at zero if unknown. (Range: 0 to 1)",
      WTMN: "Minimum depth to water table (cols. 25-32): This is the depth in meters from the soil surface to the water table when the water table is at its highest level. With the depth set at zero, the model automatically sets the depth deep enough to remove any effects (default at 50 m). Fluctuation of water table is simulated as a function of groundwater storage.Set to 0 if unknown.(Range: 0 to 100 meters).",
      WTMX: "Maximum depth to water table (cols. 33-40): The depth in meters from the soil surface to the water table when the water table is at its lowest level. Set to 0 if unknown. (Range: 0 to 100 meters)",
      WTBL: "Initial water table height (cols. 41-48)This is the depth in meters from the soil surface to the current water level at which the model will begin the simulation. Throughout the simulation the water level will fluctuate up and down between WTMN and WTMX. This depth must be greater than or equal to WTMN and less than or equal to WTMX.Set to 0 if unknown.WTMN, WTMX, and WTBL are very important when the field contains a water table that is near the surface. Default settings assume the water table is deep enough not to affect plant growth; however, if the water table is within several feet of the surface, it can provide an extra supply of water that ordinarily would not be accounted for in the model.(Range: 0 to 100 meters).",
      GWST: "Groundwater storage (cols. 49-56): The amount of groundwater storage in millimeters available at the beginning of the simulation.Set to 0 if unknown.(Range: 0 to 200 mm).",
      GWMX: "Maximum groundwater storage (cols. 57-64): The maximum amount of groundwater storage available in millimeters. Set to 0 if unknown. (Range: 10 to 500 mm)",
      RFT0: "Groundwater residence time (cols. 65-72): The length of time water spends in the groundwater portion of the hydrologic cycle in days. Set to zero if unknown. (Range: 1 to 365 days)",
      RFPK: "Ratio between return flow and return flow + deep percolation (cols. 73-80): Set to 0 if unknown. (Range: 0.01 to 0.99)",
      TSLA: "Number of soil layers after splitting (cols. 1-8): It sets the number of soil layers created by the model when splitting the original soil layers. No splitting occurs if TSLA is set to zero. (Range: 3 to 15).",
      XIDP: "Soil weathering code (cols. 9-16): The soil weathering code is used to provide information for estimating the phosphorus sorption ratio. If no weathering information is available or if the soil contains CaCO3, XIDP is left at 0.Accepted values are: 0 for calcareous and non-calcareous soils without weathering information, 1 for non CaCO3 slightly weathered, 2 for non CaCO3 moderately weathered, 3 for non CaCO3 highly weathered, 4 Input Phosphorus sorption ratio (PSP) or active + stable mineral P(kg/ha).",
      RTN0: "Number of years of cultivation when simulation begins (cols. 17-24): This parameter affects the partitioning of nitrogen and carbon into the passive and slow humus pools. The number of years of cultivation before the simulation starts is used to estimate the fraction of the organic N pool that is mineralizable. Mineralization is more rapid from soil recently in sod. Also, increasing the number of years the field has been in cultivation increases the amount of C and N in the passive pool. This means it will take longer for the carbon and nitrogen to become available.(Range: 0 to 300 years)",
      XIDK: "Soil grouping (cols. 25-32): Accepted values are: 1 = Kaolinitic soil group, 2 = Mixed soil group, 3 = Smectitic soil group.",
      ZQT: "Minimum thickness of maximum layer in meters (cols. 33-40): The model splits layers with thickness greater than ZQT. This splitting scheme produces thinner layers near the soil surface throughout the simulation period. Since most activity (tillage, root growth, microbial activity, rainfall/runoff interaction, etc.) occurs relatively near the soil surface, concentrating computational effort in that zone by using thin layers is very desirable. As soil layers are eroded and lost from the system, layer splitting continues until the number of layers equals TSLA. When the thickest soil layer reaches ZQT, no further splitting occurs. Instead, the number of soil layers is reduced until only two layers remain. At that time, the simulation stops. The simulation will also stop if the user-specified, minimum soil-profile thickness (ZF) is reached. If ZQT and ZF are not inputted, the model sets both of them to 0.1 m. Refer to TSLA, ZF and ZTK for further information.Set to 0 if unknown.(Range: 0.01 to 0.25 meters)",
      ZF: "Minimum profile thickness (cols. 41-48): This is the minimum thickness (in meters) of the profile that is allowed. If the profile is eroded to this thickness, the simulation will stop. If ZF is not inputted, the model sets it to 0.1 m. Refer to TSLA, ZQT, and ZTK for further information.(Range: 0.05 to 0.25 meters)",
      ZTK: "Minimum layer thickness for beginning simulation layer (cols. 49-56): The model splits the first layer with thickness greater than ZTK (in meters); if none exists the thickest layer is split. This is only done once to make certain there are no extremely thick layers even at lower depths. Refer to TSLA, ZQT and ZF for further information.(Range: 0.05 to 0.25 mm)",
      FBM: "Fraction of organic carbon in biomass pool (cols. 57-64): Set to 0 if unknown and the model will assign the default value of 0.04. (Range: 0.03 to 0.05).",
      FHP: "Fraction of carbon in passive pool (cols. 65-72): Set to 0 if unknown and the model will calculate its value as a function of RTN0. (Range: 0.3 to 0.7).",
      XCC: "NOT USER INPUT (cols. 73-80): This is a code written automatically by the model when a .SOT file is created. XCC is equal to 0 for regular soil files and equal to 1 for model-generated SOT files.",
      Z: "Depth to bottom of layer: Depth from the soil surface to the bottom of the layer (meters) (Range: 0.01 to 10.0).",
      BD: "Moist bulk density (Mg m-3): The soil bulk density represents the ratio of the mass of solid particles to the total volume of the soil. Usually, BD values fall between 1.1 and 1.9 Mg m-3.(Range: 0.5 to 2.5)",
      U: "Soil water content at wilting point (fraction): The wilting point is the soil water content at 1500 KPa or -15 Bars. The value of U must be lower than the value of FC. Set to 0 if unknown.(Range: 0.01 to 0.5)",
      FC: "Soil water content at field capacity (fraction): The field capacity is the soil water content at 33 KPa or -0.33 bar.The value of FC must be greater than U and cannot be greater than 1. (Range: 0.1 to 0.9).",
      SAN: "Sand content (%): Fraction of soil particles which have a diameter between 2.0 and 0.05 mm. (Range: 1 to 99).",
      SIL: "Silt content (%): Fraction of soil particles which have a diameter between 0.05 and 0.002 mm. (Range: 1 to 99).",
      WON: "Initial organic nitrogen concentration (g N Mg-1 or ppm): Users may define the concentration of organic nitrogen (dry weight basis) contained in humic substances for all soil layers at the beginning of the simulation. If the user does not specify initial nitrogen concentrations, EPIC will initialize levels of organic nitrogen.Set to 0 if unknown.(Range: 100 to 5000)",
      PH: "Soil pH: It is the pH of a solution in equilibrium with the soil. It is determined by means of a glass, quinhydrone, or other suitable electrode or indicator at a specified soil-solution ratio in a specified solution, usually distilled water, 0.01 M CaCl2 or 1 M KCl.(Range: 3 to 9)",
      SMB: "Sum of bases (cmol kg-1): The sum of bases (Ca++, K+, etc.) on the cation exchange complex. Set to 0 if unknown.(Range: 0 to 150).",
      WOC: "Organic carbon concentration (%): It is the concentration of organic carbon present in the soil.Set to 0 if unknown.(Range: 0.1 to 10)",
      CAC: "Calcium carbonate content (%): It is the carbon carbonate content of the soil. A compound, CaCO3 is found in nature as calcite and argonite and in plant ashes, bones, and shells. CaCO3 is found in calcareous soils. It is also used as a liming agent to increase the pH of a soil. Set to 0 if unknown.(Range: 0 to 99)",
      CEC: "Cation exchange capacity (cmol kg-1): The cation exchange capacity of a soil is the quantity of positive ions necessary to neutralize the negative charge of a unit quantity of soil, under a given set of conditions. Set to 0 if unknown.(Range: 0 to 150) ",
      ROK: "Coarse fragment content (%): The percent (in volume) of the sample which has a particle diameter > 2 mm, i.e. the percent of the sample which does not pass through a 2 mm sieve. Set to 0 if unknown (Range: 0 to 99).",
      CNDS: "Initial soluble nitrogen concentration (g Mg-1): Users may define the concentration of nitrate (dry weight basis) for all soil layers at the beginning of the simulation. Set to 0 if unknown. (Range: 0.01 to 500).",
      PKRZ: "Initial soluble phosphorus concentration (g Mg-1): Users may define the concentration of solution P (dry weight basis) for all soil layers at the beginning of the simulation. Set to 0 if unknown (Range: 0 to 20).",
      RSD: "Crop residue (Mg ha-1): The amount of biomass in each soil layer at the beginning of the simulation. Set to 0 if unknown(Range: 0 to 20).",
      BDD: "Dry bulk density (Mg m-3): Density of the soil after oven drying. Set to 0 if unknown (BD value will be assigned to BDD).(Range: 0 to 2.0).",
      PSP: "Phosphorus sorption ratio (fraction): The fraction of phosphorus adsorbed on soil particle surfaces.Set to 0 if unknown. The model will estimate PSP according to the soil weathering code (XIDP) and using CAC, PKRZ, BSA, PH, and/or CLA depending on XIDP (Range: 0 to 0.9).",
      SATC: "Saturated conductivity (mm h-1): Rate at which water passes through the soil layer, when saturated. The saturated hydraulic conductivity relates soil water flow rate (flux density) to the hydraulic gradient and is a measure of the ease of water movement through the soil. The saturated conductivity is the reciprocal of the resistance of the soil matrix to water flow.Set to 0 if unknown.(Range: 0.00001 to 100).",
      HCL: "Lateral hydraulic conductivity (mm h-1): Set to 0 if unknown(Range: 0.00001 to 10).",
      WP: "Initial organic phosphorus concentration (g Mg-1): Users may define the concentration of organic phosphorus (dry weight basis) contained in humic substances for all soil layers at the beginning of the simulation. Set to 0 if unknown.(Range: 50 to 1000).",
      EXCK: "Exchangeable potassium concentration (g Mg-1): The amount of potassium on the surface of soil particles that can be readily replaced with a salt solution. Set to 0 if unknown(Range: 0 to 200).",
      ECND: "Electrical conductivity (mmho cm-1): Conductivity of electricity through water or an extract of soil. Commonly used to estimate the soluble salt content in solution. For a conversion to commonly used units, 1 mmho cm-1 is equal to 1 dS m-1. Set to 0 if unknown.(Range: 0 to 50).",
      STFR: "Fraction of water storage interacting with nitrogen leaching: It is the fraction of soil porosity that interacts with percolating water as nitrogen leaching occurs. Set to 0 if unknown (Range: 0.05 to 1.0).",
      ST: "Initial soil water storage (fraction, m/m): Fraction of field capacity initially available at the start of the simulation. Set to 0 if unknown (the value of FC will be used) (Range: 0.001 to 1.0).",
      WLS: "Structural litter (kg ha-1): One of the two litter components that contains all the lignin from plant residues and roots. The structural litter component has a fixed C/N ratio. Set to 0 if unknown (Range: 0.0 to 10000).",
      WLM: "Metabolic litter (kg ha-1): One of the two litter components made up of readily decomposable and water-soluble organic matter. Set to 0 if unknown (Range: 0.0 to 10000).",
      WLSL: "Lignin content of structural litter (kg ha-1): Lignin is a complex polymer that binds to cellulose fibers and gives strength to the cell walls of plants. It is very resistant to decomposition. Set to 0 if unknown. (Range: 0.0 to 10000).",
      WLSC: "Carbon content of structural litter (kg ha-1): Carbon makes up almost half of the elemental composition of the dry matter in plants and is a common constituent of all organic matter. It is also present in the atmosphere in the form of CO2.Set to 0 if unknown.(Range: 0.0 to 10000).",
      WLMC: "Carbon content of metabolic litter (kg ha-1): See WLSC and WLM for more information. Set to 0 if unknown (Range: 0.0 to 10000).",
      WLSLC:
        "Carbon content of lignin of structural litter (kg ha-1): See WLSC, WLSL, and WLS for more information. Set to 0 if unknown. (Range: 0.0 to 10000).",
      WLSLNC:
        "Nitrogen content of lignin of structural litter (kg ha-1): The amount of nitrogen found in the lignin portion of the structural litter. See WLSL and WLS for more information. Set to 0 if unknown (Range: 0.0 to 10000).",
      WBMC: "Carbon content of biomass organic pool (kg ha-1): The carbon content of the fresh soil organic matter.Set to 0 if unknown (Range: 0.0 to 10000).",
      WHSC: "Carbon content of slow humus pool (kg ha-1): Slow humus is a conceptual component of soil organic matter that decomposes at rates intermediate between the microbial and passive humus components. Set to 0 if unknown (Range: 0.0 to 10000).",
      WHPC: "Carbon content of passive humus pool (kg ha-1): Passive humus is a conceptual component composed of old or stable soil organic matter. Set to 0 if unknown (Range: 0.0 to 10000).",
      WLSN: "Nitrogen content of structural litter (kg ha-1): See WLS for more information.Set to 0 if unknown (Range: 0.0 to 10000).",
      WLMN: "Nitrogen content of metabolic litter (kg ha-1): See WLM for more information.Set to 0 if unknown (Range: 0.0 to 10000).",
      WBMN: "Nitrogen content of biomass pool (kg ha-1): The nitrogen content of the fresh soil organic matter.Set to 0 if unknown (Range: 0.0 to 10000).",
      WHSN: "Carbon content of slow humus pool (kg ha-1): See WHSC for more information.Set to 0 if unknown (Range: 0.0 to 10000).",
      WHPN: "Carbon content of passive humus pool (kg ha-1): See WHPC for more information.Set to 0 if unknown (Range: 0.0 to 10000).",
      FE26: "Iron content (%): It can be used in the estimation of carbon losses if the soil order (SOLO) is Ultisols and if soil horizon (ASHZ) is B or C. Set to 0 if unknown (Range: 0.1 to 50.0).",
      SULF: "Sulfur content (%): Set to 0 if unknown (Range: 0.01 to 0.06).",
      ASHZ: "Soil horizon: The format for this variable is a string with 8 characters (e.g., •••••••A - seven spaces and one letter). Accepted values are • A, • B, • C. This information drives the estimation of soil carbon losses. . If ASHZ is equal to B or C, the approach used in the estimation is driven by the soil order (SOLO).Set to A if unknown.",
      CGO2: "O2 concentration in gas phase (g m-3of soil air): This information is used when the new O2 ratio method is selected for the oxygen-depth function (IOX = 2 in the EPIC control file) or when the Izaurralde denitrification approach is selected (IDN > 2 in the EPIC control file).Set to 0 if unknown.(Range: 110 to 275) for more information see (R. C. Izaurralde et al., 2017)",
      CGCO2:
        "CO2 concentration in gas phase (g m-3of soil air): This information is used when the Izaurralde denitrification approach is selected (IDN > 2 in the EPIC control file).Set to 0 if unknown.(Range: 0.2 to 1.2) for more information see (R. C. Izaurralde et al., 2017)",
      CGN2O:
        "N2O concentration in gas phase (g m-3 of soil air): This information is used when the Izaurralde denitrification approach is selected. (IDN > 2 in the EPIC control file).Set to 0 if unknown.(Range: 0.004 to 0.01). for more information see (R. C. Izaurralde et al., 2017)",
    },
  },

  OPCForm: {
    headers: [
      // ["LUN", "IAUI"],
      [
        "JX(1)",
        "JX(2)",
        "JX(3)",
        "JX(4)",
        "JX(5)",
        "JX(6)",
        "JX(7)",
        "OPV1",
        "OPV2",
        "OPV3",
        "OPV4",
        "OPV5",
        "OPV6",
        "OPV7",
        "OPV8",
        "OPV9",
      ],
    ],
    descriptions: {
      LUN: "Land Use Number (cols. 1-4): This is the land use number from the NRCS Land Use Hydrology soil group table below (table 10). Refer to the column labeled Land Use Number in the table below. This number along with the hydrologic soil group is used to determine the curve number.(Range: 1 to 35).",
      IAUI: "Implement for auto irrigation (cols. 5-8): Select the implement used for automatic irrigation. The number refers to the implement/tillage table TILL___.DAT. If set to zero, the model will assign the default value of 500 and implement with ID number 500 in the TILL___.DAT will be used to apply automatic irrigation (center pivot by default).",
      "JX(1)":
        "Year of operation (cols. 1-3): Year in the rotation when the operation occurs. 1 = operation occurs in 1st year of the rotation 2 = operation occurs in 2nd year of the rotation … Nth year (Range: 1 to 100).",
      "JX(2)":
        "Month of operation (cols. 4-6): Month of the year when the operation occurs. (Range: 1 to 12).",
      "JX(3)":
        "Day of operation (cols. 7-9): Day of the month when the operation occurs. (Range: 1 to 31).",
      "JX(4)":
        "Equipment ID number used for the operation (cols. 10-14): Refers to the ID number that is given to each tillage operation or piece of equipment in TILLCOM.DAT file. (Range: 1 to 99999).",
      "JX(5)":
        "Tractor ID number used for the operation (cols. 15-19): Refers to the ID number given to each tractor in the TILLCOM.DAT file. It is used for economic purposes only and can be set to zero if economic analysis is not needed.(Range: 1 to 99999).",
      "JX(6)":
        "Crop ID number (cols. 20-24): Refers to the crop ID number given to each crop listed in CROPCOM.DAT file. (Range: 1 to 99999).",
      "JX(7)":
        "Different meanings depending on the type of operation set with JX(4) (cols. 25-29): Time from planting to maturity – XMTU(number of years). THIS APPLIES TO PLANTING OPERATION OF TREES ONLY. This refers to the time to reach complete maturity of the tree (full life of the tree). No potential heat units are entered for trees.Time from planting to harvest – LYR (number of years).FOR THE HARVEST OPERATION OF TREES ONLY (portion of full maturity).Pesticide ID number. FOR PESTICIDE APPLICATIONS ONLY. Refers to the ID number given to each pesticide in the PESTCOM.DAT file.Fertilizer ID number. FOR FERTILIZER APPLICATIONS ONLY. Refer to the ID number given to each fertilizer in the FERTCOM.DAT file.",
      OPV1: "Different meanings depending on the type of operation set with JX(4) (cols. 30-37): Potential heat units – PHU (°C). FOR PLANTING OPERATION ONLY. Total number of heat units (or growing degree days) needed to bring the plant from emergence to physiological maturity. Used in determining the growth curve. PHU is calculated using the base temperature of the crop.Application volume for irrigation (mm). FOR IRRIGATION OPERATION ONLY. It is the volume of water applied with the irrigation operation. Fertilizer application rate (kg ha-1) FOR FERTILIZATION ONLY. Amount of fertilizer applied with the fertilization. Set to zero for variable application rate (application rate will be estimated using PARM(28)).Pesticide application rate (g ha-1) FOR PESTICIDE APPLICATION ONLY. It is the amount of pesticide applied with the operation.Stocking rate for grazing (ha head-1) FOR START GRAZING ONLY. It is the number of hectares available to each grazer.",
      OPV2: "Different meanings depending on the type of operation set with JX(4) (cols. 38-45): Land use number – LUN. The land use number set previously will be overwritten if a positive value is provided here. Refer to table 10 for allowed values of land use number.Curve number – CN. A value of the SCS runoff curve number can be directly assigned if a negative value is provided here. Use the SCS hydrologic soil group-curve number table for reference.Pest control factor. FOR PESTICIDE APPLICATION ONLY. This is the fraction of pest population controlled by the pesticide application. It only applies to insects and diseases (not weeds). If the factor is set to 0.99, 99% of the pest will be killed by the pesticide.",
      OPV3: " Automatic irrigation trigger (cols. 46-53): If OPV3 is ≠ 0, the automatic irrigation trigger set previously will be changed. Several options are offered:OPV3 = 0.0 The previous trigger remains active.OPV3 > 0 and < 1.0 Automatic irrigation based on plant water stress factor. The dimension (1 – BIR) equals the fraction of plant water stress allowed. Low values allow higher plant water stress before applying automatic irrigation.OPV3 = 1.0 Does not allow water stress. According to other rules set in the model, irrigation water is applied with the intent to eliminate water stress.OPV3 < 0.0 Plant available water deficit in root zone. Number is in mm and must be negative.OPV3 > 1.0 Soil water tension in top 200 mm of the soil profile. Absolute number is in kilopascals.OPV3 = -999.0 Sets water deficit high enough that only manual irrigations will occur. Effectively turns auto irrigation off.",
      OPV4: "Runoff / irrigation ratio (vol./vol.) (cols. 54-61): It is the ratio between runoff volume and irrigation volume. Setting OPV4 greater than 0 will overwrite the value assigned to EFI in the EPIC control file (EPICCONT.DAT). The irrigation runoff ratio specifies the fraction of each irrigation application that is lost to runoff. Soluble nutrient loss through runoff applies. Changes in soil slope do not affect this amount dynamically.",
      OPV5: "Plant population (cols. 62-69): FOR PLANTING OPERATION ONLY. Unit is plants m-2 or plants ha-1if crop is a tree (in EPIC plant list file IHC = 7, 8, or 10). EPIC does not simulate tillering. In crops such as wheat and sugarcane which produce higher numbers of yielding tillers compared to the number of seeds or shoots planted, the plant population must be estimated based on the final yield producing tiller number.",
      OPV6: "Max annual nitrogen fertilizer applied to a crop (kg ha-1) (cols. 70-77): FOR PLANTING OPERATION ONLY. If OPV6 is set > 0, its value replaces the value of FMX set in the EPICCONT.DAT. FMX set a limit on the amount of fertilizer that could be applied on an annual basis regardless of the number of crops grown within a year. This is especially important when automatically applying fertilizer.",
      OPV7: "Time of operation as fraction of growing season (cols. 78-85): This is also referred to as heat unit scheduling. Heat unit scheduling can be used to schedule operations at a particular stage of growth. For example, irrigation could be scheduled at 0.25, 0.5, and 0.75 which might represent different stages of crop growth. In this case, irrigation would be applied at 25%, 50%, and 75% of the potential heat units set at planting.When setting up an operation using heat unit scheduling it is best to enter earliest possible month and day (JX2 and JX3) that the operation could occur on because, for the operation to occur, the date of the operation as well as the number of heat units scheduled must be met. This is recommended because of the process followed by APEX: first the program checks if the date of the operation has been met; then it checks if the fraction of heat units has been met. See table 11 for more details.Heat unit scheduling can also be used to adjust operations to the weather (temperatures) from year to year. If heat units are not scheduled (set to 0), operations will occur on the date set in the operation schedule and the operation will occur on the same date every year the crop is grown in the simulated rotation.Heat unit scheduling operations which occur from planting to harvest are based on the heat units set at planting. Operations which occur before planting are based on the total annual heat units which are calculated by the model.For some grain crops an in-field dry-down period is allowed. It is expressed as a fraction of the total heat units set at planting. In most cases the dry-down period is 10% to 15% of the total heat units. If a dry-down period is required, heat unit schedule the harvest operation to occur at 1.10, 1.15 or another appropriate fraction.In the case of forage harvesting, the forage is actually harvested well before the crop reaches full maturity. In this case heat unit schedule the forage harvest to 0.55 or another appropriate fraction.",
      OPV8: "Minimum USLE C-Factor (cols. 86-93): It sets the minimum C factor value used in the estimation of soil erosion. If set to a value greater than zero, it will replace Minimum USLE C-Factor (cols. 86-93)It sets the minimum C factor value used in the estimation of soil erosion. If set to a value greater than zero, it will replace.",
      OPV9: "Moisture content of grain requested for harvest (cols. 94-101): It sets the fraction of the grain moisture content to allow harvest operation. Harvest will occur only when the grain moisture content is lower than OPV9.",
    },
  },

  TILLCOM: {
    // index: 2, // Starting index for EPICRUN

    headers: [
      [
        "J2", // ID or another variable as per your data file
        "TIL", // Tillage equipment name or type
        "PCD", // Power Code
        // "PCD(cont.)", // Power Code continuation if needed
        "PRIC", // Purchase Price
        "XLP", // Initial List Price
        "HRY", // Annual Use (hours)
        "HRL", // Life of Equipment (hours)
        "PWR", // Power (HP or kW)
        "WDT", // Width of Pass (m)
        "SPD", // Operating Speed (km/h)
        "RC1", // Repair Cost Coefficient 1
        "RC2", // Repair Cost Coefficient 2
        "XLB", // Lubricant Factor
        "FCM", // Fuel Consumption Multiplier
        "RFV1", // Remaining Farm Value Parameter 1
        "RFV2", // Remaining Farm Value Parameter 2
        "EFM", // Machine Efficiency
        "RTI", // Real-Time Index or related metric
        "EMX", // Efficiency Maximum
        "RR", // Real Interest Rate
        "TLD", // Till Depth
        "RHT", // Residual Height
        "RIN", // Residual Inflow
        "DKH", // Depth of Knife Cut
        "DKI", // Depth Knife Index
        "IHC", // Implement Hydraulic Coefficient
        // "IHC(cont.)", // Implement Hydraulic Coefficient
        "HE", // Hydraulic Efficiency
        "ORHI", // Operational Residual Hydraulic Index
        "FRCP", // Farm Real Cost Percentage
        "FPOP", // Farm Power Output Percentage
        "TCEM",
      ],
    ],
    descriptions: {
      J2: "Machine or equipment ID (cols. 2-5): Unique number to identify the machine or equipment. This number is used in the EPIC management file (JX(4), or JX(5) for tractor, in OPSCCOM.DAT) to identify the operation that must be simulated or the tractor used for that operation. (Range: 1 to 9999).",
      TIL: "Machine or equipment name (cols. 7-14): Abbreviation of the name of the machine or equipment.",
      PCD: "Power code (cols. 16-19): Used to identify the machine or equipment. Allowed options: POWE (powered machine), SELF (self-operating machine), NON (non-powered machine), IRRI (irrigation equipment), CUST (customized equipment).",
      // "PCD(cont.)":
      //   "Power Code continuation: Additional options include IRRI (irrigation equipment) or CUST (customized).",
      PRIC: "Purchase price ($) (cols. 20-27): Amount of money the equipment was purchased for. To estimate, subtract 10% from the initial list price. Used only for economic analysis. (Range: 0 to 999999).",
      XLP: "Initial list price in current ($) (cols. 28-35): The price of the equipment when new. Used for economic analysis. (Range: 0 to 999999).",
      HRY: "Annual use (h) (cols. 36-43): Time per year the equipment is used. Used only for economic analysis. (Range: 0 to 8760).",
      HRL: "Life of equipment (h) (cols. 44-51): The amount of time the equipment is operational. Used only for economic analysis. (Range: 0 to 999999).",
      PWR: "Power of unit (KW) (cols. 52-59): The horsepower or kilowatts of the equipment. (Range: 0 to 900).",
      WDT: "Width of pass (m) (cols. 60-67): The width the equipment covers when moved across the land. (Range: 0 to 50).",
      SPD: "Operating speed (km/h) (cols. 68-75): Speed at which the equipment is operated. (Range: 0 to 200).",
      RC1: "Repair cost coefficient 1 (cols. 76-83): Value from the American Society of Agricultural Engineers Standards Engineering Practices Data handbook. (Range: 0 to 1).",
      RC2: "Repair cost coefficient 2 (cols. 84-91): Value from the American Society of Agricultural Engineers Standards Engineering Practices Data handbook. (Range: 0 to 5).",
      XLB: "Lubricant factor (cols. 92-99): Value from the American Society of Agricultural Engineers Standards Engineering Practices Data handbook. (Range: 0 to 1).",
      FCM: "Fuel consumption multiplier (cols. 100-107): Value from the American Society of Agricultural Engineers Standards Engineering Practices Data handbook. (Range: 0 to 1).",
      RFV1: "Remaining farm value parameter 1 (cols. 108-115): Value from the American Society of Agricultural Engineers Standards Engineering Practices Data handbook. (Range: 0 to 2).",
      RFV2: "Remaining farm value parameter 2 (cols. 116-123): Value from the American Society of Agricultural Engineers Standards Engineering Practices Data handbook. (Range: 0 to 2).",
      EFM: "Machine efficiency (cols. 124-131): The fraction of efficiency loss due to overlap in passes. Used for irrigation system efficiency as well. (Range: 0 to 1).",
      RTI: "Annual real interest rate ($/$) (cols. 132-139): Difference between nominal interest rate and inflation rate. (Range: 0.001 to 0.15).",
      EMX: "Mixing efficiency (cols. 140-147): Fraction of materials mixed uniformly in the plow depth. (Range: 0 to 0.99).",
      RR: "Random surface roughness (cols. 148-155): Describes soil surface roughness after tillage. (Range: 0 to 100).",
      TLD: "Tillage depth (cols. 156-163): Depth of tillage (positive for below surface, negative for above). (Range: -2000 to 2000).",
      RHT: "Ridge height (cols. 164-171): Height of the ridge created by the implement. (Range: 0 to 1000).",
      RIN: "Ridge interval (cols. 172-179): Distance between ridges or row spacing. (Range: 0 to 200).",
      DKH: "Height of furrow dikes (cols. 180-187): Affects the amount of water furrow dikes can store. (Range: 0 to 1000).",
      DKI: "Distance between furrow dikes (cols. 188-195): (Range: 0 to 200).",
      IHC: "Operation code (cols. 196-203): Identifies the type of operation or implement. (Various accepted values for plowing, harvesting, irrigation, etc.).",
      // "IHC(cont.)":
      //   "13 Drying 14 Burn 15 Puddle (used for paddy-rice simulation) 16 Destroy puddle (used for paddy-rice simulation) 17 Builds furrow dikes 18 Destroy furrow dikes 19 Start grazing 20 Stop grazing 21 Auto mow 22 Plastic cover 23 Remove plastic cover 24 Stop drainage system flow 25 Resume drainage system flow",
      HE: "Harvest efficiency or pesticide application efficiency (cols. 204-211): Fraction of crop yield or pesticide that is used effectively. (Range: 0 to 1).",
      ORHI: "Override harvest index for forage and root crops (cols. 212-219): Ratio of economic or harvestable yield to total biomass. (Range: 0 to 1).",
      FRCP: "Fraction of soil compacted (cols. 220-227): Calculated as tire width/tillage width. Experimental and not activated in simulation. (Range: 0 to 1).",
      FPOP: "Fraction of plant population reduced by operation (cols. 228-235): Correction to the seeded rate based on thinning or tillage operations. (Range: 0 to 1).",
      TCEM: "Carbon emission (kg/ha) (cols. 236-243): Carbon emitted from equipment use. (Range: 0 to 9999).",
    },
    // forLoopEndpoint: 3, // Optional limit for the for loop, 0 means no limit
  },
  WINDUSEL: {
    headers: [["II", "OPSCFILE", "Y", "X", "ELEX"]],
    descriptions: {
      II: "Wind data file ID. Unique number to identify the wind data file. This number is used in EPICRUN.DAT file to select the daily weather file used in each simulation (IWND).",
      OPSCFILE:
        "Wind data file name. Name of the wind data file (including the extension of the file) or path + name of the wind data file (including the extension). When using the name of the wind data, the file must be in the same folder of the EPIC executable. When using the path + file name, no spaces can be included in the path.",
      Y: "Latitude (decimal degrees). Latitude of the wind station where the wind data was recorded. If a value for IWND is not provided in the EPICRUN, the latitude of the wind stations is used to find the closest wind station considering the information provided in the site file (YLAT, XLOG, and ELEV). Latitudes in the Southern Hemisphere are in negative degrees and positive in the Northern Hemisphere. The automated identification of the weather station based on coordinates and elevation is affected by PARM(79). (Range: -90 to 90)",
      X: "Longitude (decimal degrees). Longitude of the wind station where the wind data was recorded. If a value for IWND is not provided in the EPICRUN, the longitude of the wind stations is used to find the closest wind station considering the information provided in the site file (YLAT, XLOG, and ELEV). The automated identification of the wind station based on coordinates and elevation is affected by PARM(79). (Range: -180 to 180)",
      ELEX: "Elevation (meters). Elevation of the wind station where the wind data was recorded. If a value for IWND is not provided in the EPICRUN, the elevation of the wind station is used to find the closest wind station considering the information provided in the site file (YLAT, XLOG, and ELEV). The automated identification of the wind station based on coordinates and elevation is affected by PARM(79). (Range: -200 to 8000)",
    },
  },
  WPM1USEL: {
    headers: [["II", "OPSCFILE", "Y", "X", "ELEX"]],
    descriptions: {
      II: "Monthly weather statistics file ID. Unique number to identify the monthly weather statistics file. This number is used in EPICRUN.DAT file to select the daily weather file used in each simulation (IWP1).",
      OPSCFILE:
        "Monthly weather statistics file name. Name of the monthly weather statistics file (including the extension of the file) or path + name of the management file (including the extension). When using the name of the monthly weather statistics file, the file must be in the same folder of the EPIC executable. When using the path + file name, no spaces can be included in the path.",
      Y: "Latitude (decimal degrees). Latitude of the weather station where the weather data was recorded. If a value for IWP1 is not provided in the EPICRUN, the latitude of the weather stations is used to find the closest weather station considering the information provided in the site file (YLAT, XLOG, and ELEV). Latitudes in the Southern Hemisphere are in negative degrees and positive in the Northern Hemisphere. The automated identification of the weather station based on coordinates and elevation is affected by PARM(79). (Range: -90 to 90)",
      X: "Longitude (decimal degrees). Longitude of the weather station where the weather data was recorded. If a value for IWP1 is not provided in the EPICRUN, the longitude of the weather stations is used to find the closest weather station considering the information provided in the site file (YLAT, XLOG, and ELEV). The automated identification of the weather station based on coordinates and elevation is affected by PARM(79). (Range: -180 to 180)",
      ELEX: "Elevation (meters). Elevation of the weather station where the weather data was recorded. If a value for IWP1 is not provided in the EPICRUN, the elevation of the weather station is used to find the closest weather station considering the information provided in the site file (YLAT, XLOG, and ELEV). The automated identification of the weather station based on coordinates and elevation is affected by PARM(79). (Range: -200 to 8000)",
    },
  },
  CROPCOM: {
    // index: 2, // Starting index for EPICRUN

    headers: [
      [
        "J2", // Equipment or machine ID
        "CPNM", // Crop name or identifier
        "WA", // Water availability
        "HI", // Harvest Index
        "TOP", // Top growth biomass
        "TBS", // Total biomass at harvest
        "DMLA", // Days to maximum LAI
        "DLAI", // Days to maximum LAI after planting
        "DLAP1", // Duration LAI phase 1
        "DLAP2", // Duration LAI phase 2
        "RLAD", // Ratio of leaf area decline
        "RBMD", // Ratio of biomass decline
        "ALT", // Altitude
        "GSI", // Growth stage index
        "CAF", // Crop adjustment factor
        "SDW", // Soil drainage weight
        "HMX", // Maximum height
        "RDMX", // Root depth max
        "WAC2", // Water uptake coefficient
        "CNY", // Critical nitrogen concentration in yield
        "CPY", // Critical phosphorus concentration in yield
        "CKY", // Critical potassium concentration in yield
        "WSYF", // Water stress yield factor
        "PST", // Pest scaling factor
        "COSD", // Coefficient of seed dormancy
        "PRYG", // Protein yield gain
        "PRYF", // Protein yield factor
        "WCY", // Water concentration yield
        "BN1", // Biomass N content factor 1
        "BN2", // Biomass N content factor 2
        "BN3", // Biomass N content factor 3
        "BP1", // Biomass P content factor 1
        "BP2", // Biomass P content factor 2
        "BP3", // Biomass P content factor 3
        "BK1", // Biomass K content factor 1
        "BK2", // Biomass K content factor 2
        "BK3", // Biomass K content factor 3
        "BW1", // Biomass weight factor 1
        "BW2", // Biomass weight factor 2
        "BW3", // Biomass weight factor 3
        "IDC", // Index of crop category
        "FRST1", // Fraction of residue/straw yield
        "FRST2", // Fraction of residue/straw yield 2
        "WAVP", // Water available for plants
        "VPTH", // Vapor pressure threshold
        "VPD2", // Vapor pressure deficit 2
        "RWPC1", // Rainfall water potential coefficient 1
        "RWPC2", // Rainfall water potential coefficient 2
        "GMHU", // Growth degree units
        "PPLP1", // Plant population 1
        "PPLP2", // Plant population 2
        "STX1", // Stress tolerance index 1
        "STX2", // Stress tolerance index 2
        "BLG1", // Biomass loss factor 1
        "BLG2", // Biomass loss factor 2
        "WUB", // Water use efficiency
        "FTO", // Fertilizer type option
        "FLT", // Fertilizer loss threshold
        "CCEM", // Carbon content in emitted materials
        "FLSL", // Fertilizer soluble loss
      ],
    ],
    descriptions: {
      J2: "Plant ID (cols. 2-5): Unique number to identify the plant. This number is used in the EPIC management file (JX(6) in OPSCCOM.DAT) to identify the plant(s) that must be simulated.",
      CPNM: "Plant name (cols. 7-10): Short name of the plant. This will be used to represent the plant(s) in several output files.",
      WA: "Biomass-Energy ratio (cols. 11-18): Also known as radiation use efficiency, it is the potential (unstressed) growth rate (including roots) per unit of intercepted photosynthetically active radiation. Values reported here are for atmospheric CO2 concentration of 330 ppm. This parameter should be one of the last to be adjusted. Adjustments should be based on research results. This parameter can greatly change the rate of growth, incidence of stress during the season and the resultant yield. Care should be taken to make adjustments in the parameter only based on data with no drought, nutrient or temperature stress. (Range: 0.01 to 90)",
      HI: "Harvest index (cols. 19-26): The harvest index is the ratio of economic or harvestable yield to the total biomass of the plant. This plant parameter should be based on experimental data where plant stresses have been minimized to allow the plant to attain its potential. HI input here is the maximum harvest index that could possibly be attained under nonstress conditions. The actual HI is adjusted during the simulation based on stress and phenological development. This variable only pertains to grain and cotton crops. For forage and root crops, the Override Harvest Index (ORHI) should be set in the TILLCOM.DAT file for the harvest equipment used to harvest the crop. (Range: 0.01 to 1.0)",
      TOPC: "Optimal temperature for plant growth (°C) (cols. 27-34): This indicates the optimum temperature at which the plant will grow without being physiologically damaged by high or low temperatures. This value is very stable for cultivars within a species and should not be changed once determined for a species. Varietal or maturity type differences are accounted for by different sums of thermal units. (Range: 0.0 to 40.0)",
      TBSC: "Minimum temperature for plant growth (°C) (cols. 35-42): This indicates the minimum (base) temperature at which the crop will grow without being physiologically damaged by cold. This value is very stable for cultivars within a species and should not be changed once determined for a species. Varietal or maturity type differences are accounted for by different sums of thermal units. (Range: 0.0 to 25.0)",
      DMLA: "Maximum potential leaf area index (cols. 43-50): Leaf area index refers to the ratio of the surface area of the leaves (one side only) of the plant to the area of the ground covered by the plants. This parameter refers to the greatest leaf area index that the plant is able to attain. The DMLA is based on the highest expected plant densities for plants not expected to have water stress. DMLA is internally adjusted for drought-prone regions as planting densities are much smaller in these areas unless irrigation is used. (Range: 0.1 to 20.0)",
      DLAI: "Fraction of growing season when leaf area declines (cols. 51-58): Point in the growing season (expressed as a fraction of heat units required for maturation) when the leaf area index begins to decrease due to leaf senescence. The fraction of the growing season in heat units is divided by the total heat units accumulated between planting and crop maturity. (Range: 0.01 to 1.0)",
      DLAP1:
        "First point on optimal leaf area development curve (cols. 59-66): This is the first of two points on the optimal (not stressed) leaf area development curve. Numbers before decimal are % of growing season. Numbers after decimal are fractions of maximum potential LAI. For example, 15.01 states that at 15% of the growing season, 1% of the LAI has developed. See Figure 17 for an example on how DLAP(1) works.",
      DLAP2:
        "Second point on optimal leaf area development curve (cols. 67-74): This is the second of two points on optimal (not stressed) leaf area development curve. Numbers before decimal are % of growing season. Numbers after decimal are fractions of maximum potential LAI. For example, 50.95 states that at 50% of the growing season, 95% of the LAI has developed. See Figure 17 for an example on how DLAP(2) works.",
      RLAD: "Leaf area index decline rate parameter (cols. 75-82): In several plants, leaf area declines due to leaf senescence as the plant approaches physiological maturity. In most cases, leaf senescence begins with yellowing of the older (lower) leaves and proceeds upward until, in crops like corn, wheat, and soybeans, all leaves senesce and the plant dies. In many grain crops, leaf area index declines linearly with time after grain filling begins. Nutrients and carbohydrates in the senescing leaves are often translocated into the grain. In EPIC the plant parameter DLAI (described above) controls the point in the growing season when leaf area begins to decline. The plant parameter RLAD controls the rate of decline. If RLAD is set to 1.0, the rate of decline is linear. If RLAD < 1.0, the rate of decline is initially slow, then increases until all leaves are dead at maturity. If RLAD > 1.0, the rate of senescence is initially rapid, then slows as maturity approaches. In all cases, EPIC assumes that leaf area begins to decline when the fraction of the growing season equals DLAI, and the leaf area index approaches zero at maturity. (Range: 0 to 10)",
      RBMD: "Biomass-energy ratio decline rate parameter (cols. 83-90): This variable sets the biomass-energy (WA) decline rate during the growing season. This crop parameter functions like the RLAD above. It reduces the efficiency of conversion of intercepted photosynthetically active radiation to biomass due to production of high energy products like seeds and/or translocation of N from leaves to seeds. In most crops, this rate is relatively constant during the vegetative stage of growth, when structural carbohydrates like cellulose are the principal products of growth. However, when grain crops begin to form seeds, the conversion of intercepted solar radiation into biomass begins to decline. That is, less dry matter is formed for each unit of absorbed solar radiation. In addition, as leaf area yellows and begins to senesce, the conversion efficiency declines still more. EPIC uses the crop parameter RBMD to reduce the rate of conversion of intercepted solar radiation to biomass as the crop approaches maturity (when the fraction of the growing season is greater than DLAI). Computationally, RBMD reduces WA like RLAD reduces leaf area index. (Range: 1 to 10)",
      ALT: "Aluminum tolerance index (cols. 91-98): Index of plant tolerance to aluminum saturation. (Range: 1 (sensitive) to 5 (tolerant))",
      GSI: "Maximum Stomatal Conductance (m s-1) (cols. 99-106): The crop parameter GSI is the maximum stomatal conductance at high solar radiation and low vapor pressure deficit. Korner et al. (1979) reported maximum stomatal conductance values for 246 species and cultivars.",
      CAF: "Critical aeration factor (cols. 107-114): Fraction of soil porosity where poor aeration starts limiting plant growth. This is set at 0.85 for most crops, with rice being the major exception with a value of 1.0. (Range: 0.1 to 1.0)",
      SDW: "Seed weight (kg ha-1) (cols. 115-122): The seed weight affects the starting crop biomass. A portion of the seed weight is allocated to the initial biomass. This is also used for transplanted crops.",
      HMX: "Maximum crop height (m) (cols. 123-130): The greatest potential height the crop will reach.",
      RDMX: "Maximum root depth (m) (cols. 131-138): The greatest depth to which the rooting system will penetrate. This affects soil moisture extraction.",
      WAC2: "CO2 Concentration / Resulting WA value (cols. 139-146): This is a split variable. In EPIC, radiation use efficiency is sensitive to atmospheric CO2 concentration. WAC2 is an 'S' curve parameter used to describe the effect of CO2 concentration on the crop parameter WA. The value on the left of the decimal is a value of CO2 concentration higher than ambient (i.e., 450 or 660 ul l-1). The value on the right of the decimal is the corresponding value of WA. This elevated value of WA can be estimated from experimental data on short-term crop growth at elevated CO2 levels. Calculate the ratio of crop growth rate at elevated CO2 to crop growth at approximately 330 ul l-1 CO2. Multiply that ratio by the value of WA at 330 ul l-1 to obtain the value on the right of the decimal. Typical values of the ratio for C4 plants are 1.1 to 1.2; 1.15 is used in CROPCOM.DAT for plants with the C4 photosynthetic pathway. Typical values of the ratio for C3 plants are 1.3 to 1.4; 1.35 is used in CROPCOM.DAT for these types of plants. (Kimball, 1983)",
      CNY: "Fraction of nitrogen in yield (kg kg-1) (cols. 147-154): This is the fraction of nitrogen in the yield compared to the entire plant and affects the amount of nitrogen removed from the field through the harvesting of the crop. This was estimated from Morrison's Feeds and Feeding and other data sources of plant nutrition. The percentage N in Morrison was adjusted to a dry weight by dividing by the fraction of dry matter to total yield. (Range: 0.0 to 1.0)",
      CPY: "Fraction of phosphorus in yield (kg kg-1) (cols. 155-162): This is the fraction of phosphorus in the yield compared to the entire plant and affects the amount of phosphorus removed from the field through the harvesting of the crop. Estimated by the same procedure as CNY above. (Range: 0.0 to 1.0)",
      CKY: "Fraction of potassium in yield (kg kg-1) (cols. 163-170): This is the fraction of potassium in the yield compared to the entire plant and affects the amount of potassium removed from the field through the harvesting of the crop. Estimated by the same procedure as CNY above. (Range: 0.0 to 1.0)",
      WYSF: "Lower limit of harvest index (cols. 171-178): Fraction between 0 and HI values that represents the lowest harvest index expected due to water stress. (Range: 0 to 1)",
      PST: "Pest (insects and disease) factor (cols. 179-186): Fraction of yield remaining after damage. Usually set at 0.60. EPIC has an adjustment process that is a function of moisture, temperature, and residue. This presently is a reasonable estimate, but future versions may include more detailed procedures. You may wish to adjust the parameter in geographic areas known to have large amounts of damage from pests. (Range: 0 to 1)",
      CSTS: "Seed cost ($ kg-1) (cols. 187-194): Cost of seed is used for economic analyses only.",
      PRYG: "Price for grain yield ($ t-1) (cols. 195-202): Price for grain yield is used for economic analyses only.",
      PRYF: "Price for forage yield ($ t-1) (cols. 203-210): Price for forage yield is used for economic analyses only.",
      WCY: "Fraction water in yield (cols. 211-218): The amount of water present in the yield at the time of harvest. The yields of most grain crops are reported at a standard grain water content; however, for some applications, grain dry weight is appropriate (WCY = 0). EPIC yield output is dry weight. (Range: 0.0 to 1.0)",
      BN1: "Fraction on nitrogen in plant at emergence (cols. 219-226): Normal fraction of N in plant biomass at emergence. This parameter is based on research results published in the literature for each (or similar) plant.",
      BN2: "Fraction on nitrogen in plant at 0.5 maturity (cols. 227-234): Normal fraction of N in plant biomass at mid growing season. This parameter is based on research results published in the literature for each (or similar) plant.",
      BN3: "Fraction on nitrogen in plant at maturity (cols. 235-242): Normal fraction of N in plant biomass at maturity. This parameter is based on research results published in the literature for each (or similar) plant.",
      BP1: "Fraction on phosphorus in plant at emergence (cols. 243-250): Normal fraction of P in plant biomass at emergence. This parameter is based on research results published in the literature for each (or similar) plant.",
      BP2: "Fraction on phosphorus in plant at 0.5 maturity (cols. 251-258): Normal fraction of P in plant biomass at mid growing season. This parameter is based on research results published in the literature for each (or similar) plant.",
      BP3: "Fraction on phosphorus in plant at maturity (cols. 259-266): Normal fraction of P in plant biomass at maturity. This parameter is based on research results published in the literature for each (or similar) plant.",
      BK1: "Fraction on potassium in plant at emergence (cols. 267-274): Normal fraction of K in plant biomass at emergence. This parameter is based on research results published in the literature for each (or similar) plant.",
      BK2: "Fraction on potassium in plant at 0.5 maturity (cols. 275-282): Normal fraction of K in plant biomass at mid growing season. This parameter is based on research results published in the literature for each (or similar) plant.",
      BK3: "Fraction on potassium in plant at maturity (cols. 283-290): Normal fraction of K in plant biomass at maturity. This parameter is based on research results published in the literature for each (or similar) plant.",
      BW1: "Wind erosion factor for standing live biomass (cols. 291-298): Based on the Manhattan wind erosion equations for each (or similar) plant.",
      BW2: "Wind erosion factor for standing dead biomass (cols. 299-306): Based on the Manhattan wind erosion equations for each (or similar) plant.",
      BW3: "Wind erosion factor for flat residue (cols. 307-314): Based on the Manhattan wind erosion equations for each (or similar) plant.",
      IDC: "Crop category ID number (cols. 315-322): This ID number is used internally to identify the type of crop simulated by the model. Crop categories are: 1. Warm season annual legume, 2. Cold season annual legume, 3. Perennial legume, 4. Warm season annual, 5. Cold season annual, 6. Perennial, 7. Evergreen tree, 8. Deciduous tree, 9. Cotton, 10. Leguminous tree.",
      FRST1:
        "First point on frost damage curve (cols. 323-330): The first of two points on the frost damage curve. Numbers before the decimal point are the minimum temperatures (°C) and numbers after the decimal point are the fraction of biomass lost each day the specified minimum temperature occurs. NOTE: 10.20 means 20 percent of the biomass is lost each day a temperature of -10 °C is reached. The negative sign on degrees is added by EPIC since no frost damage is assumed to occur above 0 °C. These two parameters should be based on a combination of research results and observation. Precise data for field application is subject to microclimate variation across the landscape. Current parameters are reasonable estimates; however, they are more likely to understate frost damage than to overstate frost damage.",
      FRST2:
        "Second point on frost damage curve (cols. 331-338): Second of two points on the frost damage curve. Numbers before the decimal point are the minimum temperatures (°C) and numbers after the decimal point are the fraction of biomass lost each day the specified minimum temperature occurs.",
      WAVP: "Parameter relating vapor pressure deficit to WA (cols. 339-346): In EPIC, radiation use efficiency (WA) is sensitive to vapor pressure deficit (VPD). As VPD increases, WA decreases. The crop parameter WAVP is the rate of the decline in WA per unit increase in VPD. The value of WAVP varies among species, but a value of 6 to 8 is suggested as an approximation for most crops.",
      VPTH: "Threshold VPD (kPa) (cols. 347-354): In EPIC, leaf conductance is to VPD until VPD (calculated hourly) exceeds the threshold value, VPTH (usually 0.5 to 1.0 kPa).",
      VPD2: "VPD value (kPa) (cols. 355-362): In EPIC, leaf conductance declines linearly as VPD increases above VPTH. VPD2 is a double parameter in which the number on the left of the decimal point is some value of VPD above VPTH (e.g., 4.0), and the number on the right of the decimal point is the corresponding fraction of the maximum leaf conductance at the value of VPD (e.g., 0.7).",
      RWPC1:
        "Fraction of root weight at emergence (cols. 363-370): This is one of the partitioning parameters to split biomass between above ground and roots. RWPC(1) is the partitioning fraction at emergence and RWPC(2) is partitioning fraction at maturity. Between those two points there is a linear interpolation of the partitioning fraction relative to accumulative heat units. (Range: 0.0 to 1.0)",
      RWPC2:
        "Fraction of root weight at maturity (cols. 371-378): This is one of the partitioning parameters to split biomass between above ground and roots. RWPC(1) is the partitioning fraction at emergence and RWPC(2) is partitioning fraction at maturity. Between those two points there is a linear interpolation of the partitioning fraction relative to accumulative heat units. (Range: 0.0 to 1.0)",
      GMHU: "Heat units required for germination (°C) (cols. 379-386): This is the amount of thermal units required by the seed to germinate. This delays germination from the planting date or the date at which the temperature of soil layer 2 exceeds TBSC. (Range: 0.0 to 500)",
      PPLP1:
        "Plant Population – Leaf area index curve (cols. 387-394): First of two points on population curve. Plant Population for crops, grass etc., except trees or plants requiring more than 1 m² per plant. The number to the left of the decimal is the number of plants (plants m-²) and the number to the right is the fraction of maximum leaf area at that population. NOTE: if the crop is trees, the population is expressed as plants per hectare and the second plant population point is placed in the PPLP(1) position and the first point placed in the PPLP(2) position. Consequently, in the case of trees the first point should be the higher population. If entering plants m-² then PPLP(1) < PPLP(2) If entering plants ha-¹ then PPLP(1) > PPLP(2)",
      PPLP2:
        "Plant Population – Leaf area index curve (cols. 395-402): Second of two points on population curve. The number to the left of the decimal is the number of plants (plants m-²) and the number to the right is the fraction of maximum leaf area at that population. NOTE: if the crop is trees, the population is expressed as plants per hectare and the second plant population point is placed in the PPLP(1) position and the first point placed in the PPLP(2) position. Consequently, in the case of trees the first point should be the higher population. If entering plants m-² then PPLP(1) < PPLP(2) If entering plants ha-¹ then PPLP(1) > PPLP(2). For example, corn can have PPLP(1) = 30.43 and PPLP(2) = 50.71. This means at 30 plants m-² 43% of maximum leaf area can be attained. This is also the 1st point on the population curve. PPLP(2) means at 50 plants m-² 71% of maximum leaf area can be attained. This is the 2nd point on population curve for corn production. Since PPLP(1) is less than PPLP(2), it shows the population density of a crop other than trees. However, for pine tree, PPLP(1) = 1000.95 and PPLP(2) = 100.10. While the numbers before and after decimal have the same explanations as given for corn, it indicates the population density is for a tree (hence in plants ha-¹) because here PPLP(1) is greater than PPLP(2).",
      STX1: "Salinity effect on yield ((t ha-1)/(mmho cm-1)) (cols. 403-410): This is the yield decrease per increase in salinity.",
      STX2: "Salinity threshold (mmho/cm) (cols. 411-418): The threshold points at which any increase in salinity will cause a decrease in yield.",
      BLG1: "Lignin fraction in plant at 0.5 maturity (cols. 419-426): Fraction of lignin when the plant reaches 0.5 maturity.",
      BLG2: "Lignin fraction in plant at full maturity (cols. 427-434): Fraction of lignin when the plant reaches full maturity.",
      WUB: "Water use conversion to biomass (t/mm) (cols. 435-442): The amount of biomass produced per unit of water used by the plant. This value is used if the experimental water use – biomass conversion method is selected in the EPPICCONT file (ICG > 0).",
      FTO: "Fraction turnout for cotton (cols. 443-450) OR Leaf fall for deciduous trees: The fraction of lint present in the total plant material (lint + seed + trash (leaf and stem particles)) harvested. This value is higher for cotton which is picked compared to stripped because less trash is collected along with the lint and seed as it is harvested. A typical value for picker cotton is 0.38 and 0.27 for stripper cotton. This variable is valid only for cotton and the yield is reported in the field of grain yield (YLDG). In the calculation, FTO is used as: YLDG=YLDG+FTO*YY Where YY is the yield calculated as for any other crop considering the standing live biomass, the harvest index, the harvest efficiency, and pest damage. Turnout fraction = (lint weight / (seed weight + lint weight + trash weight)).For DECIDUOUS TREES, FTO represents the percent of biomass lost to leaf fall. Usually set FTO to 0.05 for deciduous trees.(Range: 0.01 to 0.90)",
      FLT: "Fraction lint for cotton (cols. 451-458): The fraction of lint present in the total seed cotton (seed + lint) harvested. This variable differs from FTO in that trash is not included in the total harvested weight. Lint fraction cannot be less than turnout fraction. This variable is valid only for cotton and the yield is reported in the field of forage yield (YLDF). In the calculation, FTL is used as: YLDF=YLDF+YLDG*(1.0/FLT-1.0) Where YLDG is the yield calculated as described for FTO. Lint fraction = (lint weight / (seed weight + lint weight)) (Range: 0.01 to 1.00)",
      CCEM: "Carbon emission for seeding (kg kg-1) (cols. 459-466):",
      FLSL: "Leaf weight at DLAI (fraction) (cols. 467-474): It is the ratio between the weight of leaves and the weight of standing live biomass. (Range: 0.01 to 1.00)",
    },
  },

  FERT2012: {
    // index: 2, // Starting index for EPICRUN

    headers: [
      [
        "ID", // Fertilizer ID (cols. 2-5)
        "FTNM", // Fertilizer name (cols. 7-10)
        "FN", // Mineral N fraction (cols. 15-22)
        "FP", // Mineral P fraction (cols. 23-30)
        "FK", // Mineral K fraction (cols. 31-38)
        "FNO", // Organic N fraction (cols. 39-46)
        "FPO", // Organic P fraction (cols. 47-54)
        "FNH3", // Ammonia-N fraction (cols. 55-62)
        "FOC", // Organic carbon content (cols. 63-70)
        "FSLT", // Salt content (cols. 71-78)
        "FCST", // Cost of fertilizer (cols. 79-86)
      ],
    ],

    descriptions: {
      ID: "Fertilizer ID. Unique number to identify the fertilizer. This number is used in the EPIC management file to identify the fertilizer(s) that must be simulated.",
      FTNM: "Fertilizer name. A descriptive name that usually includes the N-P-K analysis or the type of manure.",
      FN: "Mineral N fraction. Fraction of mineral nitrogen in the bulk fertilizer. (Range: 0.0 to 1.0)",
      FP: "Mineral P fraction. Fraction of mineral phosphorus in the bulk fertilizer. This is the fraction of elemental phosphorus, not P2O5. To convert fraction of P2O5 to elemental phosphorus, multiply by 0.4366. (Range: 0.0 to 1.0)",
      FK: "Mineral K fraction. Fraction of mineral potassium in the bulk fertilizer. This is the fraction of elemental potassium, not K2O. To convert fraction of K2O to elemental potassium, multiply by 0.8301. (Range: 0.0 to 1.0)",
      FNO: "Organic N fraction. This applies to organic fertilizers such as manures. This number must be obtained from an analysis test of the product. The amount is reported as a fraction. (Range: 0.0 to 1.0)",
      FPO: "Organic P fraction. This applies to organic fertilizers such as manures. This number must be obtained from an analysis test of the product. The amount is reported as a fraction. (Range: 0.0 to 1.0)",
      FNH3: "Ammonia N fraction (FMH3/FN). The fraction of mineral nitrogen in the fertilizer that is in the ammonium (NH4) form. (Range: 0.0 to 1.0)",
      FOC: "Organic C fraction. Organic carbon = organic matter / 1.72. (Range: 0.0 to 1.0)",
      FSLT: "Salt fraction. Amount of salt in fertilizer. (Range: 0.0 to 1.0)",
      FCST: "Cost of fertilizer. Used for economic analyses only.",
    },
  },

  PESTCOM: {
    // index: 2, // Starting index for EPICRUN

    headers: [
      [
        "J1", // Chemical ID (cols. 1-5)
        "PSTN", // Chemical Name (cols. 7-12)
        "PSOL", // Solubility in water (cols. 13-20)
        "PHLS", // Half-life in soil (cols. 21-28)
        "PHLF", // Half-life in foliage (cols. 29-36)
        "PWOF", // Water-oil partition coefficient (cols. 37-44)
        "PKOC", // Organic carbon partition coefficient (cols. 45-52)
        "PCST", // Cost (cols. 53-60)
        // "PCEM", // Cost (cols. 53-60)
      ],
    ],

    descriptions: {
      J1: "Pesticide ID (cols. 1-5). Unique number to identify the pesticide. This number is used in the EPIC management file (JX(7) in OPSCCOM.DAT) to identify the pesticide(s) that must be simulated.",
      PSTN: "Pesticide name (cols. 7-22). Common or brand name of the pesticide.",
      PSOL: "Pesticide solubility (ppm) (cols. 23-34). The amount of the pesticide product which can dissolve in water.",
      PHLS: "Pesticide half-life in soil (days) (cols. 35-42). The time that it takes for the pesticide product concentration in the soil to be reduced by half.",
      PHLF: "Pesticide half-life on foliage (days) (cols. 43-50). The time that it takes for the pesticide product concentration on the foliage to be reduced by half. Degradation occurs through microbial activity and/or sunlight.",
      PWOF: "Pesticide wash-off fraction (cols. 51-58). Percentage of the pesticide product that is applied to foliage that is washed off into the soil. (Range: 0.0 to 1.0)",
      PKOC: "Pesticide organic C absorption coefficient (cols. 59-68). The amount of pesticide products attached to the soil divided by the amount of the pesticide product in solution, normalized by organic carbon % in the soil. Refer to Environmental Contaminant Toxicological Reviews.",
      PCST: "Pesticide cost ($/KG) (cols. 69-76). Used for economic analyses only.",
      // PCEM: "Carbon emission / unit of pesticide (g/g) (cols: 77-84).",
    },
  },
  MLRN1102: {
    headers: [
      [
        "JZ(1)", // Chemical ID (cols. 1-5)
        "JZ(2)", // Chemical Name (cols. 7-12)
        "JZ(3)", // Solubility in water (cols. 13-20)
        "JZ(4)", // Half-life in soil (cols. 21-28)
      ],
    ],

    descriptions: {
      "JZ(1)":
        "Number of years for the second to the last simulation (cols. 1-4). This is the number of years simulated with the multirun option. Each additional run is identified by a row in the multirun file. Set it to zero if the multirun option is not used.",
      "JZ(2)":
        "Soil erosion simulation (cols. 5-8). 0 for normal erosion soil profile. 1 for static soil profile erosion control practice factor. Soil profile is reset to the initial condition each year.",
      "JZ(3)":
        "Input code for weather variables (cols. 9-12). 1 Precipitation, 2 Maximum and minimum temperatures, 3 Solar radiation, 4 Average wind speed, 5 Average relative humidity. If any daily weather variables are input, precipitation must also be input. Thus, it is not necessary to specify ID=1 unless rain is the only input variable. For more information see variable NGN in the EPIC control table file (EPICCONT.DAT).",
      "JZ(4)":
        "Daily weather station (cols. 13-16). It is the ID number of the daily weather station to use in the multirun. For more information see variable WITH in the EPIC run file (EPICRUN.DAT).",
    },
  },

  PARM1102: {
    headers: [
      [
        "SCRP(1,1)", // Root growth restriction by rock or coarse soil fragments
        "SCRP(1,2)",
      ],
      [
        "SCRP(2,1)", // Soil evaporation - depth
        "SCRP(2,2)",
      ],
      [
        "SCRP(3,1)", // Potential harvest index
        "SCRP(3,2)",
      ],
      [
        "SCRP(4,1)", // Runoff curve number
        "SCRP(4,2)",
      ],
      [
        "SCRP(5,1)", // Soil cover factor
        "SCRP(5,2)",
      ],
      [
        "SCRP(6,1)", // Soil settling rainfall
        "SCRP(6,2)",
      ],
      [
        "SCRP(7,1)", // Aeration stress - root growth
        "SCRP(7,2)",
      ],
      [
        "SCRP(8,1)", // N or P deficiency stress
        "SCRP(8,2)",
      ],
      [
        "SCRP(9,1)", // Pest damage - temperature, water, cover
        "SCRP(9,2)",
      ],
      [
        "SCRP(10,1)", // Harvest Index - Plant Water Use
        "SCRP(10,2)",
      ],
      [
        "SCRP(11,1)", // Plant water stress - plant available water
        "SCRP(11,2)",
      ],
      [
        "SCRP(12,1)", // N volatilization - NH3 depth in soil
        "SCRP(12,2)",
      ],
      [
        "SCRP(13,1)", // Wind erosion - vegetative cover factor
        "SCRP(13,2)",
      ],
      [
        "SCRP(14,1)", // Soil temperature - microbial processes
        "SCRP(14,2)",
      ],
      [
        "SCRP(15,1)", // Plant population in water erosion C-factor
        "SCRP(15,2)",
      ],
      [
        "SCRP(16,1)", // Snowmelt function
        "SCRP(16,2)",
      ],
      [
        "SCRP(17,1)", // Soil snow cover
        "SCRP(17,2)",
      ],
      [
        "SCRP(18,1)", // Soil temperature - soil erosion
        "SCRP(18,2)",
      ],
      [
        "SCRP(19,1)", // Water table - ground water storage
        "SCRP(19,2)",
      ],
      [
        "SCRP(20,1)", // Soil oxygen - soil depth
        "SCRP(20,2)",
      ],
      [
        "SCRP(21,1)", // Plant water stress - soil water tension
        "SCRP(21,2)",
      ],
      [
        "SCRP(22,1)", // Plant water stress - soil water tension
        "SCRP(22,2)",
      ],
      [
        "SCRP(23,1)", // Ground cover - leaf area index
        "SCRP(23,2)",
      ],
      [
        "SCRP(24,1)", // Soil oxygen - soil carbon clay content
        "SCRP(24,2)",
      ],
      [
        "SCRP(26,1)", // Ground cover - standing live biomass
        "SCRP(26,2)",
      ],
      [
        "SCRP(27,1)", // Biological mixing - residue
        "SCRP(27,2)",
      ],
      [
        "SCRP(28,1)", // Soil surface temperature
        "SCRP(28,2)",
      ],
      // [
      //   "Null", // Soil water content - curve number
      //   "Null2",
      // ],
      [
        "SCRP(29,1)", // Leaf fall function
        "SCRP(29,2)",
      ],

      [
        "SCRP(30,1)", // Soil water content - curve number
        "SCRP(30,2)",
      ],

      [
        "PRMT(1)",
        "PRMT(2)",
        "PRMT(3)",
        "PRMT(4)",
        "PRMT(5)",
        "PRMT(6)",
        "PRMT(7)",
        "PRMT(8)",
        "PRMT(9)",
        "PRMT(10)",
      ],
      [
        "PRMT(11)",
        "PRMT(12)",
        "PRMT(13)",
        "PRMT(14)",
        "PRMT(15)",
        "PRMT(16)",
        "PRMT(17)",
        "PRMT(18)",
        "PRMT(19)",
        "PRMT(20)",
      ],
      [
        "PRMT(21)",
        "PRMT(22)",
        "PRMT(23)",
        "PRMT(24)",
        "PRMT(25)",
        "PRMT(26)",
        "PRMT(27)",
        "PRMT(28)",
        "PRMT(29)",
        "PRMT(30)",
      ],
      [
        "PRMT(31)",
        "PRMT(32)",
        "PRMT(33)",
        "PRMT(34)",
        "PRMT(35)",
        "PRMT(36)",
        "PRMT(37)",
        "PRMT(38)",
        "PRMT(39)",
        "PRMT(40)",
      ],
      [
        "PRMT(41)",
        "PRMT(42)",
        "PRMT(43)",
        "PRMT(44)",
        "PRMT(45)",
        "PRMT(46)",
        "PRMT(47)",
        "PRMT(48)",
        "PRMT(49)",
        "PRMT(50)",
      ],
      [
        "PRMT(51)",
        "PRMT(52)",
        "PRMT(53)",
        "PRMT(54)",
        "PRMT(55)",
        "PRMT(56)",
        "PRMT(57)",
        "PRMT(58)",
        "PRMT(59)",
        "PRMT(60)",
      ],
      [
        "PRMT(61)",
        "PRMT(62)",
        "PRMT(63)",
        "PRMT(64)",
        "PRMT(65)",
        "PRMT(66)",
        "PRMT(67)",
        "PRMT(68)",
        "PRMT(69)",
        "PRMT(70)",
      ],
      [
        "PRMT(71)",
        "PRMT(72)",
        "PRMT(73)",
        "PRMT(74)",
        "PRMT(75)",
        "PRMT(76)",
        "PRMT(77)",
        "PRMT(78)",
        "PRMT(79)",
        "PRMT(80)",
      ],
      [
        "PRMT(81)",
        "PRMT(82)",
        "PRMT(83)",
        "PRMT(84)",
        "PRMT(85)",
        "PRMT(86)",
        "PRMT(87)",
        "PRMT(88)",
        "PRMT(89)",
        "PRMT(90)",
      ],
      [
        "PRMT(91)",
        "PRMT(92)",
        "PRMT(93)",
        "PRMT(94)",
        "PRMT(95)",
        "PRMT(96)",
        "PRMT(97)",
        "PRMT(98)",
        "PRMT(99)",
        "PRMT(100)",
      ],
      ["PRMT(101)", "PRMT(102)", "PRMT(103)", "PRMT(104)", "PRMT(105)"],
      ["COIR", "COL", "FULP", "WAGE", "CSTZ(1)", "CSTZ(2)", "CSTZ(2)"],
      ["XKN50 ", "XKN30", "XKN10", "CBVT0"],
    ],

    descriptions: {
      "SCRP(1,1)":
        "Root growth restriction by rock or coarse soil fragments: The number to the left of the decimal point is the % coarse fragments, and the number to the right is the fraction of root growth restriction.",
      "SCRP(1,2)":
        "Root growth restriction by rock or coarse soil fragments: The number to the left of the decimal point is the % coarse fragments, and the number to the right is the fraction of root growth restriction.",
      "SCRP(2,1)":
        "Soil evaporation – depth: Soil evaporation as a function of soil depth. The number to the left of the decimal point is depth (mm), and the number to the right is fraction of soil evaporation between soil surface and specified depth.",
      "SCRP(2,2)":
        "Soil evaporation – depth: Soil evaporation as a function of soil depth. The number to the left of the decimal point is depth (mm), and the number to the right is fraction of soil evaporation between soil surface and specified depth.",
      "SCRP(3,1)":
        "Potential harvest index: The number to the left of the decimal point is % of growing season, and the number to the right is fraction of harvest index (drives potential harvest index development as a function of crop maturity).",
      "SCRP(3,2)":
        "Potential harvest index:  The number to the left of the decimal point is % of growing season, and the number to the right is fraction of harvest index.",
      "SCRP(4,1)":
        "Runoff curve number: This is an exception to normal s-curve procedures. The number to the left of the decimal point is soil water content, and the number to the right is curve number. Soil water fraction taken from SCRP(30,n) to match CN2 and CN3 (average and wet condition runoff curve numbers). THIS IS ALWAYS LEFT AT 0.0, 0.0. SCRP(4) IS CALCULATED BASED ON SCRP(30).",
      "SCRP(4,2)":
        "Runoff curve number:  This is an exception to normal s-curve procedures. The number to the left of the decimal point is soil water content, and the number to the right is curve number.",
      "SCRP(5,1)":
        "Soil Cover Factor: Estimates soil cover factor used in simulating soil temperature. The number to the left of the decimal point is the total above ground plant material dead and alive (Mg ha-1) and the number to the right is the soil cover factor (fraction).",
      "SCRP(5,2)":
        "Soil Cover Factor: Estimates soil cover factor used in simulating soil temperature.",
      "SCRP(6,1)":
        "Soil settling rainfall: The number to the left of decimal point is rainfall-runoff adjusted for soil texture and depth (mm), and the number to the right of the decimal point is soil settling fraction caused by rainfall.",
      "SCRP(6,2)":
        "Soil settling rainfall: The number to the left of decimal point is rainfall-runoff adjusted for soil texture and depth (mm).",
      "SCRP(7,1)":
        "Aeration stress – root growth: The number to the left of decimal point is % of soil water storage volume between critical aeration factor (from CROPCOM.DAT file) and saturation, and the number to the right is % reduction in root growth caused by aeration stress. Determines the root growth aeration stress factor as a function of soil water content and the critical aeration factor for the crop.",
      "SCRP(7,2)":
        "Aeration stress – root growth: The number to the left of decimal point is % of soil water storage volume between critical aeration factor and saturation.",
      "SCRP(8,1)":
        "N or P deficiency stress – based on plant N or P content: The number to the left of decimal point is % of difference between plant N or P content ratios (ratio of actual potential N or P content). The number to the right is the N or P stress factor (=0.0 when N or P ratio = 0.5; = 1.0 when N or P ratio = 1). Determines the plant stress caused by N or P deficiency.",
      "SCRP(8,2)":
        "N or P deficiency stress – based on plant N or P content: The number to the left of decimal point is % of difference between plant N or P content ratios.",
      "SCRP(9,1)":
        "Pest damage – temp, water, cover: The number to the left of the decimal point is average daily minimum temperature adjusted for soil cover and 30-day antecedent rainfall minus runoff. The number to the right is crop yield reduction by pests expressed as a fraction of the difference between 1.0 and the minimum pest factor (from CROPCOM.DAT). Calculates the pest damage factor as a function of temperature, considering thresholds for 30-day rainfall and above ground plant material.",
      "SCRP(9,2)":
        "Pest damage – temp, water, cover: The number to the left of the decimal point is average daily minimum temperature adjusted for soil cover and rainfall.",
      "SCRP(10,1)":
        "Harvest Index – Plant Water Use: The number to the left of the decimal point is the % of actual to potential plant water use during the growing season. The number to the right is the fraction of actual to potential harvest index.",
      "SCRP(10,2)":
        "Harvest Index – Plant Water Use: The number to the left of the decimal point is the % of actual to potential plant water use.",
      "SCRP(11,1)":
        "Plant water stress – plant available water: The number to the left of the decimal point is the ratio of root zone soil water content to plant available water storage volume, and the number to the right of the decimal point is the fraction of plant stress due to water stress.",
      "SCRP(11,2)":
        "Plant water stress – plant available water: The number to the left of the decimal point is the ratio of root zone soil water content.",
      "SCRP(12,1)":
        "N volatilization, as a function of NH3 depth in soil: The number to the left of the decimal point is the depth at the center of soil layer (mm) and the number to the right is the nitrogen volatilization in (kg ha-1). Governs nitrogen volatilization as a function of soil depth.",
      "SCRP(12,2)":
        "N volatilization, as a function of NH3 depth in soil: The number to the left of the decimal point is the depth at the center of soil layer.",
      "SCRP(13,1)":
        "Wind erosion - vegetative cover factor: Calculates wind erosion vegetative cover factor as a function of above ground plant material. The number to the left of decimal point is vegetative equivalent in (Mg ha-1) and the number to the right is wind erosion cover factor (fraction).",
      "SCRP(13,2)":
        "Wind erosion - vegetative cover factor: The number to the left of decimal point is vegetative equivalent.",
      "SCRP(14,1)":
        "Soil temperature – microbial processes: Calculates soil temperature factor used in regulating microbial processes. The number to the left of the decimal point is soil temperature and the number to the right is factor (fraction).",
      "SCRP(14,2)":
        "Soil temperature – microbial processes: The number to the left of the decimal point is soil temperature.",
      "SCRP(15,1)":
        "Plant population in water erosion C-factor: The number to the left of decimal point is plant population in plants per m2 or plants per ha for trees, and the number to the right is the water erosion cover factor (fraction) or the fraction of erosion control.",
      "SCRP(15,2)":
        "Plant population in water erosion C-factor: The number to the left of decimal point is plant population.",
      "SCRP(16,1)":
        "Snowmelt function: Increases snow melt as a function of time since the last snowfall. The number to the left of the decimal point is the time (days) since the last snowfall, and the number to the right is the rate of melt as a function of time.",
      "SCRP(16,2)":
        "Snowmelt function: The number to the left of the decimal point is the time since the last snowfall.",
      "SCRP(17,1)":
        "Soil snow cover: Estimates the snow cover factor as a function of snow present. The number to the left of the decimal point is the amount of snow present (mm of water) and the number on the right is the fraction of soil covered.",
      "SCRP(17,2)":
        "Soil snow cover: The number to the left of the decimal point is the amount of snow present.",
      "SCRP(18,1)":
        "Soil temperature – soil erosion: Expresses soil temperature effect on erosion of frozen soils.",
      "SCRP(18,2)":
        "Soil temperature – soil erosion: Expresses soil temperature effect on erosion.",
      "SCRP(19,1)":
        "Water table – ground water storage: Drives water table between maximum and minimum limits as a function of ground water storage.",
      "SCRP(19,2)":
        "Water table – ground water storage: Drives water table between maximum and minimum limits as a function of ground water storage.",
      "SCRP(20,1)":
        "Soil oxygen – soil depth: Simulates oxygen content of soil as a function of depth. Used in microbial processes of residue decay. The number to the left of the decimal point is the depth to center of each soil layer (m) and the number to the right of the decimal point is the adjustment to the oxygen content. This parameter works in conjunction with Parm 53. (1 – Parm 53) x SCRP20.",
      "SCRP(20,2)":
        "Soil oxygen – soil depth: Simulates oxygen content of soil as a function of depth. Used in microbial processes of residue decay. The number to the left of the decimal point is the depth to center of each soil layer (m) and the number to the right of the decimal point is the adjustment to the oxygen content. This parameter works in conjunction with Parm 53. (1 – Parm 53) x SCRP20.",
      "SCRP(21,1)":
        "Plant water stress – soil water tension: Governs plant water stress as a function of soil water tension.",
      "SCRP(21,2)":
        "Plant water stress – soil water tension: Governs plant water stress as a function of soil water tension.",
      "SCRP(22,1)": "Not used",
      "SCRP(22,2)": "Not used",
      "SCRP(23,1)":
        "Ground cover – leaf area index: Estimates plant ground cover as a function of leaf area. The number to the left of the decimal point is the leaf area, and the number to the right of the decimal point is the fraction of ground cover.",
      "SCRP(23,2)":
        "Ground cover – leaf area index: Estimates plant ground cover as a function of leaf area. The number to the left of the decimal point is the leaf area, and the number to the right of the decimal point is the fraction of ground cover.",
      "SCRP(24,1)":
        "Soil oxygen – soil carbon clay content: Simulates oxygen content of the soil as a function of carbon and clay content. This S-curve number is used in microbial processes of residue decay.",
      "SCRP(24,2)":
        "Soil oxygen – soil carbon clay content: Simulates oxygen content of the soil as a function of carbon and clay content. This S-curve number is used in microbial processes of residue decay.",
      "SCRP(25,1)": "Not Used",
      "SCRP(25,2)": "Not Used",
      "SCRP(26,1)":
        "Ground cover – standing live biomass: Estimates plant ground cover as a function of standing live biomass. The number to the left of the decimal point is the standing live biomass (Mg ha-1), and the number to the right is the fraction of ground cover.",
      "SCRP(26,2)":
        "Ground cover – standing live biomass: Estimates plant ground cover as a function of standing live biomass. The number to the left of the decimal point is the standing live biomass (Mg ha-1), and the number to the right is the fraction of ground cover.",
      "SCRP(27,1)":
        "Biological mixing – residue: Increases biological mixing in soil layer 1 as residue increases.",
      "SCRP(27,2)":
        "Biological mixing – residue: Increases biological mixing in soil layer 1 as residue increases.",
      "SCRP(28,1)":
        "Soil surface temperature: Adjusts the soil surface temperature during the cold season considering the solar radiation. Suggested values: SCRP(28,1) = 10.01.",
      "SCRP(28,2)":
        "Soil surface temperature: Adjusts the soil surface temperature during the cold season considering the solar radiation. Suggested values: SCRP(28,2) = 20.90.",
      "SCRP(29,1)":
        "Leaf fall function: Time drive function to simulate leaf fall for trees. Suggested values: SCRP(29,1) = 75.01.",
      "SCRP(29,2)":
        "Leaf fall function: Time drive function to simulate leaf fall for trees. Suggested values: SCRP(29,2) = 95.99.",
      "SCRP(30,1)":
        "Soil water content – curve number: Exception to normal s-curve procedure; sets soil water contents coinciding with CN2 and CN3. X1 = soil water content as % of field capacity – wilting point.This parameter does not follow the same X, qY format as the other parameters. In this case, Y is always 0. EXAMPLE: X1 = 45.00; this indicates that CN2 is 45% of the volume between field capacity and wilting point. (0.45*(FC-WP) + WP). X2 = 10.00; this indicates that CN3 is 10% of the volume between saturation and field capacity:(0.10*(SAT-FC) + FC).",
      "SCRP(30,2)":
        "Soil water content – curve number: Exception to normal s-curve procedure; sets soil water contents coinciding with CN2 and CN3. X2 = soil water content as % of saturation – field capacity. This parameter does not follow the same X, qY format as the other parameters. In this case, Y is always 0. EXAMPLE: X1 = 45.00; this indicates that CN2 is 45% of the volume between field capacity and wilting point.(0.45*(FC-WP) + WP). X2 = 10.00; this indicates that CN3 is 10% of the volume between saturation and field capacity:(0.10*(SAT-FC) + FC).",
      "PRMT(1)":
        "Crop canopy-PET (cols. 1-8): Factor used to adjust crop canopy resistance in the Penman-Monteith PET equation. Default setting: 1.5 (Range: 1.0 to 2.0)",
      "PRMT(2)":
        "Root growth-soil strength (cols. 9-16): Used to estimate root growth stress created by soil strength. PARM(2) is usually set between 1.15 and 1.2. High values minimize soil strength constraint on root growth. Setting PARM(2) = 2 eliminates all root growth stress. Default setting: 2.0 (Range: 1.0 to 2.0)",
      "PRMT(3)":
        "Water stress-harvest index (cols. 17-24): Sets fraction of growing season when water stress starts reducing harvest index. Default setting: 0.75 (Range: 0.0 to 1.0)",
      "PRMT(4)": "Not used (cols. 25-32)",
      "PRMT(5)":
        "Soil water lower limit (cols. 33-40): Lower limit of water content in the top 0.5 m soil depth expressed as a fraction of the wilting point water content. Default setting: 0.5 (Range: 0.0 to 1.0)",
      "PRMT(6)":
        "Winter dormancy (h) (cols. 41-48): Causes dormancy in winter grown crops. Growth does not occur when day length is less than annual minimum day length + PARM(6). It is used to simulate dormancy. Default setting: 0.1 (Range: 0.0 to 1.0)",
      "PRMT(7)":
        "N fixation (cols. 49-56): Drives the process to estimate nitrogen fixation for legumes. At 1, fixation is limited by soil water or nitrate content or by crop growth stage. At 0 fixation meets crop nitrogen uptake demand. A combination of the two previously described scenarios is obtained by setting 0 < PARM(7) < 1. Default setting: 0.99 (Range: 0.0 to 1.0)",
      "PRMT(8)":
        "Soluble phosphorus runoff coefficient (0.1 m3 Mg-1) (cols. 57-64): P concentration in sediment divided by that of the water. Default setting: 15.0 (Range: 10 to 20)",
      "PRMT(9)":
        "Pest damage moisture threshold (mm) (cols. 65-72): It is used to regulate pest growth. The moisture considered is the previous 30-day rainfall minus runoff. See also PARM(10), PSTX in the EPICCONT.DAT file, PST in the CROPCOM.DAT file, and SCRP(9) above in this section. Default setting: 25.0 Large value (e.g., >500) turns off the simulation of pest damage.(Range: 25 to 250)",
      "PRMT(10)":
        "Pest damage cover threshold (Mg ha-1) (cols. 73-80): It is one of several parameters used to regulate pest growth. It considers crop residue + above ground biomass. This is the amount of residues required for pests to begin to grow. Setting PARM(10) at a large number (e.g., >50) will result in little or no pest growth because it will be impossible to reach such high levels of residue. Default setting: 1.0 (Range: 0 to 50)",
      "PRMT(11)":
        "Moisture required for seed germination (fraction) (cols. 1-8): Sets the minimum amount of moisture in the plow depth layer (set with PARM(16)) required to allow seed germination. Typical values range from 0.3 to 0.9 for this parm. Default setting: -100 (turned off) (Range: 0.0 to 1.0)",
      "PRMT(12)":
        "Soil evaporation coefficient (cols. 9-16): Governs rate of soil evaporation from top 0.2 m of soil. Small values increase soil evaporation. Default setting: 2.5 (Range: 1.5 to 2.5)",
      "PRMT(13)":
        "Hargreaves PET equation exponent (Cols. 17-24): The original value of 0.5 was modified to 0.6 to increase evapotranspiration. Default setting: 0.5 (Range: 0.5 to 0.6)",
      "PRMT(14)":
        "Nitrate leaching ratio (cols. 25-32): Ratio of nitrate concentration in surface runoff to nitrate concentration in percolate. Default setting: 1.0 (Range: 0.1 to 1.0)",
      "PRMT(15)": "Not used (cols. 33-40)",
      "PRMT(16)":
        "Plow layer depth (m) (cols. 41-48): Used to track soluble phosphorus concentration or weight, organic carbon, and soil water content. Default setting: 0.15 (Range: 0.05 to 0.2)",
      "PRMT(17)":
        "Crack flow coefficient (cols. 49-56): Fraction of inflow to a soil layer allowed to flow in cracks. Default setting: 0.0 (Range: 0.0 to 1.0)",
      "PRMT(18)":
        "Pesticide leaching ratio (cols. 57-64): Pesticide concentration in surface runoff to pesticide concentration in percolate. Default setting: 0.1 (Range: 0.1 to 1.0)",
      "PRMT(19)":
        "Fraction of maturity at spring growth initiation (cols. 65-72): Allows fall growing crops to reset heat unit index to a value greater than 0 when passing through the minimum temperature month. Default setting: 0.5 (Range: 0.0 to 1.0)",
      "PRMT(20)":
        "Microbial decay rate coefficient (cols. 73-80): Adjusts soil water-temperature-oxygen equation. Default setting: 1.0 (Range: 0.5 to 1.5)",
      "PRMT(21)":
        "KOC for carbon loss in water and sediment (cols. 1-8): KD = KOC × C. Default setting: 1000 (Range: 500 to 1500)",
      "PRMT(22)":
        "Potassium pool flow coefficient (cols. 9-16): Regulates flow between exchangeable and fixed potassium pools. Default setting: 0.00025 (Range: 0.00001 to 0.0005)",
      "PRMT(23)":
        "Exponential coefficient in RUSLE C factor equation (cols. 17-24): Used in estimating the residue effect. Default setting: 0.75 (Range: 0.5 to 1.5)",
      "PRMT(24)":
        "Maximum depth for biological mixing (m) (cols: 25-32): Default setting: 0.3 (Range: 0.1 to 0.3)",
      "PRMT(25)":
        "Biological mixing efficiency (cols. 33-40): Simulates mixing in topsoil by earth worms etc. Default setting: 0.03 (Range: 0.01 to 0.05)",
      "PRMT(26)":
        "Exponential coefficient in RUSLE C factor equation (cols. 41-48): Used in estimating the effect of growing plants. Default setting: 0.1 (Range: 0.05 to 0.2)",
      "PRMT(27)":
        "Lower limit nitrate concentration (g N/Mg soil) (cols: 49-56): Maintains soil nitrate concentration at or above PARM(27). Default setting: 0.01 (Range: 0.01 to 10.0)",
      "PRMT(28)":
        "Acceptable plant N stress level (cols. 57-64): Used to estimate annual nitrogen application rate as part of the automatic fertilizer scheme. Default setting: 1.0 (Range: 0.1 to 1.0)",
      "PRMT(29)":
        "Potassium pool flow coefficient (cols. 65-72): Regulates flow between soluble and exchangeable potassium pools. Default setting: 0.01 (Range: 0.001 to 0.02)",
      "PRMT(30)":
        "Oxygen-depth function method (cols. 73-80): Sets the amount of oxygen present in the soil based on depth or clay content. Default setting: 0.5 (Range: 0.0 to 1.0)",
      "PRMT(31)":
        "Furrow irrigation sediment routing exponent (cols. 1-8): Exponent of water velocity function for estimating potential sediment concentration. Default setting: 1.0 (Range: 1.0 to 1.5)",
      "PRMT(32)":
        "Minimum C factor value (cols. 9-16): It is the minimum C factor value in EPIC soil erosion equation. Default setting: 0.01 (Range: 0.0001 to 0.8)",
      "PRMT(33)":
        "Puddling saturated conductivity (mm h-1) (cols. 17-24): Used to simulate puddling in rice paddies by setting second soil layer saturated conductivity to the value set with PARM(33). Default setting: 0.001 (Range: 0.00001 to 0.1)",
      "PRMT(34)":
        "Soluble P runoff exponent (cols. 25-32): Used in the modified GLEAMS method makes soluble phosphorus runoff concentration a nonlinear function of organic phosphorus concentration in soil layer 1. Default setting: 1.0 (Range: 1.0 to 1.5)",
      "PRMT(35)":
        "Water stress weighting coefficient (cols. 33-40): Defines how the water stress is estimated during the simulation. Default setting: 0.5 (Range: 0.0 to 1.0)",
      "PRMT(36)":
        "Furrow irrigation base sediment concentration (Mg m-3) (cols. 41-48): Potential sediment concentration when flow velocity = 1 (m sec-1). Default setting: 0.1 (Range: 0.01 to 0.2)",
      "PRMT(37)":
        "Pest kill scaling factor (cols. 49-56): Scales pesticide kill effectiveness to magnitude of pest growth index. Default setting: 100 (Range: 100 to 10000)",
      "PRMT(38)":
        "Hargreaves PET equation coefficient (cols. 57-64): Original value = 0.0023. modified to 0.0032 to increase PET. Default setting: 0.0032 (Range: 0.0023 to 0.0032)",
      "PRMT(39)":
        "Auto N fertilizer scaling factor (cols. 65-72): Sets initial annual crop N use considering WA and BN3 from the CROPCOM.DAT file. Default setting: 300 (Range: 50 to 500)",
      "PRMT(40)": "Not used (cols. 73-80)",
      "PRMT(41)":
        "Soil evaporation-cover coefficient (cols. 1-8): Regulates soil water evaporation as a function of soil covered by flat and standing residue, and growing biomass. Default setting: 0.1 (Range: 0.01 to 0.2)",
      "PRMT(42)":
        "SCS curve number index coefficient (cols. 9-16): Regulates the effect of PET in driving the SCS curve number retention parameter. Default setting: 1.0 (Range: 0.3 to 2.5)",
      "PRMT(43)":
        "Upward movement of soluble P (cols. 17-24): Regulates the upward movement of soluble phosphorus by evaporation. Default setting: 1.0 (Range: 1.0 to 20.0)",
      "PRMT(44)":
        "Soluble C in runoff to percolate ratio (cols. 25-32): Ratio of soluble C concentration in runoff to percolate. Default setting: 0.5 (Range: 0.1 to 1.0)",
      "PRMT(45)":
        "CENTURY eq. coefficient (cols. 33-40): Coefficient in century equation allocating slow to passive humus. Default setting: 0.003 (Range: 0.001 to 0.05)",
      "PRMT(46)":
        "Auto fertilizer weighting factor (cols. 41-48): Adjusts the approach used to set automatic nitrogen fertilization. At 0.0 nitrogen application equals average annual nitrogen in crop yield. At 1.0 the nitrogen stress function is used to set nitrogen application. The two methods are weighted with PARM(46) for values between 0.0 and 1.0. Default setting: 1.0 (Range: 0.0 to 1.0)",
      "PRMT(47)":
        "CENTURY eq. slow humus transformation (cols. 49-56): Century slow humus transformation rate. Default setting: 0.000548 (Range: 0.00041 to 0.00068)",
      "PRMT(48)":
        "CENTURY eq. passive humus transformation (cols. 57-64): Century passive humus transformation rate. Default setting: 0.000012 (Range: 0.0000082 to 0.000015)",
      "PRMT(49)":
        "Fraction of above ground plant material burned (cols. 65-72): Burning operation destroys specified fraction of above ground biomass and standing and flat residue. Default setting: 0.9 (Range: 0.5 to 1.0)",
      "PRMT(50)":
        "Technology annual rate coefficient (cols. 73-80): Linear adjustment to harvest index – base year = 2000. Set to zero for level technology. Increase to increase technology effect on crop yield. With constant PARM(50) > 0.0, the effect of technology increases year after year. Default setting: 0.0 (Range: 0.0 to 0.01)",
      "PRMT(51)":
        "Microbial activity adjustment (cols. 1-8): Adjusts the microbial activity function in topsoil layer. Default setting: 0.5 (Range: 0.1 to 1.0)",
      "PRMT(52)":
        "Tillage – residue decay rate (cols. 9-16): Exponential coefficient in equation expressing tillage effect on residue decay rate. Default setting: 10.0 (Range: 5.0 to 15.0)",
      "PRMT(53)":
        "Oxygen effect – microbial activity (cols. 17-24): Coefficient in oxygen equation used in modifying microbial activity with soil depth. It works along with SCRP(20). Default setting: 0.9 (Range: 0.8 to 0.95)",
      "PRMT(54)":
        "Water use – root growth (cols. 25-32): Exponential coefficient in potential water use root growth distribution equation. Default setting: 5.0 (Range: 2.5 to 7.5)",
      "PRMT(55)":
        "Weight for root growth approach (cols. 33-40): Coefficient used in allocating root growth between two functions. At 0 root growth is simulated as exponential distribution of depth; at 1 root growth is simulated as a function of water use. Values between 0 and 1 weight the two functions. Default setting: 0.0 (Range: 0.0 to 1.0)",
      "PRMT(56)":
        "Root growth distribution – depth (cols. 41-48): Exponential coefficient in root growth distribution by depth function. Default setting: 5.0 (Range: 5.0 to 10.0)",
      "PRMT(57)":
        "Volatilization/nitrification partitioning coefficient (cols. 49-56): Fraction of process allocated to volatilization. Default setting: 0.1 (Range: 0.05 to 0.5)",
      "PRMT(58)":
        "Runoff amount to delay pest application (mm) (cols. 57-64): Pesticide is not applied on days with runoff greater than PARM(58). Default setting: 500.0 (no delay) (Range: 0.0 to 25.0)",
      "PRMT(59)":
        "Soil water value to delay tillage (cols. 65-72): Tillage is delayed when PDSW/FCSW > PARM(59). PDSW = Plow depth soil water content, FCSW = Field capacity soil water content. Setting PARM(59) to a value greater than 1.0 will turn off this option giving no delay in tillage operations. Default setting: 10.0 (no delay) (Range: 0.0 to 1.0)",
      "PRMT(60)":
        "Estimation of USLE C factor (cols. 73-80): Relates USLE C factor to soil covered by flat and standing residue and growing biomass. Default setting: 1.0 (Range: 0.5 to 2.0)",
      "PRMT(61)":
        "Weighting factor for estimating soil evaporation (cols. 1-8): This parameter allows weighing the approach used in estimating the soil evaporation. At 0 total compensation of water deficit is allowed between soil layers. At 1 no compensation is allowed. 0.0 < PARM(61) < 1.0 gives partial compensation. Default setting: 0.0 (Range: 0.0 to 1.0)",
      "PRMT(62)":
        "Upward nitrogen movement (cols. 9-16): Exponential coefficient regulates upward N movement by evaporation; increasing PARM(62) increases upward N movement. Default setting: 1.0 (Range: 0.2 to 2.0)",
      "PRMT(63)":
        "Nitrogen concentration in leaching (ppm) (cols. 17-24): Upper limit of N concentration in percolating water. Default setting: 1000 (Range: 100 to 10000)",
      "PRMT(64)":
        "Nitrification – volatilization (cols. 25-32): Upper limit of nitrification-volatilization as a fraction of NH3 present. Default setting: 0.5 (Range: 0.0 to 1.0)",
      "PRMT(65)":
        "Curve number – frozen soil (cols. 33-40): Reduces NRCS runoff curve number retention for frozen soil. Fraction of S (retention Parameter) when soil is frozen. Reduced to increase runoff from frozen soils. Default setting: 0.05 (Range: 0.05 to 0.5)",
      "PRMT(66)":
        "Standing dead fall rate (cols. 41-48): Governs rate of standing dead conversion to flat residue. Default setting: 0.01 (Range: 0.0001 to 0.1)",
      "PRMT(67)":
        "Wind erosion – wind speed (m sec-1) (cols. 49-56): Sets wind speed threshold to simulate wind driven soil erosion. Wind driven soil erosion is not simulated if wind speed is less than the threshold set with PARM(67). Default setting: 6.0 (Range: 4.0 to 10.0)",
      "PRMT(68)":
        "Nitrogen fixation upper limit (kg ha-1 d-1) (cols. 57-64): Sets the daily nitrogen fixation upper limit. Default setting: 2.0 (Range: 1.0 to 30.0)",
      "PRMT(69)":
        "Heat unit adjustment at harvest (cols. 65-72): If PARM(69) > 0.0, sets back the heat units to a fraction controlled by PARM(69) and by harvest index. Default setting: 0.0 (Range: 0.0 to 1.0)",
      "PRMT(70)":
        "Day length – LAI development (cols. 73-80): Power of change in day length component of LAI growth equation. Causes faster growth in spring and slower growth in fall. Default setting: 3.0 (Range: 1.0 to 10.0)",
      "PRMT(71)":
        "RUSLE 2 transport capacity parameter (cols. 1-8): Regulates deposition as a function of particle size and flow rate. Default setting: 0.001 (Range: 0.001 to 0.1)",
      "PRMT(72)":
        "RUSLE 2 Threshold transport capacity coefficient (cols. 9-16): Adjusts threshold (flow rate × slope steepness). Default setting: 3.0 (Range: 1.0 to 10.0)",
      "PRMT(73)":
        "Curve number retention parameter (cols. 17-24): Sets the upper limit of curve number retention parameter S. SUL = PARM(73)×S1 allows CN to go below CN1. Default setting: 1.2 (Range: 1.0 to 2.0)",
      "PRMT(74)":
        "Penman-Monteith adjustment factor (cols. 25-32): Adjusts PM PET estimates. PARM(74)=1.0 results in no adjustment of the PM PET estimates. Default setting: 1.0 (Range: 0.5 to 1.5)",
      "PRMT(75)":
        "Runoff CN residue adjustment parameter (cols. 33-40): Increases runoff for RSD<1.0 Mg ha-1. Decreases for RSD>1.0. Default setting: 0.0 (Range: 0.0 to 0.3)",
      "PRMT(76)":
        "Harvest index adjustment for fruit and nut trees (cols. 41-48): Reduces yield when crop available soil water is less than PARM(76). Default setting: 1000 (Range: 100 to 1500)",
      "PRMT(77)":
        "Phosphorus flux labile and active pool (cols. 49-56): Coefficient regulating P flux between labile and active pool. RMN = PARM(77) × WPML – WPMA × RTO RMN: mineralization rate WPML: content of labile P in layer WPMA: weight of active mineral P pool RTO: ratio PSP/1-PSP PSP: Phosphorus sorption ratio Default setting: 0.0001 (Range: 0.0001 to 0.001)",
      "PRMT(78)":
        "Phosphorus flux active and stable pool (cols. 57-64): Coefficient regulating P flux between active and stable pool. ROC = PARM(78) × BK × 4.0 × WPMA – WPMS ROC: rate of stable P mineralization pool BK: rate constant that governs flow between active and mineral WPMS: weight of stable P pool Default setting: 0.0001 (Range: 0.0001 to 0.001)",
      "PRMT(79)":
        "Factor for locating appropriate weather stations (cols. 65-72): If IWTH in the EPIC run file (EPICRUN.DAT) is set to zero not providing a weather station, the EPIC model will identify a weather station to use for the simulation. With PARM(79) at 0.0 the weather station is identified giving priority to elevation. With PARM(79) at 1.0 the weather station is located giving priority to distance. 0.0 < PARM(79) < 1.0 considers both approaches. Default setting: 0.9 (Range: 0.0 to 1.0)",
      "PRMT(80)":
        "Partitions of N2 and N2O from denitrification (cols. 73-80): N2 fraction of denitrification in original EPIC denitrification function. Default setting: 0.2 (Range: 0.1 to 0.9)",
      "PRMT(81)":
        "Runoff curve number adjustment (cols. 1-8): Used to adjust runoff volume. This parameter works only when NVCN in control table file (EPICCONT.DAT) is equal to 0. Default setting: 1.0 (Range: 0.1 to 2.0)",
      "PRMT(82)":
        "Biomass pool transformation approach (cols. 9-16): Microbial N:C ratio at which N immobilization is maximum. PARM(82) = CRLNC in model source code. Default setting: 0.0667 (Range: 0.025 to 0.075)",
      "PRMT(83)":
        "Biomass pool transformation approach (cols. 17-24): Microbial N:C ratio at which N immobilization ceases. PARM(83) = CRUNC in model source code. Default setting: 0.2 (Range: 0.04 to 0.2)",
      "PRMT(84)":
        "Specific base rate for ammonification (1/day) (cols. 25-32): PARM(84) = WKA in model source code. Used in Phoenix C N dynamic approach (see ICP in EPICCONT.DAT). Default setting: 0.3 (Range: 0.2 to 0.4)",
      "PRMT(85)":
        "Microbial N:C ratio at which ammonification is maximum (cols. 33-40): PRMT(85) = WNCMIN in model source code. Used in Phoenix C N dynamic approach (see ICP in EPICCONT.DAT). Default setting: 0.0667 (Range: 0.025 to 0.075)",
      "PRMT(86)":
        "Microbial N:C ratio at which ammonification ceases (cols. 41-48): PARM(86) = WNCMAX in model source code. Used in Phoenix C N dynamic approach (see ICP in EPICCONT.DAT). Default setting: 0.2 (Range: 0.04 to 0.2)",
      "PRMT(87)":
        "Maximum rate of uptake of nitrogen during immobilization (gN gC-1 day-1) (cols. 49-56): PARM(87) = VMU in model source code. Used in Phoenix C N dynamic approach (see ICP in EPICCONT.DAT). Default setting: 0.0075 (Range: 0.00675 to 0.00825)",
      "PRMT(88)":
        "Half Saturation constant for ammonia immobilization (mg N L-1) (cols. 57-64): PARM(88) = WKMNH3 in model source code. Used in Phoenix C N dynamic approach (see ICP in EPICCONT.DAT). Default setting: 2.0 (Range: 1.8 to 2.2)",
      "PRMT(89)":
        "Half Saturation constant for nitrite immobilization (mg N L-1) (cols. 65-72): PARM(89) = WKMNO2 in model source code. Used in Phoenix C N dynamic approach (see ICP in EPICCONT.DAT). Default setting: 1.0 (Range: 0.9 to 1.1)",
      "PRMT(90)":
        "Half Saturation constant for nitrate immobilization (mg N L-1) (cols. 73-80): PARM(90) = WKMNO3 in model source code. Used in Phoenix C N dynamic approach (see ICP in EPICCONT.DAT). Default setting: 1.0 (Range: 0.9 to 1.1)",
      "PRMT(91)":
        "Nitrogen plant uptake (cols. 1-8): Sets the fraction of plant nitrogen uptake in NO3 form, the remainder of nitrogen uptake is in NH3 form. Default setting: 0.9 (Range: 0.1 to 0.95)",
      "PRMT(92)":
        "Root decay lag factor (cols. 9-16): Prevents abrupt changes in root mass when standing live changes dramatically. Lag is directly related to factor and small values allow quicker change in root mass when standing live biomass changes. Default setting: 0.9 (Range: 0.0 to 1.0)",
      "PRMT(93)":
        "Vertical Percolation Exponent (cols. 17-24): Exponent for calculating vertical percolation in soil layers as a function of actual hydraulic conductivity using the VSHC method (see IPRK in EPICCONT.DAT file). Default setting: 3.0 (Range: 1.0 to 6.0)",
      "PRMT(94)":
        "Radiation soil temperature factor (cols. 25-32): XZ=0.5×(TMX-TMN)×ST0/PARM(94); TMX = max air temperature; TMN = min air temperature; ST0 = solar radiation. Default setting: 15.0 (Range: 10.0 to 20.0)",
      "PRMT(95)":
        "Damping depth for soil temperature factor (cols. 33-40): X7=PARM(95)×Z/DD; Z = depth to the bottom of the soil layer; DD = damping depth. Default setting: 1.0 (Range: 0.5 to 1.5)",
      "PRMT(96)":
        "NH3: NO3 mineralization ratio (cols. 41-48): Adjusts the NH3:NO3 mineralization ratio. At 1.0 all the mineralized nitrogen goes to NH3. At 0.0 all the mineralized nitrogen goes to NO3. Default setting: 0.5 (Range: 0.0 to 1.0)",
      "PRMT(97)":
        "Vegetative cover factor upper limit (cols. 49-56): Sets the upper limits of the vegetative cover factor used in the simulation of soil temperature. Default setting: 0.7 (Range: 0.1 to 0.9)",
      "PRMT(98)":
        "Snow cover factor upper limit (cols. 57-64): Sets the upper limits of the snow cover factor used in the simulation of the soil temperature. Default setting: 0.95 (Range: 0.75 to 0.99)",
      "PRMT(99)":
        "Daily weather – soil surface temperature (cols. 65-72): Used in the enhanced cosine function approach (see ISLT in EPICCONT.DAT file), it regulates the effect of actual daily weather on the soil surface temperature. It adjusts the difference between the soil surface temperature estimated with the cosine function and the soil surface temperature estimated considering solar radiation, air temperature, and soil cover factor. Default setting: 0.6 (Range: 0.5 to 0.95)",
      "PRMT(100)":
        "Soil layer depth – layer temperature (cols. 73-80): Used in the enhanced cosine approach (see ISLT in EPICCONT.DAT file), it regulates the effect of soil layer depth and damping depth on the estimated soil layer temperature. Default setting: 2.0 (Range: 0.7 to 2.0)",
      "PRMT(101)":
        "Soil surface temperature transfer adjustment (cols. 1-8): Used in temperature transfer approach (see ISLT in EPICCONT.DAT file), it adjusts the temperature transfer coefficient. When set at 1.0, it gives full effect of daily weather and soil cover causing large variation in soil temperature estimation from day to day. When PARM(101) approaches 0.0, estimated soil temperature becomes a smooth cosine curve repeating itself every year. Default setting: 0.6 (Range: 0.0 to 1.0)",
      "PRMT(102)":
        "Soil temperature transfer adjustment (cols. 9-16): Used in the temperature transfer approach (see ISLT in EPICCONT.DAT file), it adjusts the temperature transfer between soil layers. Default setting: 0.9 (Range: 0.0 to 1.0)",
      "PRMT(103)":
        "Bottom soil layer temperature estimation (cols. 17-24): Used in the temperature transfer approach (see ISLT in EPICCONT.DAT file), it regulates the soil temperature in the bottom soil layer as a function of soil depth and damping depth. Default setting: 1.5 (Range: 1.0 to 3.0)",
      "PRMT(104)": "Not used (cols. 25-32)",
      "PRMT(105)": "Not used (cols. 33-40)",
      COIR: "Cost of irrigation water ($ mm-1): Used for economic analysis, it is the cost per millimeter of water used for irrigation.",
      COL: "Cost of lime ($ Mg-1): Used for economic analysis, it is the cost per metric ton (1 megagram) of lime applied to the soil.",
      FULP: "Cost of fuel ($ L-1): Used for economic analysis, it is the cost per liter of fuel used to power machines in various management operations.",
      WAGE: "Cost of labor ($ h-1): Used for economic analysis, it is the cost for one hour of labor.",
      "CSTZ(1)": "Miscellaneous cost 1 ($ ha-1):",
      "CSTZ(2)": "Miscellaneous cost 2 ($ ha-1):",
      XKN50:
        "Michaelis-Menten NO3- reduction constant (g m-3): Used in the Izaurralde denitrification approach (see IDN in EPICCONT.DAT file). Default setting: 250 (Range: 100 to 500)",
      XKN30:
        "Michaelis-Menten NO2- reduction constant (g m-3): Used in the Izaurralde denitrification approach (see IDN in EPICCONT.DAT file). Default setting: 25 (Range: 15 to 40)",
      XKN10:
        "Michaelis-Menten N2O reduction constant (g m-3): Used in the Izaurralde denitrification approach (see IDN in EPICCONT.DAT file). Default setting: 1.0 (Range: 0.01 to 2.5)",
      CBVT0:
        "BioVolume of organisms (cols. 25-32): It is the cumulative proportion of the BioVolume of spherical and cylindrical organisms. Used in the Izaurralde denitrification approach (see IDN in EPICCONT.DAT file). Default setting: 0.5 (Range: 0.2 to 0.8)",
    },
  },
  // Add more forms as needed
};
