/* eslint-disable no-useless-catch */
async function fetchMovies({ inputValue, page }) {
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTZiZDc5YmIwZThiODhkOWI1NzYzNzUwZDljN2U1MiIsInN1YiI6IjY1YTNmM2M1MjY2Nzc4MDEyZTY0NmY0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zeZ79D086cj3s_oe2yJnnHDHYI96_pjYFdvOC7IHGKY';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY} `,
    },
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?&language=en-US&query=${inputValue}&page=${page}`, options);
    if (!response.ok) {
      throw new Error('Ошибка запроса');
    }
    const data = await response.json();
    return {
      movies: data.results,
      totalPages: data.total_pages,
    };
  } catch (error) {
    throw console.error(error);
  }
}

export default fetchMovies;

export async function guestSession() {
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTZiZDc5YmIwZThiODhkOWI1NzYzNzUwZDljN2U1MiIsInN1YiI6IjY1YTNmM2M1MjY2Nzc4MDEyZTY0NmY0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zeZ79D086cj3s_oe2yJnnHDHYI96_pjYFdvOC7IHGKY';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };
  try {
    const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options);
    if (!response.ok) {
      // Обработка некорректного ответа от сервера
      throw new Error(`Ошибка получения guest_session_id: ${response.statusText}`);
    }
    const data = await response.json();
    return data; // Возвращаем только ID сессии
  } catch (error) {
    console.error('Ошибка при получении guest_session_id:', error);
    throw error; // Переброс ошибки для дальнейшей обработки
  }
}

// получение фильмов оцененных
export async function fetchRatedMoviesByGuestSession(guestSessionId) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTZiZDc5YmIwZThiODhkOWI1NzYzNzUwZDljN2U1MiIsInN1YiI6IjY1YTNmM2M1MjY2Nzc4MDEyZTY0NmY0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zeZ79D086cj3s_oe2yJnnHDHYI96_pjYFdvOC7IHGKY',
    },
  };
  try {
    const response = await fetch(`https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1`, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Ошибка при получении оцененных фильмов');
    }
    if (data.results.length === 0 || data === undefined) {
      return null;
    }
    console.log(data.results);
    return data.results; // Возвращаем список фильмов
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// Отправка на сервер
export async function rateMovieInGuestSession(movieId, rating, guestSessionId) {
  const API_KEY = 'fa6bd79bb0e8b88d9b5763750d9c7e52';
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rating }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка отправки рейтинга: ${errorData.status_message}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// export async function requestToken() {
//   const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTZiZDc5YmIwZThiODhkOWI1NzYzNzU
// wZDljN2U1MiIsInN1YiI6IjY1YTNmM2M1MjY2Nzc4MDEyZTY0NmY0
// NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z
// eZ79D086cj3s_oe2yJnnHDHYI96_pjYFdvOC7IHGKY';
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: `Bearer ${API_KEY}`,
//     },
//   };

//   try {
//     const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', options);
//     const data = await response.json();
//     if (data.success) {
//       console.log(data.request_token); // Выводим токен в консоль для отладки
//       return data.request_token; // Возвращаем токен для дальнейшего использования
//     }
//     console.error('Не удалось получить токен');
//     return null;
//   } catch (err) {
//     console.error('Ошибка запроса: ', err);
//     return null;
//   }
// }

// 90856c1d7d24f35dad2ecae522f0dfb9afe19009
// https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}

// export async function askForPermissions() {
//   const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYTZiZDc5YmIwZThiODhkOWI1NzYzNzUwZ
// DljN2U1MiIsInN1YiI6IjY1YTNmM2M1MjY2Nzc4MDEyZTY0
// NmY0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxf
// Q.zeZ79D086cj3s_oe2yJnnHDHYI96_pjYFdvOC7IHGKY';
//   const REQUEST_TOKEN = await requestToken();
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: `Bearer ${API_KEY}`,
//     },
//   };

//   fetch(`https://www.themoviedb.org/authenticate/${REQUEST_TOKEN}`, options)
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));
// }