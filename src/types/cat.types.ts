// Cat API types based on The Cat API documentation
export interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: any[];
  categories?: Array<{
    id: number;
    name: string;
  }>;
}

export interface VoteRequest {
  image_id: string;
  sub_id?: string;
  value: number; // 1 for like, 0 for dislike
}

export interface VoteResponse {
  id: number;
  message: string;
  image_id: string;
  sub_id?: string;
  value: number;
  country_code?: string;
}
