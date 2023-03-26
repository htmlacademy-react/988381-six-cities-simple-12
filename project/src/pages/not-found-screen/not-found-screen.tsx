function NotFoundScreen() : JSX.Element {
  return (
    <main className="page__main page__main--not-found">
      <section className="not-found">
        <h1 className="not-found__title">404 Not Found</h1>
        <a className="not-found__link" href="index.html">На главную</a>
      </section>
    </main>
  );
}

export default NotFoundScreen;
