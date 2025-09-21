import axios from "axios";
import { type EventProps } from "../types";

// API client handle
const apiClient = axios.create({
  baseURL: "https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Time delay to simulate network delay
async function sleep(intv: number): Promise<void> {
  return new Promise((resolove) => setTimeout(resolove, intv));
} 

export default {
  // Get events
  async getEvents(perPage: number, page: number) {
    await sleep(500);
    return await apiClient.get<EventProps[]>("/events?_limit=" + perPage + "&_page=" + page);
  },

  // Get event
  async getEvent(id: number) {
    return await apiClient.get<EventProps>("/events/" + id);
  },
};
