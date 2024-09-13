import sendRequest from "./sendRequest";

const BASE_URL = 'api/posts';

export function index() {
    return sendRequest(BASE_URL);
  };