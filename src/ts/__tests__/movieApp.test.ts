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
  test("Should create HTML for list", async () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById(
      "movie-container"
    ) as HTMLDivElement;

    let searchText: string = "Interstellar";
    let movies = await serviceFunctions.getData(searchText);

    //Act
    await functions.createHtml(movies, container);

    //Assert
    expect(document.querySelectorAll("div.movie").length).toBe(1);
    expect(document.querySelectorAll("h3").length).toBe(1);
    expect(document.querySelectorAll("img").length).toBe(1);
  });
});

describe("displayError", () => {
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
  test("should get input", async () => {
    //Arrange
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <div id="movie-container"></div>
    `;

    let movies: IMovie[] = [];

    let searchText: string = "Sebbe";
    movies = await serviceFunctions.getData(searchText);

    //Act
    functions.handleSubmit();

    //Assert
    expect(movies.length).toBeGreaterThan(0);
  });
  test("should call displayNoResult", async () => {
    //Arrange
    let spy = jest.spyOn(functions, "displayNoResult").mockReturnValue();
    document.body.innerHTML = `
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <div id="movie-container"></div>
    `;

    let movies: IMovie[] = [];

    let searchText: string = "";
    movies = await serviceFunctions.getData(searchText);

    //Act
    functions.handleSubmit();

    //Assert
    expect(spy).toHaveBeenCalled();
  });
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
