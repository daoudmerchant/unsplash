export default async (searchTerm, page) => {
  // const uri = `https://api.unsplash.com/search/photos?client_id=${process.env.ACCESS_KEY}${
  //   page > 1 ? `&page=${page}`: ""
  // }&query=${searchTerm}`;
  const uri = `/search/?searchTerm=${encodeURIComponent(searchTerm)}
    ${page ? `&page=${page}` : ""}`;
  console.log(uri);
  const response = await fetch(uri);
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
};
