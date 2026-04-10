// headers.js
export const headers = {
  EPICRUN: {
    // index: 0, // Starting index for EPICRUN
    headers: [["ASTN", "ISIT", "IWP1", "IWP5", "IWND", "INPS", "IOPS", "IWTH"]],
    descriptions: {},
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
    descriptions: {},
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
    descriptions: {},
    // forLoopEndpoint: 3, // Optional limit for the for loop, 0 means no limit
  },
  WINDUSEL: {
    headers: [["II", "OPSCFILE", "Y", "X", "ELEX"]],
    descriptions: {},
  },
  WPM1USEL: {
    headers: [["II", "OPSCFILE", "Y", "X", "ELEX"]],
    descriptions: {},
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
    descriptions: {},
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

    descriptions: {},
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

    descriptions: {},
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

    descriptions: {},
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

    descriptions: {},
  },
  // Add more forms as needed
};
