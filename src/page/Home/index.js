import Header from "~/components/Header/Header.js";

function Home() {
    return (
      <div className="App">
        <Header />
        <header className="App-header">
          <div className="text-red-500 text-center font-bold">
            Đây là Home hoạt động!
          </div>
          {/* <a href="/about" className="text-red-500 text-center font-bold">Chuyển trang about</a> */}
        </header>
      </div>
    );
  }
export default Home;