import React from 'react';
import ErrorBoundary from './ErrorBoundary'; // Import the ErrorBoundary
import MusicPlayer from './YoutubeMusicPlayer'; // Your existing MusicPlayer component
import Quiz from './Quiz'; // New Quiz component
import './App.css'; // Import any global styles
import CustomScrollbar from './CustomScrollbar';

const BuggyComponent = () => {
  // This will throw an error when rendered
  throw new Error("I crashed!");
  return <div>This will not render</div>;
};

const App: React.FC = () => {
  return (
    <div>
            <CustomScrollbar>
      <header>
        <h1>Hello, and Welcome to the Quiz App using Vite with TypeScript and TSX!</h1>
      </header>
      <main>
        <p>Enjoy!</p>
        <ErrorBoundary>
          <BuggyComponent />
          <div className="App">
          <MusicPlayer /> {/* Music player component */}
          <Quiz /> {/* New Quiz component */}
          </div>
        </ErrorBoundary>
        {/* You can add more components or functionality here */}
        <div className="App">
          <MusicPlayer /> {/* Music player component */}
          <Quiz /> {/* New Quiz component */}
          </div>
          <div>
      <h1>Custom Scrollbar Example</h1>

      <div>
          <p>Domini et dominae,</p>
          <p>Hodie, philosophiam vitae communicare volo quae cum gaudio saltat, simplici delectatione crustulorum inspirata. Finge hoc: vita est similis placentae pulchre factae, iucunda saporum texturarumque mixtura, unoquoque ingrediente suam magiam itineri nostro unico addente. Varietatem amplectere! Sicut crustulae in arcu saporum veniunt, ita vitae nostrae plenae sunt divite tapeto experientiarum quae explorationem exspectant. Aperiatur cor tuum novis cogitationibus et passionibus, nam illae sunt aspersiones quae iter nostrum vividum et excitantem reddunt.</p>
          <p>Dulcia illa momenta gusta—parva gaudia quae saporem in vitam nostram cotidianam inspergunt. Momentum sume ad gustandum calidum poculum capulus, risum amici, vel calorem amplexus. Crea tibi propriam felicitatis formulam; Define quid tibi significet, et id omni ardore in corde tuo persequere. Memento, non omne cupcake perfecte evenit, et id bene est! Amplectere illos parvos casus tamquam gradus ad incrementum; Quaeque lapsus est lectio quae nos ad vitam pleniorem ducit.</p>
          <p>Et gaudium communicemus! Felicitas multiplicatur cum inter nos coniungimur. Omnem occasionem, magnam parvamque, celebra, nam quaeque celebratio vitae nostrae divitias quandam addit. Ne obliviscamur momentum aequilibrii—dulcibus vitae indulge dum valetudinem tuam coles.</p>
          <p>Denique, cor gratitudine plenum cole. Cor gratum est signum laetitiae et contentamenti. Itaque, vitam cum gaudio, creativitate, et sensu communitatis aggrediamur. Amplexando dulcedinem existentiae et eam cum aliis communicando, plene et libere vivere possumus, vitam momentis iucundis plenam creantes, uno laeto placentae tempore. Gratias tibi ago!</p>
        </div>

    </div>
      </main>
      <footer>
        <p>&copy; 2025 Quiz App</p>
      </footer>
      </CustomScrollbar>
    </div>
  );
};

export default App;