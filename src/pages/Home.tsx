import Feed from "../Components/Feed/Feed";
import Head from "../Components/Helper/Head";

const Home = () => {
  return (
    <section className="home">
      <Head
        title="Seja bem vindo!"
        description="Bem vindo ao nosso site!"
        image="https://auditoriacidada.org.br/wp-content/uploads/2018/03/livros-1280x575.jpg"
      />
      <Feed />
    </section>
  );
};

export default Home;
