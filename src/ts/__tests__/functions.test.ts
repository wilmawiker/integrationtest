import { movieSort } from "./../functions";
import { IMovie } from "./../models/Movie";

//jest.mock("./../ts/services/movieService");

test("Should sort descending by title a-z if desc true", () => {
  let mockData: IMovie[] = [
    { Title: "Interstellar", imdbID: "1", Type: "", Poster: "", Year: "" },
    { Title: "ABC", imdbID: "1", Type: "", Poster: "", Year: "" },
  ];

  movieSort(mockData);

  expect(mockData[0].Title).toBe("ABC");
  expect(mockData[1].Title).toBe("Interstellar");
});

test("Should not sort by title", () => {
  let mockData: IMovie[] = [
    { Title: "ABC", imdbID: "1", Type: "", Poster: "", Year: "" },
    { Title: "Interstellar", imdbID: "1", Type: "", Poster: "", Year: "" },
  ];

  movieSort(mockData, true);

  expect(mockData[0].Title).toBe("ABC");
  expect(mockData[1].Title).toBe("Interstellar");
});

test("Should sort z-a if desc false", () => {
  let mockData: IMovie[] = [
    { Title: "ABC", imdbID: "1", Type: "", Poster: "", Year: "" },
    { Title: "Interstellar", imdbID: "1", Type: "", Poster: "", Year: "" },
  ];

  movieSort(mockData, false);

  expect(mockData[1].Title).toBe("ABC");
  expect(mockData[0].Title).toBe("Interstellar");
});

test("Should not sort by title z-a id desc false", () => {
  let mockData: IMovie[] = [
    { Title: "Interstellar", imdbID: "1", Type: "", Poster: "", Year: "" },
    { Title: "ABC", imdbID: "1", Type: "", Poster: "", Year: "" },
  ];

  movieSort(mockData, false);

  expect(mockData[1].Title).toBe("ABC");
  expect(mockData[0].Title).toBe("Interstellar");
});
