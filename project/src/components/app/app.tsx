import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  offersCount: number;
}

function App({offersCount} : AppScreenProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <MainScreen offersCount={offersCount}/>
    </div>
  );
}

export default App;
