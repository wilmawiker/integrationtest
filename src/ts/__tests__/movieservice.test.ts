import axios from "axios";
import { IOmdbResponse } from "../models/IOmdbResponse";
import { IMovie } from "../models/Movie";
import { getData } from "./../services/movieservice";

let mockData: IMovie[] = [
  { Title: "Interstellar", imdbID: "1", Type: "", Poster: "", Year: "" },
];

jest.mock("axios", () => ({
  get: async () => {
    return new Promise((resolve) => {
      resolve({
        data: {
          Search: mockData,
        },
      });
    });
  },
}));

test("should get test data", async () => {
  let searchText: string = "Interstellar";
  let response: IMovie[] = await getData(searchText);

  expect(response[0].Title).toBe("Interstellar");
});

test("should not get test data", async () => {
  let searchText = "";
  let response: IMovie[] = await getData(searchText);

  expect(response).toBeNull;
});
