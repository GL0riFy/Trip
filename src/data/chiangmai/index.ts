import { ChaiPrakanTrips } from "./district/chai-prakan";
import { ChiangDaoTrips } from "./district/chiang-dao";
import { ChomThongTrips } from "./district/chom-thong";
import { DoiSaketTrips } from "./district/doi-saket";
import { FangTrips } from "./district/fang";
import { HangDongTrips } from "./district/hang-dong";
import { MaeAiTrips } from "./district/mae-ai";
import { MaeRimTrips } from "./district/mae-rim";
import { MaeOnTrips } from "./district/mae-on";
import { MaeTaengTrips } from "./district/mae-taeng";
import { MueangChiangMaiTrips } from "./district/mueang-chiang-mai";
import { SanKamphaengTrips } from "./district/san-kamphaeng";

export * from './types';


export  const ChiangMaiData = [
    ...ChaiPrakanTrips,
    ...ChiangDaoTrips,
    ...ChomThongTrips,
    ...DoiSaketTrips,
    ...FangTrips,
    ...HangDongTrips,
    ...MaeAiTrips,
    ...MaeRimTrips,
    ...MaeOnTrips,
    ...MaeTaengTrips,
    ...MueangChiangMaiTrips,
    ...SanKamphaengTrips
]