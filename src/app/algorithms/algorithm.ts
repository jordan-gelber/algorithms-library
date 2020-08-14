export interface Algorithm {
  _id?: number;
  name: string;
  group?: string;
  input?: string;
  output?: string;
  runtime?: string;
  subroutine?: {
    subid?: number,
    subname?: string,
  };
  code?: string;
}
