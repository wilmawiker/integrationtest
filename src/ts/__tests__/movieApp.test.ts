/** 

*@jest-environment jsdom 

*/
import { IMovie } from "../models/Movie";
import * as functions from "../movieApp";
import * as serviceFunctions from "./../services/movieservice";

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

describe("createHTML", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("Should create HTML for list", async () => {
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    let searchText: string = "Interstellar";
    let movies = await serviceFunctions.getData(searchText);

    await functions.createHtml(movies, container);

    expect(document.querySelectorAll("div.movie").length).toBe(1);
    expect(document.querySelectorAll("h3").length).toBe(1);
    expect(document.querySelectorAll("img").length).toBe(1);
  });
});

describe("displayError", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should change innerhtml", async () => {
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    await functions.displayNoResult(container);

    expect(container.innerHTML).toBe(`<p>Inga sökresultat att visa</p>`);
  });
});

describe("handleSubmit", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should get input", async () => {
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <div id="movie-container"></div>
    `;

    let movies: IMovie[] = [];

    let searchText: string = "Interstellar";
    movies = await serviceFunctions.getData(searchText);

    functions.handleSubmit();

    expect(movies.length).toBeGreaterThan(0);
  });
  test("should call displayNoResult", async () => {
    let spy = jest.spyOn(functions, "displayNoResult").mockReturnValue();
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <div id="movie-container"></div>
    `;

    let movies: IMovie[] = [];

    let searchText: string = "";
    movies = await serviceFunctions.getData(searchText);

    functions.handleSubmit();

    expect(spy).toHaveBeenCalled();
  });
});

describe("init", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });
  test("should call handleSubmit", () => {
    let spy = jest.spyOn(functions, "handleSubmit").mockReturnThis();

    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
  </form>`;

    functions.init();

    (document.getElementById("searchForm") as HTMLFormElement)?.submit();

    expect(spy).toHaveBeenCalled();
  });
});
