export interface FlightList {
  responseContent: ResponseContent;
}

export interface ResponseContent {
  ResponseStatus: ResponseStatus;
  head: Head;
  basicInfo: BasicInfo;
  itineraryList: ItineraryList[];
  recommendList: any[];
  filterOptionList: FilterOptionList[];
  cityList: CityList[];
  airlineList: AirlineList[];
  allianceList: AllianceList[];
  tagDetailList: TagDetailList[];
  airportList: AirportList[];
  sold: null;
  business: Business;
  noteList: any[];
  resctrictedPriceTypeList: any[];
}

export interface ResponseStatus {
  Timestamp: Date;
  Ack: string;
  Errors: any[];
  Build: null;
  Version: null;
  Extension: Extension[];
}

export interface Extension {
  Id: string;
  Version: null;
  ContentType: null;
  Value: string;
}

export interface AirlineList {
  code: string;
  name: string;
  allianceCode: null | string;
  lcc: boolean;
}

export interface AirportList {
  code: AirportCodeEnum;
  name: string;
}

export enum AirportCodeEnum {
  Icn = 'ICN',
  Kix = 'KIX',
}

export interface AllianceList {
  code: string;
  name: string;
  airlineCodes: string[];
}

export interface BasicInfo {
  recordCount: number;
  productId: string;
  currency: string;
  regionRoute: string;
  lowestPrice: Price;
  flags: string[];
  searchCondition: SearchCondition;
  extendList: any[];
  abTestList: any[];
  pollInterval: number;
  token: string;
  selectNotExistQueryItems: any[];
  originalCount: number;
  recommendAreaInfos: any[];
}

export interface Price {
  totalPrice: number;
  averagePrice: number;
  totalTax: number;
  averageTax: null;
  morePrice: LowestPriceMorePrice;
  adult: Adult;
  child: null;
  infant: null;
}

export interface Adult {
  salePrice: number;
  tax: number;
  discount: number;
  totalPrice: number;
  memberDiscount: null;
  morePrice: AdultMorePrice;
}

export interface AdultMorePrice {
  ticketTotalPrice: number;
  bookingFee?: number;
  flightHotelDiscount: number;
}

export interface LowestPriceMorePrice {
  discountAverage: number;
}

export interface SearchCondition {
  departCity: null;
  arriveCity: null;
  totalPage: null;
  orderBy: string;
  direction: null;
  selectJourneyInfo: null;
  searchJourneys: SearchJourney[];
  selectJourneyList: any[];
}

export interface SearchJourney {
  journeyNo: number;
  departCity: null;
  arriveCity: null;
  departDate: Date;
  departAirport: AirportList;
  arriveAirport: AirportList;
}

export interface Business {
  member: null;
  creditCardDiscount: null;
}

export interface CityList {
  code: CityCodeEnum;
  name: Name;
  enName: string;
  region: string;
  timeZone: number;
  cityId: number;
  international: boolean;
  airportList: string[];
}

export enum CityCodeEnum {
  Osa = 'OSA',
  Sel = 'SEL',
}

export enum Name {
  서울 = '서울',
  오사카 = '오사카',
}

export interface FilterOptionList {
  journeyNo: number;
  transferFilters: any[];
  airlineFilters: AirlineFilter[];
  aircraftFilters: AircraftFilter[];
  headFilters: Filter[];
  hotFilters: Filter[];
  transferCountFilters: any[];
  departHourCountFilters: HourCountFilter[];
  arriveHourCountFilters: HourCountFilter[];
  departAirportFilters: AirportFilter[];
  arriveAirportFilters: AirportFilter[];
  allianceFilters: AllianceFilter[];
}

export interface AircraftFilter {
  level: number;
  levelName: LevelName;
  lowestPrice: number;
}

export enum LevelName {
  대형 = '대형',
  중형기종 = '중형 기종',
}

export interface AirlineFilter {
  code: string;
  lowestPrice: number;
  flag: number;
}

export interface AllianceFilter {
  code: string;
  lowestPrice: number;
}

export interface AirportFilter {
  airportCode: AirportCodeEnum;
  lowestPrice: number;
  cityCode: CityCodeEnum;
}

export interface HourCountFilter {
  hour: number;
  hourCount: number;
  lowestPrice: number;
}

export interface Filter {
  type: string;
  name: null | string;
  values: string[] | null;
}

export interface Head {
  retCode: string;
  retMsg: null;
  retSubCode: null;
  transactionID: string;
  messageToken: null;
}

export interface ItineraryList {
  journeyList: JourneyList[];
  policies: Policy[];
  areaType: number;
  noteList: any[];
  paramJsonStr: null;
  flagList: FlagList[];
  routeSearchToken: null;
}

export enum FlagList {
  Fastest = 'FASTEST',
  FreeCarryOnBaggage = 'FREE_CARRY_ON_BAGGAGE',
  FreeCheckedBaggage = 'FREE_CHECKED_BAGGAGE',
}

export interface JourneyList {
  journeyNo: number;
  transSectionList: TransSectionList[];
  duration: number;
  dayCount: number;
  journeyFlags: JourneyFlag[];
  uniqueId: string;
}

export enum JourneyFlag {
  AllShareFlight = 'ALL_SHARE_FLIGHT',
  Direct = 'DIRECT',
  ShareFlight = 'SHARE_FLIGHT',
}

export interface TransSectionList {
  segmentNo: number;
  transportType: TransportType;
  departDateTime: Date;
  arriveDateTime: Date;
  duration: number;
  departPoint: Point;
  arrivePoint: Point;
  flightInfo: FlightInfo;
  sectionFlags: SectionFlag[];
  dayCount: number;
  transferDuration: null;
  trainInfo: null;
  puIndex: number;
}

export interface Point {
  cityCode: CityCodeEnum;
  cityName: Name;
  airportCode: AirportCodeEnum;
  terminal: Terminal;
  mainCityCode: null;
  distance: null;
  stationName: string;
  highlight: boolean;
}

export enum Terminal {
  Empty = '',
  T1 = 'T1',
  T2 = 'T2',
}

export interface FlightInfo {
  flightNo: string;
  airlineCode: string;
  shareFlightNo: null | string;
  shareAirlineCode: null | string;
  actualAirlineCode: null | string;
  virtualFlight: null;
  stopList: any[];
  craftInfo: CraftInfo;
  extendInfo: null;
}

export interface CraftInfo {
  craftType: string;
  name: string;
  widthLevel: WidthLevel;
  minSeats: number;
  maxSeats: number;
  level: number;
  levelName: LevelName;
  mealIcon: null;
  shortName: string;
}

export enum WidthLevel {
  N = 'N',
  W = 'W',
}

export enum SectionFlag {
  Lcc = 'LCC',
  ShareFlight = 'SHARE_FLIGHT',
  Visa = 'VISA',
}

export enum TransportType {
  Flight = 'FLIGHT',
}

export interface Policy {
  policyId: string;
  seatCount: number;
  gradeInfoList: GradeInfoList[];
  tagList: TagList[];
  price: Price;
  score: number;
  policyFlags: string[];
  policyActive: string;
  seqId: string;
  bookingChannelList: BookingChannelList[];
  noteList: any[];
  sold: Sold;
  policyIndex: null;
  routeSearchToken: null;
}

export interface BookingChannelList {
  channel: Channel;
  engine: Engine;
  validatingCarrier: string;
  reservationType: null;
}

export enum Channel {
  GdsWs = 'GDS-WS',
  TfWs = 'TF-WS',
}

export enum Engine {
  Ctrip = 'Ctrip',
  TravelFusion = 'TravelFusion',
}

export interface GradeInfoList {
  segmentNo: number;
  grade: number;
  journeyNo: number;
  mainSegment: boolean;
  subClass: string;
}

export interface Sold {
  priceFreeze: null;
}

export interface TagList {
  key: Key;
  pattern: number;
  content: string;
  desc: Desc | null;
  type: null;
  prefixUrl: null;
  extendInfo: null;
}

export enum Desc {
  DetailListContentList1SubjectCount = '{"detailList":[{"contentList":["1"],"subject":"Count"}]}',
}

export enum Key {
  AgencyModel = 'AGENCY_MODEL',
  FreeAgencyModel = 'FREE_AGENCY_MODEL',
  FreeCarryOnBaggage = 'FREE_CARRY_ON_BAGGAGE', // 휴대 수하물 포함
  FreeCheckedBaggage = 'FREE_CHECKED_BAGGAGE', // 위탁 수하물 포함
  ListLowestPrice = 'LIST_LOWEST_PRICE',
  LowSeatCount = 'LOW_SEAT_COUNT',
  PackageFlag = 'PACKAGE_FLAG',
  PackageFlagIcon = 'PACKAGE_FLAG_ICON',
  ProductCategory = 'PRODUCT_CATEGORY',
  ProductName = 'PRODUCT_NAME',
  Recommend = 'RECOMMEND',
  ShowNotice = 'SHOW_NOTICE',
  TicketDescription = 'TICKET_DESCRIPTION',
}

export interface TagDetailList {
  key: Key;
  areaType: AreaType;
  tagStyle: number;
  commonTags: CommonTag[];
  tagType: null | string;
}

export enum AreaType {
  L1 = 'L_1',
  L7 = 'L_7',
  L8 = 'L_8',
}

export interface CommonTag {
  subTagType: string;
  height: number;
  width: number;
  backgroundColor: null;
  textColor: null;
  content: null;
}

// result
export interface FlightList {
  journeyFlags: string[];
  duration: number;
  dayCount: number;
  transportType: string;
  departDateTime: Date;
  arriveDateTime: Date;
  departPoint: Pick<
    Point,
    'cityCode' | 'cityName' | 'airportCode' | 'terminal'
  >;
  arrivePoint: Pick<
    Point,
    'cityCode' | 'cityName' | 'airportCode' | 'terminal'
  >;
  flightInfo: Pick<FlightInfo, 'flightNo' | 'airlineCode'> &
    Pick<CraftInfo, 'craftType' | 'name' | 'level' | 'levelName' | 'shortName'>;
  policies: {
    seatCount: number;
    price: Pick<
      Price,
      'totalPrice' | 'averagePrice' | 'totalTax' | 'averageTax' | 'morePrice'
    > & {
      morePrice: LowestPriceMorePrice;
    };
    tagList: string[];
  };
}
