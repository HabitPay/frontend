interface IApiData {
  message: string;
  data: any;
}
export interface IApiResponseDto {
  data: IApiData;
  [key: string]: any; // 다른 속성들이 추가될 수 있음을 명시
}

interface IApiErrorData {
  code: string;
  message: string;
}

export interface IApiErrorResponseDto {
  data: IApiErrorData;
  [key: string]: any; // 다른 속성들이 추가될 수 있음을 명시
}
