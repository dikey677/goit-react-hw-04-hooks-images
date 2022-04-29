const API_KEY = "25578866-eab48f26650f3d339fe2e0163";

function fetchAPI(name, pages) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${pages}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Нет изображения с именем ${name}`);
  });
}

const api = {
  fetchAPI,
};

export default api;
