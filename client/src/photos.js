export default async (searchTerm, page) => {
  // const uri = `https://api.unsplash.com/search/photos?client_id=${process.env.ACCESS_KEY}${
  //   page > 1 ? `&page=${page}`: ""
  // }&query=${searchTerm}`;
  const uri = `/search/?searchTerm=${encodeURIComponent(searchTerm)}
    ${page ? `&page=${page}` : ""}`
  const response = await fetch(uri);
  const data = await response.json();
  return data;
};
