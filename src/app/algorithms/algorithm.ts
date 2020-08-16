export interface Algorithm {
  _id?: string;
  name: string;
  title: string;
  group?: string;
  input?: string;
  output?: string;
  runtime?: string;
  subroutine?: {
    subname?: string,
    subtitle?: string,
  };
  code?: string;
}
