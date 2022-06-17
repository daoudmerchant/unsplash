export const basicDom = `
    <header class="header">
        <nav class="nav">LOGO</nav>
    </header>
    <form class="form">
        <input class="input" placeholder='Search for images' type="text" list="prevsearches" />
    </form>
    <main class="main">
        <section id="photoBox" class="gallery-container">
            <div class="card card--empty"></div>
            <div class="card card--empty"></div>
            <div class="card card--empty"></div>
            <div class="card card--empty"></div>
            <div class="card card--empty"></div>
            <div class="card card--empty"></div>
            <div class="card card--empty"></div>
            <div class="card card--empty"></div>
            <div class="card card--empty"></div>
            <div class="card card--empty"></div>
        </section>
    </main>
    <section id="pagination" class="pagination">
        <p id="prevpage" class="pagination__counter"></p>
        <button id="prev" class="pagination__button" disabled>Previous</button>
        <button id="next" class="pagination__button" disabled>Next</button>
        <p id="nextpage" class="pagination__counter"></p>
    </section>
    <footer class="footer">
        <a href="https://github.com/daoudmerchant/unsplash-gallery-exercise" target="__blank">
            <img class="footer__icon" src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg">
        </a>
    </footer>
`;

export const fillBody = () => {
  const body = document.querySelector('body');
  body.innerHTML = basicDom;
};
